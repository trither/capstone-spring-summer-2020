import React, { useState } from "react";
import { View, StyleSheet, Text, Image, LayoutAnimation } from "react-native";
import ColorPalette from "../../constants/ColorPalette";

import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import SafeSpaceButton from "../../components/SafeSpaceButton";
import TutorialNavbar from "../../components/TutorialNavbar";

const ProfileTutorial = (props) => {
  const [stage, setStage] = useState(0);
  const [buttonTitle, setButtonTitle] = useState("Okay, got it.");
  //Set Theme
  let theme = ColorPalette();

  const handlePress = () => {
    LayoutAnimation.spring();
    if(stage === 0){
      setButtonTitle("Got it. Whats next?");
    }
    if (stage === 1) {
      props.onPageChange("heatmapTutorial");
    }
    setStage(stage + 1);
  };

  const createTutorialText = () => {
    if (stage === 0) {
      return "This is the Safe_ profile page. Here you can find your total level, as well as your progress to the next level. ";
    }
    return "Additionally, this is where you go to find the total amount of xp you have earned, as well as your weekly streak, (how many weeks you have survived).";
  };

  //load in values from the user
  var name = props.profile.FullName;
  var level = props.profile.Level;
  var score = props.profile.Score;
  let profilePic = (
    <Image
      style={[styles.profilePicture, { borderColor: theme.offcolor }]}
      source={{ uri: props.profile.URLPic }}
    />
  );
  var streak = props.profile.WeeklyStreak;
  //variables for progress/level bar.  Let me know if you want this moved somewhere else
  var reqExp = 0;
  for (let i = 0; i <= level; i++) {
    if (i === 0) {
      reqExp = reqExp + 100;
    } else if (i < 6) {
      reqExp = reqExp + 300;
    } else if (i < 11) {
      reqExp = reqExp + 500;
    } else if (i < 21) {
      reqExp = reqExp + 700;
    } else {
      reqExp = reqExp + 1000;
    }
  }
  var preqExp = 0;
  if (level !== 0) {
    for (let j = 0; j <= level - 1; j++) {
      for (let i = 0; i <= j; i++) {
        if (i === 0) {
          preqExp = preqExp + 100;
        } else if (i < 6) {
          preqExp = preqExp + 300;
        } else if (i < 11) {
          preqExp = preqExp + 500;
        } else if (i < 21) {
          preqExp = preqExp + 700;
        } else {
          preqExp = preqExp + 1000;
        }
      }
    }
  } else {
    preqExp = 0;
  }
  var currentLevelScore = score - preqExp;
  var getPercent = (currentLevelScore / reqExp) * 100;
  var percentDone = getPercent.toFixed(0) + "%";

  return (
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={[styles.boxTop, stage === 0 ? [styles.showBorder, {borderColor: theme.offcolor}] : null]}>
        <Text
          style={[
            styles.profileName,
            { color: theme.offcolor, textShadowColor: theme.highlight },
          ]}
        >
          {name}
        </Text>
        <View style={[styles.addShadow, { shadowColor: theme.highlight }]}>
          {profilePic}
        </View>
        <View style={styles.levelContainer}>
          <View
            style={[
              styles.levelScoreBox,
              { borderColor: theme.offcolor, shadowColor: theme.highlight },
            ]}
          >
            <Text
              style={[
                styles.levelScore,
                { color: theme.offcolor, textShadowColor: theme.highlight },
              ]}
            >
              {level}
            </Text>
          </View>
          <View
            style={[
              styles.levelBar,
              {
                backgroundColor: theme.primary,
                shadowColor: theme.highlight,
                borderColor: theme.offcolor,
              },
            ]}
          >
            <View
              style={[
                styles.levelBarFill,
                { backgroundColor: theme.highlight },
              ]}
              width={percentDone}
            />
            <Text
              style={[
                styles.levelExp,
                {
                  color: theme.offcolor,
                  textShadowColor: theme.highlight,
                  shadowColor: theme.highlight,
                },
              ]}
            >
              {currentLevelScore} / {reqExp}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.middleBox, stage === 1 ? [styles.showBorder, {borderColor: theme.offcolor}] : null]}>
        <View
          style={[
            styles.statBox,
            { borderColor: theme.offcolor, shadowColor: theme.highlight },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            Total Score
          </Text>
          <Text
            style={[
              styles.scoreText,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            {score}
          </Text>
        </View>
        <View
          style={[
            styles.statBox,
            { borderColor: theme.offcolor, shadowColor: theme.highlight },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            Weekly Streak
          </Text>
          <Text
            style={[
              styles.scoreText,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            {streak}
          </Text>
        </View>
      </View>
      <TutorialSquare>
        <TutorialText>{createTutorialText()}</TutorialText>
        <SafeSpaceButton title={buttonTitle} onPress={() => handlePress()} />
      </TutorialSquare>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
  },

  showBorder: {
    borderWidth: 1,
  },

  text: {
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  profileName: {
    top: 7,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  profilePicture: {
    top: 13,
    height: 125,
    width: 125,
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: 10,
  },

  addShadow: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  boxTop: {
    width: "100%",
    height: 230,
    alignContent: "space-around",
  },

  levelContainer: {
    flexDirection: "row",
    alignSelf: "center",
    top: 23,
  },

  levelScore: {
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  levelScoreBox: {
    height: 35,
    width: 50,
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  levelExp: {
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  levelBar: {
    height: 35,
    width: "80%",
    borderWidth: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  levelBarFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  example: {
    marginVertical: 24,
  },

  middleBox: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  statBox: {
    width: 150,
    height: 80,
    borderWidth: 5,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  scoreText: {
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ProfileTutorial;
