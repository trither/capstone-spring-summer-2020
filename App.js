import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HeatmapScreen from "./screens/Heatmap";
import SettingsScreen from "./screens/SettingsScreen";
import ChallengesScreen from "./screens/ChallengesScreen";;
import CreateNewChallengeScreen from "./screens/CreateNewChallengeScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main screen");

  // CloudFunction needed to load this array with user's current challenge titles and descriptions (array of tuples)
  const [currentChallenges, setCurrentChallenges] = useState([
    { ChallengeTitle: "ChallengeTitle1", ChallengeDesc: "ChallengeDesc1" },
    { ChallengeTitle: "ChallengeTitle2", ChallengeDesc: "ChallengeDesc2" },
    { ChallengeTitle: "ChallengeTitle3", ChallengeDesc: "ChallengeDesc3" },
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
  });

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };

  //When the delete challenge button is hit in the challenge page this function is executed.
  //When an admin deletes a challenge, we load a new one to replace it.
  const deleteChallengeHandler = (challengeToDelete) => {
    console.log(challengeToDelete.ChallengeTitle);
    currentChallenges.forEach(function (challenge) {
      if (challengeToDelete.ChallengeTitle == challenge.ChallengeTitle) {
        challenge.ChallengeTitle = "replace";
        challenge.ChallengeDesc = "replace";
      }
    });
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
        onPageChange={changePageHandler}
        challenge={currentChallenges[0]}
      />
    );
  } else if (currentPage === "challenge2") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[1])}
        onPageChange={changePageHandler}
        challenge={currentChallenges[1]}
      />
    );
  } else if (currentPage === "challenge3") {
    content = (
      <ChallengesScreen
        adminRights={thisUser.isAdmin}
        onDeleteChallenge={() => deleteChallengeHandler(currentChallenges[2])}
        onPageChange={changePageHandler}
        challenge={currentChallenges[2]}
      />
    );
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "settings") {
    content = <SettingsScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "createNewChallenge") {
    content = <CreateNewChallengeScreen onPageChange={changePageHandler}/>;
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
