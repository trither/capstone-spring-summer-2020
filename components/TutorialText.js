import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const TutorialText = (props) => {
  let theme = ColorPalette();
  return <Text style={styles.bodyText}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  bodyText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
});

export default TutorialText;
