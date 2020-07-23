import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//Main app screens
import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HeatmapScreen from "./screens/Heatmap";
import SettingsScreen from "./screens/SettingsScreen";
import ChallengesScreen from "./screens/ChallengesScreen";

//admin screen
import CreateNewChallengeScreen from "./screens/CreateNewChallengeScreen";

//Tutorial screens
import MainScreenChallengeTutorial from "./screens/Tutorial Screens/MainScreenChallengeTutorial.js";
import HealthTutorialScreen from "./screens/Tutorial Screens/HealthTutorialScreen";
import TutorialWelcome from "./screens/Tutorial Screens/TutorialWelcome";
import ProfileTutorial from "./screens/Tutorial Screens/ProfileScreenTutorial";
import HeatmapTutorial from "./screens/Tutorial Screens/HeatmapTutorial";
import ChallengeTutorial from "./screens/Tutorial Screens/ChallengeScreenTutorial";

export default function App() {
  //const [currentPage, setCurrentPage] = useState("main screen");
  const [currentPage, setCurrentPage] = useState("welcome");

  // CloudFunction needed to load this array with user's current challenge titles and descriptions (array of tuples)
  const [currentChallenges, setCurrentChallenges] = useState([
    { title: "ChallengeTitle1", description: "ChallengeDesc1" },
    { title: "ChallengeTitle2", description: "ChallengeDesc2" },
    { title: "ChallengeTitle3", description: "ChallengeDesc3" },
  ]);

  // User info should be loaded in from DB, then can be passed to functions as a prop.  Photo is a default stock photo.
  const [thisUser, setUser] = useState({
    FullName: "Name",
    Level: 0,
    Lives: 3,
    Score: 0,
    URLPic: "https://i.stack.imgur.com/l60Hf.png",
    WeeklyStreak: 0,
    isAdmin: true,
    showTutorial: true,
  });

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };

  //When the delete challenge button is hit in the challenge page this function is executed.
  //When an admin deletes a challenge, we load a new one to replace it.
  const deleteChallengeHandler = (challengeToDelete) => {
    currentChallenges.forEach(function (challenge) {
      if (challengeToDelete.title == challenge.title) {
        challenge.title = "replace";
        challenge.description = "replace";
      }
    });
  };

  const ChallengeEditHandler = (challengeToEdit, challenge) => {
    challengeToEdit.title = challenge.title;
    challengeToEdit.description = challenge.description;
  };

  let content;

  if (currentPage === "main screen") {
    content = (
      <MainScreen
        adminRights={thisUser.isAdmin}
        onPageChange={changePageHandler}
        challenges={currentChallenges}
        profile={thisUser}
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
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[0])}
        onEditChallenge={ChallengeEditHandler}
        onPageChange={changePageHandler}
        challenge={currentChallenges[0]}
      />
    );
  } else if (currentPage === "challenge2") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[1])}
        onEditChallenge={ChallengeEditHandler}
        onPageChange={changePageHandler}
        challenge={currentChallenges[1]}
      />
    );
  } else if (currentPage === "challenge3") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[2])}
        onEditChallenge={ChallengeEditHandler}
        onPageChange={changePageHandler}
        challenge={currentChallenges[2]}
      />
    );
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "settings") {
    content = <SettingsScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "createNewChallenge") {
    content = <CreateNewChallengeScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "mainChallengeTutorial") {
    content = <MainScreenChallengeTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "healthTutorial") {
    content = <HealthTutorialScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "welcome") {
    content = <TutorialWelcome onPageChange={changePageHandler} />;
  } else if (currentPage === "profileTutorial") {
    content = <ProfileTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "challengeTutorial") {
    content = <ChallengeTutorial onPageChange={changePageHandler} />;
  } else if (currentPage === "heatmapTutorial") {
    content = <HeatmapTutorial onPageChange={changePageHandler} />;
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
