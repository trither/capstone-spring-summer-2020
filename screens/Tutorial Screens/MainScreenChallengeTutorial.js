import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
//import Footer from ".../components/Footer";

//Components
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Header from "../../components/Header";
import TutorialNavbar from "../../components/TutorialNavbar";

//constants
import ColorPalette from "../../constants/ColorPalette";

import Icon from "@expo/vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const MainScreenTutorial = (props) => {
  //If the user is an admin. Create the admin add new challenge button.
  const AdminAddChallengeButton = () => {
    if (props.adminRights) {
      return (
        <Button
          onPress={() => props.onPageChange("createNewChallenge")}
          color={ColorPalette.offcolor}
          title="Add Challenge."
        />
      );
    }
  };

  const spawnTutorialInfoButton = () => {
    if (props.profile.showTutorial) {
      return (
        <FontAwesome
          style={styles.challengesInfocIcon}
          name="info-circle"
          size={30}
          color="black"
        />
      );
    } else {
      return;
    }
  };

  //API grab lives remaining
  var lives = 3;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  let bubble;
  if (lives === 1) {
    bubble = (
      <Image style={styles.image} source={require("../Assets/OneHeart.png")} />
    );
  } else if (lives === 2) {
    bubble = (
      <Image style={styles.image} source={require("../Assets/TwoHeart.png")} />
    );
  } else if (lives === 3) {
    bubble = (
      <Image
        style={styles.image}
        source={require("../Assets/ThreeHeart.png")}
      />
    );
  }

  //API for Challenge Titles
  var ch1 = "Challenge 1";
  var ch2 = "Challenge 2";
  var ch3 = "Challenge 3";

  return (
    <View style={styles.screen}>
      <Header onButtonPress={props.onPageChange} />
      <View style={styles.challengeContainerTutorial}>
        <View style={styles.challenge}>
          <TouchableOpacity
            onPress={() => props.onPageChange("challenge1")}
            width="80%"
          >
            <Text style={styles.text}> {ch1} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon style={styles.icon} name="refresh" raised="true" />
          </TouchableOpacity>
        </View>
        <View style={styles.challenge}>
          <TouchableOpacity
            onPress={() => props.onPageChange("challenge2")}
            width="80%"
          >
            <Text style={styles.text}> {ch2} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon style={styles.icon} name="refresh" raised="true" />
          </TouchableOpacity>
        </View>
        <View style={styles.challenge}>
          <TouchableOpacity
            onPress={() => props.onPageChange("challenge3")}
            width="80%"
          >
            <Text style={styles.text}> {ch3} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon style={styles.icon} name="refresh" raised="true" />
          </TouchableOpacity>
        </View>
        {AdminAddChallengeButton()}
      </View>
      <Text>
        Every day you will be presented with three possible challenges.
        Challenges include a variaty of activities to help you stay healthy and
        active during the COVID-19 pandemic.
      </Text>
      <View style={styles.tutorialHealth}>
        <Text style={styles.text}> Hearts Remaining </Text>
        <View>{bubble}</View>
      </View>
      <TutorialNavbar
        first={false}
        last={false}
        nextPage={"healthTutorial"}
        prevPage={"welcome"}
        onArrowPress={props.onPageChange}
      />
      <Footer onButtonPress={props.onPageChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: ColorPalette.primary,
  },

  challengeContainerTutorial: {
    width: "95%",
    borderWidth: 2,
  },

  challengeContainer: {
    width: "95%",
  },

  text: {
    color: ColorPalette.offcolor,
    textShadowColor: ColorPalette.highlight,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  image: {
    height: 125,
    width: 360,
    alignSelf: "center",
  },

  chContatiner: {
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: ColorPalette.secondary,
  },

  challenge: {
    height: 40,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: ColorPalette.secondary,
    margin: 5,
    borderBottomWidth: 4,
    borderBottomStartRadius: 45,
    borderBottomEndRadius: 45,
    borderBottomColor: ColorPalette.offcolor,
  },

  icon: {
    fontSize: 35,
    textShadowColor: ColorPalette.highlight,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    color: ColorPalette.offcolor,
  },

  health: {
    marginTop: "20%",
    alignSelf: "center",
  },

  tutorialHealth: {
    marginTop: "20%",
    alignSelf: "center",
    borderWidth: 2,
  },
});

export default MainScreenTutorial;
