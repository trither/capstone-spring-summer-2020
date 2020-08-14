import React from "react";
import { View, StyleSheet, Button } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const RaidioButton = (props) => {
  let theme = ColorPalette();
  return (
    <View style={[styles.circle, props.style, {borderColor: theme.offcolor}]}>
      {props.selected ? <View style={[styles.selectedCircle, {backgroundColor: theme.offcolor}]} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});

export default RaidioButton;
