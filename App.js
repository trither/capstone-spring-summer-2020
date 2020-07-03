import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChallengesScreen from "./screens/ChallengesScreen";
import HeatmapScreen from "./screens/Heatmap";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main screen");

  // CloudFunction needed to load this array with user's current challenge titles and descriptions (array of tuples)
  const[currentChallenges, setCurrentChallenges] = useState([{ChallengeTitle:"ChallengeTitle1",ChallengeDesc:"ChallengeDesc1"},
  {ChallengeTitle:"ChallengeTitle2",ChallengeDesc:"ChallengeDesc2"},{ChallengeTitle:"ChallengeTitle3",ChallengeDesc:"ChallengeDesc3"}]);

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };
  let content;

  if (currentPage === "main screen") {
    content = <MainScreen onPageChange={changePageHandler} challenges={currentChallenges}/>;
  } else if (currentPage === "profile") {
    content = <ProfileScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "challenge1") {
    content = <ChallengesScreen onPageChange={changePageHandler} challenge={currentChallenges[0]}/>;
  }  else if (currentPage === "challenge2") {
    content = <ChallengesScreen onPageChange={changePageHandler} challenge={currentChallenges[1]}/>;
  }  else if (currentPage === "challenge3") {
    content = <ChallengesScreen onPageChange={changePageHandler} challenge={currentChallenges[2]}/>;
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler}/>;
  }


  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
