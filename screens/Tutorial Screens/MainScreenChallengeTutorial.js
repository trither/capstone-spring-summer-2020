import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from "react-native";

//Components
import TutorialNavbar from "../../components/TutorialNavbar";
import FadeInView from "../../components/FadeInView";

//constants
import ColorPalette from "../../constants/ColorPalette";
import BubbleType from "../../constants/BubbleType";
import Icon from "@expo/vector-icons/FontAwesome";

const MainScreenTutorial = (props) => {
  const [showChallengeArrow, setShowChallengeArrow] = useState(false);
  let myBubble = BubbleType();
  let theme = ColorPalette();

  const spawnChallengeArrow = () => {
    if (showChallengeArrow) {
      return (
        <FadeInView>
          <Icon
            style={{ color: theme.offcolor }}
            size={20}
            name="arrow-right"
          />
        </FadeInView>
      );
    } else {
      return;
    }
  };
  var lives = 3;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  if (lives === 1) {
    bubble = myBubble.oneLife;
  } else if (lives === 2) {
    bubble = myBubble.twoLife;
  } else if (lives === 3) {
    bubble = myBubble.thrLife;
  }

  //API for Challenge Titles
  var ch1 = "Challenge 1";
  var ch2 = "Challenge 2";
  var ch3 = "Challenge 3";

  return (
    <View style={[styles.screen, {backgroundColor: theme.primary}]}>
      <View style={styles.body}>
        <View style={styles.challengeContainerTutorial}>
          <View style={styles.challenge}>
            {spawnChallengeArrow()}
            <TouchableOpacity
              onPress={() => props.onPageChange("challenge1")}
              width="80%"
            >
              <Text style={styles.text}> {ch1} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert("Refresh")}
              width="20%"
            >
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
            <TouchableOpacity
              onPress={() => Alert.alert("Refresh")}
              width="20%"
            >
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
            <TouchableOpacity
              onPress={() => Alert.alert("Refresh")}
              width="20%"
            >
              <Icon style={styles.icon} name="refresh" raised="true" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.square, {backgroundColor: theme.highlight}]}>
          <Text style={styles.bodyText}>
            Every day you will be presented with three possible challenges.
            Challenges include a variaty of activities to help you stay healthy
            and active during the COVID-19 pandemic.
          </Text>
          <View
            style={[
              styles.buttonBorder,
              { borderWidth: 1 },
              { borderColor: theme.offcolor },
            ]}
          >
            <TouchableHighlight onPress={() => setShowChallengeArrow(true)}>
              <Text
                style={[
                  { fontSize: 24 },
                  { color: theme.offcolor },
                  { textAlign: "center" },
                ]}
              >
                Go on...
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.health}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  buttonBorder: {
    borderWidth: 1,
    padding: 10,
    width: "50%",
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "center",
  },

  arrowContainer: {
    marginLeft: 30,
    marginRight: 30,
  },

  body: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },

  square: {
    padding: 20,
    width: "90%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  bodyText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },

  challengeContainerTutorial: {
    width: "95%",
    borderWidth: 3,
    borderColor: ColorPalette.highlight,
    padding: 5,
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
