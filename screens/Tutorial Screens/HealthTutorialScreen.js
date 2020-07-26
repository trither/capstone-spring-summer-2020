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
import TutorialNavbar from "../../components/TutorialNavbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import ColorPalette from "../../constants/ColorPalette";
import BubbleType from "../../constants/BubbleType";
import Header from "../../components/Header";
import Icon from "@expo/vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const HealthTutorial = (props) => {
  //API grab lives remaining
  var lives = 3;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  let myBubble = BubbleType();
  if (lives === 1) {
    bubble = myBubble.oneLife;
  } else if (lives === 2) {
    bubble = myBubble.twoLife;
  } else if (lives === 3) {
    bubble = myBubble.thrLife;
  }

  return (
    <View style={styles.screen}>
      <Header onButtonPress={props.onPageChange} />
      <View style={styles.tutorialHealth}>
        <Text style={styles.text}> Hearts Remaining </Text>
        <View>{bubble}</View>
      </View>
      <View>
        <Text>
          In Safe_ you start 3 health, when you break social distancing by
          coming to close to others, you will lose one health point (hp). If
          your hp reaches zero, you lose the game. However, don't worry to much
          about losing hp, because hp can be regained during the week by
          actively completing challenges. PRO tip: Social distancing is not
          enforced at your home location, so don't worry about losing hp while
          at home!
        </Text>
      </View>
      <TutorialNavbar
        first={false}
        last={false}
        nextPage={"challengeTutorial"}
        prevPage={"mainChallengeTutorial"}
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

  arrowContainer: {
    margin: 40,
  },

  tutorialNavbar: {
    flexDirection: "row",
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

export default HealthTutorial;
