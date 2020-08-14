import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage,
  LayoutAnimation,
  Alert,
} from "react-native";

import { BleManager } from "react-native-ble-plx";
import Geolocation from "react-native-geolocation-service";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);

//Main app screens
import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChallengesScreen from "./screens/ChallengesScreen";
import HeatmapScreen from "./screens/Heatmap";
import SettingsScreen from "./screens/SettingsScreen";
import CongratsScreen from "./screens/CongratsScreen";
import FailureScreen from "./screens/FailureScreen";

//Helpful components.
import Footer from "./components/Footer";
import Header from "./components/Header";

//Admin screen
import CreateNewChallengeScreen from "./screens/CreateNewChallengeScreen";

//Tutorial Screens
import WelcomeScreen from "./screens/Tutorial Screens/TutorialWelcome";
import MainScreenChallengeTutorial from "./screens/Tutorial Screens/MainScreenChallengeTutorial.js";
import HealthTutorialScreen from "./screens/Tutorial Screens/HealthTutorialScreen";
import ProfileTutorial from "./screens/Tutorial Screens/ProfileScreenTutorial";
import HeatmapTutorial from "./screens/Tutorial Screens/HeatmapTutorial";
import ChallengeTutorial from "./screens/Tutorial Screens/ChallengeScreenTutorial";
import Login from "./screens/Login";
import HomeAddress from "./screens/HomeAddress";

//set up firebase
import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { setProvidesAudioData } from "expo/build/AR";
import LoadingScreen from "./screens/Loading";
import { abs } from "react-native-reanimated";

