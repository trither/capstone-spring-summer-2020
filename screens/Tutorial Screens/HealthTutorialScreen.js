import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ColorPalette from "../../constants/ColorPalette";
import BubbleType from "../../constants/BubbleType";

//Tutorial components
import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import TutorialButton from "../../components/TutorialButton";
import TutorialNavbar from "../../components/TutorialNavbar";

const HealthTutorial = (props) => {
  let theme = ColorPalette();
  let myBubble = BubbleType();

  const handlePress = () => {
    props.onPageChange("profileTutorial");
  };
  //API grab lives remaining
  var lives = 3;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
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
            In Safe_ you start 3 health, when you break social distancing by
            coming to close to others, you will lose one health point (hp). If
            your hp reaches zero, you lose the game. However, don't worry to
            much about losing hp, because hp can be regained during the week by
            actively completing challenges. PRO tip: Social distancing is not
            enforced at your home location, so don't worry about losing hp while
            at home!
          </TutorialText>
        </TutorialSquare>
      </View>
      <TutorialButton title="okay" onPress={() => handlePress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
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
    fontSize: 16,
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
