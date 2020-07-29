import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const TutorialText = (props) => {
  let theme = ColorPalette();
  return (
    <View
      style={[
        { ...props.style },
        styles.square,
        { backgroundColor: theme.highlight },
      ]}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    padding: 20,
    marginTop: 50,
    width: "90%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default TutorialText;
