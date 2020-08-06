import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import BubbleType from "../constants/BubbleType";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";
import SafeSpaceButton from "../components/SafeSpaceButton";

const MainScreen = (props) => {
  let theme = ColorPalette();
  let myBubble = BubbleType();
  //If the user is an admin. Create the admin add new challenge button.
  const AdminAddChallengeButton = () => {
    if (props.adminRights) {
      return (
          <SafeSpaceButton
            onPress={() => props.onPageChange("createNewChallenge")}
            title="Add Challenge."
          />
      );
    }
  };
  //API grab lives remaining
  var lives = props.profile.Lives;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  let bubble;
  var types = myBubble.type;
  if (lives === 1) {
    bubble = myBubble.oneLife;
  } else if (lives === 2) {
    bubble = myBubble.twoLife;
  } else if (lives === 3) {
    bubble = myBubble.thrLife;
  }
  //Set theme for page
  //API for Challenge Titles
  var ch1 = props.challenges[0].title;
  var ch2 = props.challenges[1].title;
  var ch3 = props.challenges[2].title;

  return (
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={styles.cardContainer}>
        <View
          style={[
            styles.challenge,
            {
              backgroundColor: theme.primary,
              borderBottomColor: theme.offcolor,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => props.onPageChange("challenge1")}
            width="80%"
          >
            <Text
              style={[
                styles.text,
                { color: theme.offcolor, textShadowColor: theme.highlight, width:250 },
              ]}
            >
              {ch1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon
              style={[
                styles.icon,
                { textShadowColor: theme.highlight, color: theme.offcolor },
              ]}
              name="refresh"
              raised="true"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.challenge,
            {
              backgroundColor: theme.primary,
              borderBottomColor: theme.offcolor,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => props.onPageChange("challenge2")}
            width="80%"
          >
            <Text
              style={[
                styles.text,
                { color: theme.offcolor, textShadowColor: theme.highlight, width:250 },
              ]}
            >
              {ch2}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon
              style={[
                styles.icon,
                { textShadowColor: theme.highlight, color: theme.offcolor },
              ]}
              name="refresh"
              raised="true"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.challenge,
            {
              backgroundColor: theme.primary,
              borderBottomColor: theme.offcolor,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => props.onPageChange("challenge3")}
            width="80%"
          >
            <Text
              style={[
                styles.text,
                { color: theme.offcolor, textShadowColor: theme.highlight, width:250 },
              ]}
            >
              {ch3}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon
              style={[
                styles.icon,
                { textShadowColor: theme.highlight, color: theme.offcolor },
              ]}
              name="refresh"
              raised="true"
            />
          </TouchableOpacity>
        </View>
        {AdminAddChallengeButton()}
        <View style={styles.health}>
          <Text
            style={[
              styles.text,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            {types} Remaining
          </Text>
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

  cardContainer: {
    flex: 2,
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
    width: "100%",
    bottom: 0,
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
    textShadowColor: ColorPalette.highlight,
    color: ColorPalette.offcolor,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
  },

  health: {
    alignSelf: "center",
    position: "absolute",
    bottom: 120,
  },
});

export default MainScreen;
