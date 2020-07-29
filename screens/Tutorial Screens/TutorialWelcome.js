import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import Octagon from "../../components/Octagon";
import ColorPalette from "../../constants/ColorPalette";
import FadeInView from "../../components/FadeInView";

//Tutorial components.
import TutorialText from "../../components/TutorialText";
import TutorialSquare from "../../components/TutorialSquare";
import TutorialButton from "../../components/TutorialButton";

const TutorialWelcome = (props) => {
  let theme = ColorPalette();

  const handlePress = () => {
    props.onPageChange("mainChallengeTutorial");
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      <View style={[styles.Elipse, { backgroundColor: theme.highlight }]}>
        <Octagon theme={theme} />
        <Text style={styles.title}>Safe_</Text>
        <Text style={styles.slogan}> The Game of Social Distancing </Text>
      </View>

      <FadeInView>
        <TutorialSquare>
          <Text style={styles.smallTitle}> Welcome to Safe_! </Text>
          <TutorialText>
            The goal of the game is to complete challenges and earn experience
            while simaltainously trying to 'survive' the week by maintaing
            social distance.
          </TutorialText>
        </TutorialSquare>
      </FadeInView>
      <TutorialButton onPress={() => handlePress()} title="Learn How to Play!"/>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    fontSize: 36,
    top: "30%",
  },

  smallTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "black",
    margin: 10,
  },

  bodyText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },

  square: {
    padding: 20,
    width: "90%",
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
  },

  Elipse: {
    marginTop: 25,
    width: 320,
    height: 320,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TutorialWelcome;
