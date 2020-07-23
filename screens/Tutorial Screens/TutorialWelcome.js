import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from "react-native";
import Footer from "../../components/Footer";
import Octagon from "../../components/Octagon";
import Card from "../../components/Card";
import TutorialNavbar from "../../components/TutorialNavbar";
import Header from "../../components/Header";
import ColorPalette from "../../constants/ColorPalette";
import Icon from "@expo/vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const TutorialWelcome = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.Elipse}>
        <Octagon></Octagon>
        <Text style={styles.title}>Safe_</Text>
        <Text style={styles.slogan}> The Game of Social Distancing </Text>
      </View>

      <View style={styles.square}>
        <Text style={styles.smallTitle}> Welcome to Safe_! </Text>
        <Text style={styles.bodyText}>
          The goal of the game is to complete challenges and earn experience
          while simaltainously trying to 'survive' the week by maintaing social
          distance.
        </Text>
      </View>

      <View style={styles.buttonBorder}>
        <TouchableHighlight onPress={() => props.onPageChange("mainChallengeTutorial")}>
          <Text style={styles.buttonText}>Learn how to play!</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
    color: ColorPalette.offcolor,
  },

  buttonBorder: {
    borderWidth: 1,
    padding:10,
    borderColor: ColorPalette.highlight,
  },

  title: {
    position: "absolute",
    fontSize: 36,
    top: "30%",
  },

  smallTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
    margin: 10,
  },

  bodyText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  square: {
    padding: 20,
    width: "90%",
    backgroundColor: ColorPalette.highlight,
    borderRadius: 15,
  },

  slogan: {
    top: "50%",
    width: "50%",
    position: "absolute",
    fontSize: 18,
    textAlign: "center",
  },

  screen: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: ColorPalette.primary,
  },

  Elipse: {
    marginTop: 25,
    width: 320,
    height: 320,
    backgroundColor: ColorPalette.highlight,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TutorialWelcome;
