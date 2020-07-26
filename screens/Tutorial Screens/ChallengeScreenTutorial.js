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
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import TutorialNavbar from "../../components/TutorialNavbar";
import Header from "../../components/Header";
import ColorPalette from "../../constants/ColorPalette";
import Icon from "@expo/vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const ChallengeScreenTutorial = (props) => {
  return (
    <View style={styles.screen}>
      <Text>
        This is the safe space challenge screen, this is where you will find
        more information on specific challenges, and see the difficulty, as well
        as how much experience the challenge is worth. Additionally, this is the
        place to go to when you complete a challenge. Lastly you can also reroll
        challenges on this screen as you could on the main screen.
      </Text>
      <TutorialNavbar
        first={false}
        last={false}
        nextPage={"profileTutorial"}
        prevPage={"healthTutorial"}
        onArrowPress={props.onPageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.primary,
  },
});

export default ChallengeScreenTutorial;
