import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Card from "../../components/Card";
import ColorPalette from "../../constants/ColorPalette";
import Icon from "@expo/vector-icons/FontAwesome";

//Tutorial components
import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import TutorialButton from "../../components/TutorialButton";
import TutorialNavbar from "../../components/TutorialNavbar";

const ChallengeScreenTutorial = (props) => {
  // challenge details recieved from App.js
  const [challenge, setChallenge] = useState({
    title: "title",
    description: "description",
  });

  const handlePress = () => {
    props.onPageChange("healthTutorial");
  };

  let theme = ColorPalette();

  return (
    // Create the screen object
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={styles.cardContainer}>
        {/* Create the cards that contain the title and the description seperately */}
        <Card>
          <Text
            style={[
              styles.title,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            {challenge.title}
          </Text>
        </Card>
        <Card>
          <Text
            style={[
              styles.body,
              { textShadowColor: theme.highlight, color: theme.offcolor },
            ]}
          >
            {challenge.description}
          </Text>
        </Card>
      </View>
      {/* Create the container for the refresh and button complete (it's invisible and is just here for layout reasons) */}
      <TutorialSquare>
        <TutorialText>
          This is the safe_ challenge page. This is where you should go if you
          are looking for more information on a specific challenge.
          Specifically, if you are looking for the difficulty, description, and
          experience the challenge provides. complete challenges. Lastly, this
          is the page to go to when you have finished a challenge. You may also
          reroll the challenge on this page, as you could on the main screen
        </TutorialText>
      </TutorialSquare>
      <TutorialButton title="Okay, Got it." onPress={() => handlePress()} />
      <View
        style={[styles.buttonContainer, { backgroundColor: theme.primary }]}
      >
        {/* Create the squares the the buttons exist on top of (buttonBoxes) */}
        <Card style={styles.buttonBox}>
          {/* CloudFunctions needed here to fetch new challnege and put the new data into the title and description elements above*/}
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
        </Card>
        <Card style={styles.buttonBox}>
          {/* CloudFunctions needed here to recieve challenge completed data*/}
          <TouchableOpacity
            onPress={() => Alert.alert("Challenge Marked Complete")}
            width="20%"
          >
            <Icon
              style={[
                styles.icon,
                { textShadowColor: theme.highlight, color: theme.offcolor },
              ]}
              name="check"
              raised="true"
            />
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

// Styles for all the elements/objects above
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
  },

  cardContainer: {
    width: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonBox: {
    width: 100,
    height: 100,
  },

  title: {
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },

  body: {
    textAlign: "center",
    fontSize: 16,
  },

  icon: {
    fontSize: 64,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
  },
});

export default ChallengeScreenTutorial;
