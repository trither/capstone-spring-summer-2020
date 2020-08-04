import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";

//from https://github.com/nmanikumar5/shapes-of-react-native
const Octagon = (props) => {
  return (
    <View style={styles.octagon}>
      <View style={[styles.octagonUp, styles.octagonBar, {backgroundColor: props.theme.offcolor}]}></View>
      <View style={[styles.octagonFlat, styles.octagonBar, {backgroundColor: props.theme.offcolor}]}></View>
      <View style={[styles.octagonLeft, styles.octagonBar, {backgroundColor: props.theme.offcolor}]} ></View>
      <View style={[styles.octagonRight, styles.octagonBar, {backgroundColor: props.theme.offcolor}]}></View>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  octagon: {},
  octagonBar: {
    width: 105,
    height: 250,
  },
  octagonUp: {},
  octagonFlat: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "90deg" }],
  },
  octagonLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "-45deg" }],
  },
  octagonRight: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "45deg" }],
  },
});

export default Octagon;
