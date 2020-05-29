import React from "react";
import { View, StyleSheet, Button, TouchableHighlight, } from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";

const Footer = (props) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => props.onButtonPress("main screen")} title="Home" color={ColorPalette.offcolor}/>
      <Button onPress={() => props.onButtonPress("profile")} title="Profile" color={ColorPalette.offcolor}/>
      <Button onPress={() => props.onButtonPress("challenges")} title="Challenges" color={ColorPalette.offcolor}/>
      <Button onPress={() => props.onButtonPress("heatmap")} title="Heatmap" color={ColorPalette.offcolor}/>
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
    backgroundColor: ColorPalette.secondary,
  },

});
export default Footer;
