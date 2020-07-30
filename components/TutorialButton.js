import React from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const TutorialButton = (props) => {
  let theme = ColorPalette();
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={[
          { ...props.style },
          styles.buttonBorder,
          { borderColor: theme.offcolor },
        ]}
      >
        <TouchableHighlight onPress={() => props.onPress()}>
          <Text style={[{ fontSize: 24 }, { color: theme.offcolor }]}>
            {props.title}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBorder: {
    borderWidth: 1,
    padding: 10,
  },
});

export default TutorialButton;
