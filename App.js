import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  LayoutAnimation,
} from "react-native";

//Main app screens
import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChallengesScreen from "./screens/ChallengesScreen";
import HeatmapScreen from "./screens/Heatmap";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/Login";

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

export default function App() {
  var i = 0;
  // CloudFunction needed to load this array with user's current challenge titles and descriptions (array of tuples)
  const [currentChallenges, setCurrentChallenges] = useState([
    {
      title: "ChallengeTitle1",
      description: "gXrtOipB87Y",
      isLink: true,
      score: 0,
      difficulty: 0,
    },
    {
      title: "ChallengeTitle2",
      description: "ChallengeDesc2",
      isLink: false,
      score: 0,
      difficulty: 0,
    },
    {
      title: "ChallengeTitle3",
      description: "ChallengeDesc3",
      isLink: false,
      score: 0,
      difficulty: 0,
    },
  ]);

  const deepCopy = () => {
    var tempArray = [];
    currentChallenges.forEach((item) => {
      var tempItem = {
        title: item.title,
        description: item.description,
        isLink: item.isLink,
        score: item.score,
        difficulty: item.difficulty,
      };
      tempArray.push(tempItem);
    });
    return tempArray;
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  //create a new profile doc in db
  function onUserSignup(result) {
    const id1 = Math.floor(Math.random() * 30) + 0;
    const id2 = Math.floor(Math.random() * 30) + 0;
    const id3 = Math.floor(Math.random() * 30) + 0;
    return db.collection("profile").doc(result.user.uid).set({
      email: result.user.email,
      name: result.user.displayName,
      urlpic: result.user.photoURL,
      level: 0,
      lives: 3,
      score: 0,
      weeklystreak: 0,
      activeChallenges: [id1,id2,id3],
      challengesCompleted: [],
    });
  } 

  // function to get new challenge on refresh from db
  const refreshchallenge = (challenge) => {
    var temp = deepCopy();
    console.log(temp);
    temp.forEach((item) => {
      if (item.title == challenge.title) {
        const id = Math.floor(Math.random() * 25) + 6;
        return db.collection("challenges").where("challengeID", ">", id).limit(1)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              item.description = doc.data().description;
              item.title = doc.data().challenge;
              item.isLink = doc.data().isLink;
              item.difficulty = doc.data().difficulty;
              item.score = doc.data().score;
              setCurrentChallenges(temp);
              console.log(doc.id, "=>", doc.data());
            });
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });   
      }
    });
  };
/*
  //go into profile by uid and get challenge ids from active challenges
  const docRef = db.collection("profile").doc("xtOtqqZlx0QFT9flOv6jIYeocTG3");
  docRef.get().then(function(doc) {
    if (doc.exists) {
      var Challenges = doc.data().activeChallenges;
      console.log(Challenges)
      console.log(doc.id, '=>', doc.data());
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  const docref = db.collection("challenges").where("challengeID", "in", Challenges)
  const getDoc = docref.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            renderData(doc);
            ++i;
            console.log(i);
            console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
        });

    function renderData(doc) {
      currentChallenges[i].title = doc.data().challenge;
      currentChallenges[i].description = doc.data().description;
      currentChallenges[i].isLink = doc.data().isLink;
      console.log(currentChallenges[i]);
    } 
*/

  /*
  function onDeleteUser()
  {
      const doc = db.collection('profile').doc(user.uid);
      return doc.delete();
  }

  */

  const [currentPage, setCurrentPage] = useState("login");
  //Page Functions (No need for DB)
  //const [currentPage, setCurrentPage] = useState("main screen");
  //Tell app whether the screen wants to render the header and footer.
  //For example, we don't want to load the header and footer for the login screen.
  //So they should be intially false, but when we are going to switch to the main screen,
  //the states should be updated to true.
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  //Using this to signal to app.js that we need to rerender. No important info is actually stored in this state.
  const [theme, setTheme] = useState(false);

  // User info should be loaded in from DB, then can be passed to functions as a prop.  Photo is a default stock photo.
  const [thisUser, setUser] = useState({
    FullName: "Name",
    Level: 0,
    Lives: 3,
    Score: 0,
    URLPic: "https://i.stack.imgur.com/l60Hf.png",
    WeeklyStreak: 0,
    isAdmin: true,
  });

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
    }
    setCurrentPage(newPage);
  };

  //When the delete challenge button is hit in the challenge page this function is executed.
  //When an admin deletes a challenge, we load a new one to replace it.
  const deleteChallengeHandler = (challenge) => {
    challenge.title = "replace";
    challenge.description = "replace";
  };

  const ChallengeEditHandler = (challengeToEdit, challenge) => {
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
        onRefreshChallenge={() => refreshchallenge(currentChallenges[0])}

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
      />
    );
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "settings") {
    content = (
      <SettingsScreen
        onThemeChange={themeChangeHandler}
        onPageChange={changePageHandler}
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
    content = <CreateNewChallengeScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "healthTutorial") {
    content = <HealthTutorialScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "mainChallengeTutorial") {
    content = <MainScreenChallengeTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "login") {
    content = (
      <Login onPageChange={changePageHandler} onSignup={onUserSignup} />
    );
  } else if (currentPage === "home address") {
    content = <HomeAddress onPageChange={changePageHandler} />;
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