export default function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    console.log("firebase intialized");
  }
  const db = firebase.firestore();
  var i = 0;
  var doc_count = 54;

  const [currentPage, setCurrentPage] = useState("login");
  //Tell app whether the screen wants to render the header and footer.
  //For example, we don't want to load the header and footer for the login screen.
  //So they should be intially false, but when we are going to switch to the main screen,
  //the states should be updated to true.
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  //Using this to signal to app.js that we need to rerender. No important info is actually stored in this state.
  const [theme, setTheme] = useState(false);

  const [currentChallenges, setCurrentChallenges] = useState(
    // CloudFunction needed to load this array with user's current challenge titles and descriptions (array of tuples)
    [
      {
        title: "Loading...",
        description: "Loading...",
        isLink: false,
        score: 0,
        difficulty: 0,
        challengeID: 0,
      },
      {
        title: "Loading...",
        description: "Loading...",
        isLink: false,
        score: 0,
        difficulty: 0,
        challengeID: 0,
      },
      {
        title: "Loading...",
        description: "Loading...",
        isLink: false,
        score: 0,
        difficulty: 0,
        challengeID: 0,
      },
    ]
  );

  // User info should be loaded in from DB, then can be passed to functions as a prop.  Photo is a default stock photo.
  const [thisUser, setUser] = useState({
    FullName: "Name",
    Level: 0,
    Lives: 3,
    Score: 0,
    URLPic: "https://i.stack.imgur.com/l60Hf.png",
    WeeklyStreak: 0,
    isAdmin: false,
  });
  const userRef = useRef(thisUser);
  userRef.current = thisUser;

  const [myUid, setMyUid] = useState(null);
  //Retrieve the uid from async storage
  AsyncStorage.getItem("uid").then((value) => {
    const data = value;
    if (data !== null) {
      setMyUid(data);
    }
  });

  const [lng, setLng] = useState(AsyncStorage.getItem("lng"));
  const [lat, setLat] = useState(AsyncStorage.getItem("lat"));

  //Counts the minutes. When the counter gets to 10080, increment weekly streak.
  //Best solution without running a dedicated server. Counter should work in the background.
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  //Bluetooth functionality. and Geolocation tracking.
  const [manager, setManager] = useState(new BleManager());

  useEffect(() => {
    if (myUid) {
      getProfile();
      getChallengesId();
      let bleScanTimer = setTimeout(function tick() {
        console.log(countRef.current);
        //if it has been 10080 minutes. Aka 7 days
        if (countRef.current < 10080) {
          setCount(countRef.current + 1);
        } else {
          setCount(0);
          setUser({
            ...thisUser,
            WeeklyStreak: userRef.current.WeeklyStreak + 1,
          });
          incrementWeeklyStreak();
        }
        scanForDevices();
        bleScanTimer = setTimeout(tick, 60000);
      }, 60000);
    }
  }, [myUid]);

  //add +1 to the weekly streak in the db.
  function incrementWeeklyStreak() {
    var docRef = db.collection("profile").doc(myUid);
    docRef.update({
      weeklystreak: firebase.firestore.FieldValue.increment(+1),
    });
  }

  //reduce the amount of sig figs in a number. For detecing if the user is at home.
  const toPrecision = (x) => {
    if (Math.abs(x) > 99) {
      var temp = Number.parseFloat(x).toPrecision(5);
    } else {
      var temp = Number.parseFloat(x).toPrecision(4);
    }
    return parseFloat(temp);
  };

  //Scan for nearby devices and reduce hp if one is found too close.
  const scanForDevices = () => {
    console.log("Scanning for nearby devices... ");
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }

      //Check to see if the user is at home, if they are, stop the scan for a minute and check again.
      Geolocation.getCurrentPosition((position) => {
        if (
          toPrecision(position.coords.latitude) == toPrecision(lat._55) &&
          toPrecision(position.coords.longitude) == toPrecision(lng._55)
        ) {
          console.log("User at home. Stopping scan until next cycle. ");
          manager.stopDeviceScan();
        }

        //If signal strength crosses this threshhold, inflict hp damage.
        else if (device.rssi > -40) {
          console.log(
            "Device detected in close proximity. Take damage and stop scan till next cycle."
          );
          manager.stopDeviceScan();
          //No use beating a dead horse :)
          if (userRef.current.Lives >= 1) {
            setUser({ ...thisUser, Lives: userRef.current.Lives - 1 });
            LifeLoss();
            Alert.alert(
              "You got to close!",
              "Remember, the goal of the game is to maintain social distancing.",
              [
                {
                  text: "Sorry!",
                },
              ]
            );
          } else {
            setUser({ ...thisUser, Lives: 3, WeeklyStreak: 0 });
            handleDie();
            lostLastLife();
          }
        }
      });
    });
  };

  //Inform the user they lost their last life and their hp and weekly streak is being reset.
  const lostLastLife = () => {
    Alert.alert(
      "Sorry, You've Lost Your Last Life",
      "Try to maintain social distance and when possible stay at home.",
      [
        {
          text: "Reset my life, I want to try again!",
          style: "cancel",
        },
      ]
    );
  };

  //Part of a future feature.
  const leavingSpace = () => {
    Alert.alert(
      "You're About to Leave Your Safe__",
      "Are you going out for a legitimate reason",
      [
        {
          text: "I am!",
          style: "cancel",
        },
        {
          text: "I'm Not'",
          onPress: () => setUser({ ...thisUser, Lives: thisUser.Lives - 1 }),
        },
      ]
    );
  };

  //user loses a life
  function LifeLoss() {
    var docRef = db.collection("profile").doc(myUid);
    docRef.update({
      lives: firebase.firestore.FieldValue.increment(-1),
    });
  }

  //When you take damage at zero hp, set streak back to zero and restore hp in the db
  function handleDie() {
    var docRef = db.collection("profile").doc(myUid);
    docRef.update({
      weeklystreak: 0,
      lives: 3,
    });
  }

  //Stored data Values for UID and logged in type
  const [myLoggedIn, setMyLoggedIn] = useState("false");
  AsyncStorage.getItem("loggedIn").then((value) => {
    const data = value;
    if (data !== null) {
      setMyLoggedIn(data);
    }
  });

  //read profile by uid from asyncstorage and get challenge ids from active challenges
  //then go into challenges and get challenges matching the ids
  async function getChallengesId() {
    var Challenge1;
    var Challenge2;
    var Challenge3;
    var docRef = db.collection("profile").doc(myUid);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        Challenge1 = doc.data().activeChallenges[0];
        Challenge2 = doc.data().activeChallenges[1];
        Challenge3 = doc.data().activeChallenges[2];
        getActiveChallenges(Challenge1, Challenge2, Challenge3);
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    });
  }

  async function getActiveChallenges(Challenge1, Challenge2, Challenge3) {
    const snapshot = await db
      .collection("challenges")
      .where("challengeID", "in", [Challenge1, Challenge2, Challenge3])
      .limit(3)
      .get();
    var str = JSON.stringify(snapshot.docs.map((doc) => doc.data()));
    var parsed = JSON.parse(str);
    setCurrentChallenges([
      {
        title: parsed[0].challenge,
        description: parsed[0].description,
        isLink: parsed[0].isLink,
        score: parsed[0].score,
        difficulty: parsed[0].difficulty,
        challengeID: parsed[0].challengeID,
      },
      {
        title: parsed[1].challenge,
        description: parsed[1].description,
        isLink: parsed[1].isLink,
        score: parsed[1].score,
        difficulty: parsed[1].difficulty,
        challengeID: parsed[1].challengeID,
      },
      {
        title: parsed[2].challenge,
        description: parsed[2].description,
        isLink: parsed[2].isLink,
        score: parsed[2].score,
        difficulty: parsed[2].difficulty,
        challengeID: parsed[2].challengeID,
      },
    ]);
  }

  const deepCopy = () => {
    var tempArray = [];
    currentChallenges.forEach((item) => {
      var tempItem = {
        title: item.title,
        description: item.description,
        isLink: item.isLink,
        score: item.score,
        difficulty: item.difficulty,
        challengeID: item.challengeID,
      };
      tempArray.push(tempItem);
    });
    return tempArray;
  };

  //function to move accepted challenge to completed challenges
  //grab uid from async storage
  const setChallengeCompleted = (challenge) => {
    var docRef = db.collection("profile").doc(myUid);
    if (challenge.difficulty === 1) {
      currentScore = 200;
    }
    if (challenge.difficulty === 2) {
      currentScore = 500;
    }
    if (challenge.difficulty === 3) {
      currentScore = 1000;
    }
    docRef.update({
      challengesCompleted: firebase.firestore.FieldValue.arrayUnion(
        challenge.challengeID
      ),
      score: firebase.firestore.FieldValue.increment(currentScore),
    });

    var Score = thisUser.Score;
    setUser({ ...thisUser, Score: Score + currentScore });
    refreshchallenge(challenge);
  };

  //add new challenge from admin
  function addNewChallenge(challenge) {
    ++doc_count;
    return db
      .collection("challenges")
      .add({
        challenge: challenge.title,
        description: challenge.description,
        challengeID: doc_count,
        difficulty: challenge.difficulty,
        score: challenge.score,
        isLink: challenge.isLink,
        type: challenge.type,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  function getProfile() {
    var docRef = db.collection("profile").doc(myUid);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setUser({
            Score: doc.data().score,
            Lives: doc.data().lives,
            URLPic: doc.data().urlpic,
            WeeklyStreak: doc.data().weeklystreak,
            FullName: doc.data().name,
          });
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  //create a new profile doc in db
  function onUserSignup(result) {
    var docRef = db.collection("profile").doc(result.user.uid);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log(myUid);
        getProfile();
        getChallengesId();
        return;
      } else {
        const id1 = Math.floor(Math.random() * doc_count) + 0;
        const id2 = Math.floor(Math.random() * doc_count) + 0;
        const id3 = Math.floor(Math.random() * doc_count) + 0;
        return db
          .collection("profile")
          .doc(result.user.uid)
          .set({
            email: result.user.email,
            name: result.user.displayName,
            urlpic: result.user.photoURL,
            level: 0,
            lives: 3,
            score: 0,
            weeklystreak: 0,
            activeChallenges: [id1, id2, id3],
            challengesCompleted: [],
          });
      }
    });
  }

  // function to get new challenge on refresh from db
  const refreshchallenge = (challenge) => {
    var temp = deepCopy();
    temp.forEach((item) => {
      if (item.title == challenge.title) {
        const id = Math.floor(Math.random() * doc_count) + 0;
        return db
          .collection("challenges")
          .where("challengeID", ">", id)
          .limit(1)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              item.description = doc.data().description;
              item.title = doc.data().challenge;
              item.isLink = doc.data().isLink;
              item.difficulty = doc.data().difficulty;
              item.score = doc.data().score;
              item.challengeID = doc.data().challengeID;
              setCurrentChallenges(temp);
              console.log(doc.id, "=>", doc.data());
              updateActiveChallenges(item, challenge);
            });
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });
      }
    });
  };

  function updateActiveChallenges(item, challenge) {
    var docRef = db.collection("profile").doc(myUid);
    docRef.update({
      activeChallenges: firebase.firestore.FieldValue.arrayUnion(
        item.challengeID
      ),
    });
    docRef.update({
      activeChallenges: firebase.firestore.FieldValue.arrayRemove(
        challenge.challengeID
      ),
    });
  }

  function onDeleteUser() {
    const doc = db.collection("profile").doc(myUid);
    return doc.delete();
  }

  //handles whether or not the header and footer are shown, aswell as setting currentpage
  const changePageHandler = (newPage) => {
    LayoutAnimation.spring();
    if (
      newPage === "main screen" ||
      newPage === "settings" ||
      newPage === "profile"
    ) {
      setShowHeader(true);
      setShowFooter(true);
    } else if (newPage === "heatmap") {
      setShowHeader(false);
      setShowFooter(true);
    } else if (newPage === "welcome") {
      setShowHeader(false);
      setShowFooter(false);
    } else if (newPage === "createNewChallenge") {
      setShowHeader(true);
      setShowFooter(false);
    } else if (newPage === "login") {
      setShowHeader(false);
      setShowFooter(false);
    }
    setCurrentPage(newPage);
  };

  //When the delete challenge button is hit in the challenge page this function is executed.
  //When an admin deletes a challenge, we load a new one to replace it.
  const deleteChallengeHandler = (challenge) => {
    var docRef = db
      .collection("challenges")
      .where("challengeID", "==", challenge.challengeID)
      .limit(1);
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
        setCurrentPage("createNewChallenge");
      });
    });
  };

  const ChallengeEditHandler = (challengeToEdit, challenge) => {
    var docRef = db.collection("challenges").doc(challengeToEdit.challengeID);
    if (challengeToEdit.title === challenge.title) {
      docRef.update({
        description: challenge.description,
      });
    } else {
      docRef.update({
        challenge: challenge.title,
      });
    }
    challengeToEdit.title = challenge.title;
    challengeToEdit.description = challenge.description;
  };

  //Functions that handle the logic of whether to load the footer / header.
  const loadFooter = () => {
    if (showFooter) {
      return <Footer onButtonPress={changePageHandler} />;
    } else {
      return;
    }
  };

  const loadHeader = () => {
    if (showHeader) {
      return <Header onButtonPress={changePageHandler} />;
    } else {
      return;
    }
  };

  const themeChangeHandler = () => {
    setTheme(!theme);
  };

  let content;

  if (currentPage === "main screen") {
    content = (
      <MainScreen
        adminRights={thisUser.isAdmin}
        onPageChange={changePageHandler}
        challenges={currentChallenges}
        profile={thisUser}
        onRefreshChallenge={refreshchallenge}
      />
    );
  } else if (currentPage === "profile") {
    content = (
      <ProfileScreen onPageChange={changePageHandler} profile={thisUser} />
    );
  } else if (currentPage === "challenge1") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onPageChange={changePageHandler}
        challenge={currentChallenges[0]}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[0])}
        onEditChallenge={ChallengeEditHandler}
        onRefreshChallenge={() => refreshchallenge(currentChallenges[0])}
        onChallengeId="challenge1"
        onChallengeCompleted={() => setChallengeCompleted(currentChallenges[0])}
      />
    );
  } else if (currentPage === "challenge2") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onPageChange={changePageHandler}
        challenge={currentChallenges[1]}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[1])}
        onEditChallenge={ChallengeEditHandler}
        onRefreshChallenge={() => refreshchallenge(currentChallenges[1])}
        onChallengeId="challenge2"
        onChallengeCompleted={() => setChallengeCompleted(currentChallenges[1])}
      />
    );
  } else if (currentPage === "challenge3") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onPageChange={changePageHandler}
        challenge={currentChallenges[2]}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[2])}
        onEditChallenge={ChallengeEditHandler}
        onRefreshChallenge={() => refreshchallenge(currentChallenges[2])}
        onChallengeId="challenge3"
        onChallengeCompleted={() => setChallengeCompleted(currentChallenges[2])}
      />
    );
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "settings") {
    content = (
      <SettingsScreen
        onThemeChange={themeChangeHandler}
        onPageChange={changePageHandler}
        onDeleteUser={onDeleteUser}
      />
    );
  } else if (currentPage === "welcome") {
    content = <WelcomeScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "profileTutorial") {
    content = (
      <ProfileTutorial profile={thisUser} onPageChange={changePageHandler} />
    );
  } else if (currentPage === "challengeTutorial") {
    content = <ChallengeTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "heatmapTutorial") {
    content = <HeatmapTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "createNewChallenge") {
    content = (
      <CreateNewChallengeScreen
        onPageChange={changePageHandler}
        onAddNewChallenge={addNewChallenge}
      />
    );
  } else if (currentPage === "healthTutorial") {
    content = <HealthTutorialScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "mainChallengeTutorial") {
    content = <MainScreenChallengeTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "login") {
    content = (
      <Login
        onPageChange={changePageHandler}
        onSignup={onUserSignup}
        onGetProfile={getProfile}
        onGetChallenges={getChallengesId}
      />
    );
  } else if (currentPage === "home address") {
    content = <HomeAddress onPageChange={changePageHandler} />;
  } else if (currentPage === "congrats screen") {
    content = <CongratsScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "failure screen") {
    content = <FailureScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "loading screen") {
    content = <LoadingScreen uid={myUid} onPageChange={changePageHandler} />;
  }

  return (
    <View style={styles.screen}>
      {loadHeader()}
      {content}
      {loadFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
