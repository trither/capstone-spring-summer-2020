import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChallengesScreen from "./screens/ChallengesScreen";
import HeatmapScreen from "./screens/Heatmap";
import SettingsScreen from "./screens/SettingsScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main screen");

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };
  let content;

  if (currentPage === "main screen") {
    content = <MainScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "profile") {
    content = <ProfileScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "challenges") {
    content = <ChallengesScreen onPageChange={changePageHandler} />;
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler}/>;
  } else if (currentPage === "settings") {
    content = <SettingsScreen onPageChange={changePageHandler}/>;
  }


  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
