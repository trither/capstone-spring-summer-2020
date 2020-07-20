import React from "react";
import { View, StyleSheet, Button } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const RaidioButton = (props) => {
  return (
    <View style={[styles.circle, props.style]}>
      {props.selected ? <View style={styles.selectedCircle} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});

export default RaidioButton;
