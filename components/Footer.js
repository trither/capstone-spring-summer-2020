import React from "react";
import { View, StyleSheet, Button, TouchableHighlight } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const Footer = (props) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => props.onButtonPress("main screen")} title="Home" />
      <Button onPress={() => props.onButtonPress("profile")} title="Profile" />
      <Button onPress={() => props.onButtonPress("challenges")} title="Challenges" />
      <Button onPress={() => props.onButtonPress("heatmap")} title="Heatmap" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Footer;
