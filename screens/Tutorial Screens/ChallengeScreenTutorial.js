import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, LayoutAnimation } from "react-native";
import Card from "../../components/Card";
import ColorPalette from "../../constants/ColorPalette";
import Icon from "@expo/vector-icons/FontAwesome";

//Tutorial components
import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import SafeSpaceButton from "../../components/SafeSpaceButton";

import BlinkingView from "../../components/BlinkingView";

const ChallengeScreenTutorial = (props) => {
  // challenge details recieved from App.js
  const [challenge, setChallenge] = useState({
    title: "Challenge Title",
    description: "Challenge Description",
    difficulty: "(Hard) ",
    score: " 300xp",
  });
  
  const [buttonTitle, setButtonTitle] = useState("Im listening...");

  const [stage, setStage] = useState(0);

  let theme = ColorPalette();

  const spawnRefreshArrow = () => {
    if (stage === 1) {
      return (
        <BlinkingView style={styles.refreshArrowIcon}>
          <Icon style={{ color: theme.offcolor }} size={40} name="arrow-left" />
        </BlinkingView>
      );
    } else {
      return;
    }
  };

  const spawnCompleteArrow = () => {
    if (stage === 2) {
      return (
        <BlinkingView style={styles.completeArrowIcon}>
          <Icon
            style={{ color: theme.offcolor }}
            size={40}
            name="arrow-right"
          />
        </BlinkingView>
      );
    } else {
      return;
    }
  };

  const spawnTitleCardArrow = () => {
    if (stage === 0) {
      return (
        <BlinkingView style={styles.challengeArrowIcon}>
          <Icon style={{ color: theme.highlight }} size={40} name="arrow-right" />
        </BlinkingView>
      );
    } else {
      return;
    }
  };

  //Display tutorial text depending on the current stage.
  const createTutorialText = () => {
    if (stage === 0) {
      return (
        "This is the Safe_ challenge page! This is where you go to learn more " +
        "about a challenge, and most importantly, complete challenges for experience! " +
        ""
      );
    } else if (stage === 1) {
      return (
        "At the bottom you can see the refresh button, which gets gets rid of that " +
        "challenge, however, you can reroll one challenge per day, so choose wisely! "
      );
    } else if (stage === 2) {
      return (
        "Next to the refresh is the complete challenge button. Whenever you have " +
        "finished that challenge, press the button for XP!"
      );
    }
  };

  //Change the button title depending on the stage,
  //and allow us to navigate off the page by pressing the button
  //whenever the user goes through all the stages on the page.
  const handlePress = () => {
    LayoutAnimation.spring();
    if (stage === 0) {
      setButtonTitle("Alright.");
    } else if (stage === 1) {
      setButtonTitle("Sounds Good!");
    } else if (stage === 2) {
      props.onPageChange("healthTutorial");
    }
    setStage(stage + 1);
  };

  // function to check if video exists to be embedded
  function videoDisplay(isLink, description) {
    if (isLink) {
      return (
        <Webview
          style={{ width: "94%", alignSelf: "center", marginVertical: 10 }}
          source={{ uri: "https://www.youtube.com/embed/" + description }}
        />
      );
    } else {
      return (
        <Card style={styles.card}>
          {spawnTitleCardArrow()}
          <Text
            style={[
              styles.body,
              { textShadowColor: theme.highlight, color: theme.offcolor },
            ]}
          >
            {challenge.description}
          </Text>
        </Card>
      );
    }
  }

  return (
    // Create the screen object
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={styles.cardContainer}>
        {/* Create the cards that contain the title and the description seperately */}
        <Card style={styles.card}>
          {spawnTitleCardArrow()}
          <Text
            style={[
              styles.title,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            {challenge.title}
          </Text>
          <View style={styles.challengeDifficultyContainer}>
            <Text
              style={[
                styles.body,
                { textShadowColor: theme.highlight, color: theme.offcolor },
              ]}
            >
              {challenge.difficulty}
            </Text>
            <Text
              style={[
                styles.body,
                { textShadowColor: theme.highlight, color: theme.offcolor },
              ]}
            >
              {challenge.score}
            </Text>
          </View>
        </Card>
        {videoDisplay(challenge.isLink, challenge.description)}
      </View>
      {/* Create the container for the refresh and button complete (it's invisible and is just here for layout reasons) */}
      <View>
        <TutorialSquare>
          <TutorialText>{createTutorialText()}</TutorialText>
          <SafeSpaceButton
            title={buttonTitle}
            onPress={() => handlePress()}
          />
        </TutorialSquare>
      </View>
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
        {spawnRefreshArrow()}
        {spawnCompleteArrow()}
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

  challengeDifficultyContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  challengeArrowIcon: {
    position: "absolute",
    top: "50%",
    left: "7%",
  },

  refreshArrowIcon: {
    position: "absolute",
    left: "40%",
    top: "30%",
  },

  completeArrowIcon: {
    position: "absolute",
    left: "50%",
    top: "30%",
  },

  cardContainer: {
    width: "100%",
  },

  card: {
    marginVertical: 15,
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
    fontSize: 20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
  },

  icon: {
    fontSize: 64,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
  },
});

export default ChallengeScreenTutorial;
