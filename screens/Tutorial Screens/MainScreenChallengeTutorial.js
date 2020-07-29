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
import FadeInView from "../../components/FadeInView";

//Tutorial components
import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import TutorialButton from "../../components/TutorialButton";
import TutorialNavbar from "../../components/TutorialNavbar";

//constants
import ColorPalette from "../../constants/ColorPalette";
import BubbleType from "../../constants/BubbleType";
import Icon from "@expo/vector-icons/FontAwesome";

const MainScreenTutorial = (props) => {
  const [tutorialContent, setTutorialContent] = useState(0);
  let myBubble = BubbleType();
  let theme = ColorPalette();

  const spawnChallengeArrow = () => {
    if (tutorialContent === 1) {
      return (
        <FadeInView style={styles.arrowIcon}>
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

  const spawnButton = () => {
    if (tutorialContent === 0) {
      return (
        <TutorialButton
          onPress={() => setTutorialContent(tutorialContent + 1)}
          title="Go On..."
        />
      );
    }
    return (
      <TutorialButton
        style={{ opacity: 0 }}
        onPress={() => setTutorialContent(tutorialContent + 1)}
        title="Go On..."
      />
    );
  };

  const createTutorialText = () => {
    if (tutorialContent === 0) {
      return "Every day you will be presented with three possible challenges. Challenges include a variaty of activities to help you stay healthy and active during the COVID-19 pandemic.";
    }
    if (tutorialContent === 1) {
      return "Press on one of the challenges!";
    }
  };

  var lives = 3;
  var bubble;
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
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={styles.body}>
        <View
          style={[
            styles.challengeContainerTutorial,
            { borderColor: theme.highlight },
          ]}
        >
          <View
            style={[styles.challenge, { borderBottomColor: theme.offcolor }]}
          >
            {spawnChallengeArrow()}
            <TouchableOpacity
              onPress={() => props.onPageChange("challengeTutorial")}
              width="80%"
            >
              <Text
                style={[
                  styles.text,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                {ch1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert("Refresh")}
              width="20%"
            >
              <Icon
                style={[
                  styles.icon,
                  {
                    textShadowColor: theme.highlight,
                    color: theme.offcolor,
                  },
                ]}
                name="refresh"
                raised="true"
              />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.challenge, { borderBottomColor: theme.offcolor }]}
          >
            {spawnChallengeArrow()}
            <TouchableOpacity
              onPress={() => props.onPageChange("challengeTutorial")}
              width="80%"
            >
              <Text
                style={[
                  styles.text,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                {ch2}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert("Refresh")}
              width="20%"
            >
              <Icon
                style={[
                  styles.icon,
                  {
                    textShadowColor: theme.highlight,
                    color: theme.offcolor,
                  },
                ]}
                name="refresh"
                raised="true"
              />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.challenge, { borderBottomColor: theme.offcolor }]}
          >
            {spawnChallengeArrow()}
            <TouchableOpacity
              onPress={() => props.onPageChange("challengeTutorial")}
              width="80%"
            >
              <Text
                style={[
                  styles.text,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                {ch3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert("Refresh")}
              width="20%"
            >
              <Icon
                style={[
                  styles.icon,
                  {
                    textShadowColor: theme.highlight,
                    color: theme.offcolor,
                  },
                ]}
                name="refresh"
                raised="true"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TutorialSquare>
          <TutorialText>{createTutorialText()}</TutorialText>
          {spawnButton()}
        </TutorialSquare>
        <View style={styles.health}>
          <Text style={styles.text}> Hearts Remaining </Text>
          <View>{bubble}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  arrowIcon: {
    position: "absolute",
    left: 0,
  },

  body: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },

  challengeContainerTutorial: {
    width: "95%",
    borderWidth: 3,
    padding: 5,
    marginTop: 30,
  },

  text: {
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

  challenge: {
    height: 40,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
    borderBottomWidth: 4,
    borderBottomStartRadius: 45,
    borderBottomEndRadius: 45,
  },

  icon: {
    fontSize: 35,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
  },

  health: {
    marginTop: "20%",
    alignSelf: "center",
  },
});

export default MainScreenTutorial;
