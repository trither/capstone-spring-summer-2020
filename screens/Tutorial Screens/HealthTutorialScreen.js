import React, { useState } from "react";
import { View, StyleSheet, Text, LayoutAnimation } from "react-native";
import ColorPalette from "../../constants/ColorPalette";
import BubbleType from "../../constants/BubbleType";

//Tutorial components
import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import SafeSpaceButton from "../../components/SafeSpaceButton";

const HealthTutorial = (props) => {
  const [stage, setStage] = useState(0);
  const [buttonTitle, setButtonTitle] = useState(
    "What happens if I break social distance?"
  );
  const [lives, setLives] = useState(3);
  let theme = ColorPalette();
  let myBubble = BubbleType();

  const handlePress = () => {
    LayoutAnimation.spring();
    if (stage === 0) {
      setLives(2);
      setButtonTitle("I will try my best to maintain social distance.");
    } else if (stage === 1) {
      setButtonTitle("Good to know!");
    } else if (stage === 2) {
      props.onPageChange("profileTutorial");
    }
    setStage(stage + 1);
  };

  const createTutorialText = () => {
    if (stage === 0) {
      return "In Safe_, your health points are tracked on the main screen. ";
    }
    if (stage === 1) {
      return (
        "Simply put, if you break social distance, you will lose a health point (hp). " +
        "Losing three hp will result in you failing for that week, but don't worry to much if you do, " +
        "there is always next week!"
      );
    }
    if (stage === 2) {
      return "Oh, and one last thing, your hp will be restored to full at the begining of each week, so try to survive until then!";
    }
  };

  //API grab lives remaining
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  let bubble;
  if (lives === 1) {
    bubble = myBubble.oneLife;
  } else if (lives === 2) {
    bubble = myBubble.twoLife;
  } else if (lives === 3) {
    bubble = myBubble.thrLife;
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={[styles.tutorialHealth, { borderColor: theme.highlight }]}>
        <Text
          style={[
            styles.text,
            { color: theme.offcolor, textShadowColor: theme.highlight },
          ]}
        >
          Hearts Remaining
        </Text>
        <View>{bubble}</View>
      </View>
      <View>
        <TutorialSquare>
          <TutorialText>
            {createTutorialText()}
            {/*In Safe_ you start 3 health, when you break social distancing by
            coming to close to others, you will lose one health point (hp). If
            your hp reaches zero, you lose the game. However, don't worry to
            much about losing hp, because hp can be regained during the week by
            actively completing challenges. PRO tip: Social distancing is not
            enforced at your home location, so don't worry about losing hp while
            at home!*/}
          </TutorialText>
          <SafeSpaceButton title={buttonTitle} onPress={() => handlePress()} />
        </TutorialSquare>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  arrowContainer: {
    margin: 40,
  },

  tutorialNavbar: {
    flexDirection: "row",
  },

  text: {
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  image: {
    height: 125,
    width: 360,
    alignSelf: "center",
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
