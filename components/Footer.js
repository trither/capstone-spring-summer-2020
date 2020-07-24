import React from "react";
import { View, StyleSheet, Button, TouchableHighlight, TouchableOpacity, Text,} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";

const Footer = (props) => {
  let theme = ColorPalette();
  return (
    <View style={[styles.container, {backgroundColor:theme.secondary}]}>
      <TouchableOpacity onPress={() => props.onButtonPress("main screen")}>
        <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor,}]} name='home' raised='true'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onButtonPress("profile")}>
        <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor,}]} name='user' raised='true'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onButtonPress("heatmap")}>
        <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor,}]} name='map' raised='true'/>
      </TouchableOpacity>
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
  icon: {
    fontSize: 45,
    textShadowOffset: { width:0, height:2},
    textShadowRadius: 6,
    shadowOpacity: .2,    
  }

});
export default Footer;
