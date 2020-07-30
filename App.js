import React, { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage, Alert } from "react-native";

import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChallengesScreen from "./screens/ChallengesScreen";
import HeatmapScreen from "./screens/Heatmap";
import SettingsScreen from "./screens/SettingsScreen";
import ColorPalette from "./constants/ColorPalette"

export default function App() {
  //Page Functions (No need for DB)
  const [currentPage, setCurrentPage] = useState("main screen");
  
  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };

  // User info should be loaded in from DB, then can be passed to functions as a prop.  Photo is a default stock photo.
  const[thisUser, setUser] = useState({FullName:"Name",Level:0,Lives:3,Score:0,URLPic:"https://i.stack.imgur.com/l60Hf.png",WeeklyStreak:0})

  // CloudFunction needed to load this array with user's current challenge titles and descriptions (array of tuples)
  const[currentChallenges, setCurrentChallenges] = useState([{ChallengeTitle:"ChallengeTitle1",ChallengeDesc:"ChallengeDesc1"},
  {ChallengeTitle:"ChallengeTitle2",ChallengeDesc:"ChallengeDesc2"},{ChallengeTitle:"ChallengeTitle3",ChallengeDesc:"ChallengeDesc3"}]);

  //Alert state
  let myAlert;
  const leavingSpace = () =>{
    Alert.alert (
      "You're About to Leave Your Safe__",
      "Are you going out for a legitimate reason",
      [
        {
          text: "I am!",
          onPress: () => console.log("Display Tips, Don't Decrement"),
          style: 'cancel'
        },
        {
          text: "I'm Not'",
          onPress: () => console.log("Decrement Life")
        }
      ]
    )
  };

  const lostLastLife = () =>{
    Alert.alert (
      "Sorry, You've Lost Your Last Life",
      "Try to maintain social distance and when possible stay at home.",
      [
        {
          text: "OK",
          onPress: () => console.log("Last life lost, set streak to 0"),
          style: 'cancel'
        },
        {
          text: "Chance?",
          onPress: () => console.log("Get challenge or redeem something")
        }
      ]
    )
  }


  const[thisAlert, setAlert] = useState("none");

  const changeAlert = (newAlert) => {
    setAlert(newAlert);
  };
  //Set if group function for alerts, to be changed on events ONLY.
  if (thisAlert === "none"){
    myAlert = null;
  } else {
    myAlert = lostLastLife();
  }


  let content;

  if (currentPage === "main screen") {
    content = <MainScreen onPageChange={changePageHandler} challenges={currentChallenges} profile={thisUser}/>;
  } else if (currentPage === "profile") {
    content = <ProfileScreen onPageChange={changePageHandler} profile={thisUser}/>;
  } else if (currentPage === "challenge1") {
    content = <ChallengesScreen onPageChange={changePageHandler} challenge={currentChallenges[0]}/>;
  }  else if (currentPage === "challenge2") {
    content = <ChallengesScreen onPageChange={changePageHandler} challenge={currentChallenges[1]}/>;
  }  else if (currentPage === "challenge3") {
    content = <ChallengesScreen onPageChange={changePageHandler} challenge={currentChallenges[2]}/>;
  } else if (currentPage === "heatmap") {
    content = <HeatmapScreen onPageChange={changePageHandler}/>;
  } else if (currentPage === "settings") {
    content = <SettingsScreen onPageChange={changePageHandler}/>;
  }


  return <View style={styles.container}>{content}{myAlert}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
