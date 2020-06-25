import React from "react";
import { View, StyleSheet, Button, TouchableHighlight, TouchableOpacity, Text,} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";

const Footer = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.onButtonPress("main screen")}>
        <Icon style={styles.icon} name='home' raised='true'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onButtonPress("profile")}>
        <Icon style={styles.icon} name='user' raised='true'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onButtonPress("challenges")}>
        <Icon style={styles.icon} name='trophy' raised='true'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onButtonPress("heatmap")}>
        <Icon style={styles.icon} name='map' raised='true'/>
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
    backgroundColor: ColorPalette.secondary,
  },
  icon: {
    fontSize: 50,
    textShadowColor: ColorPalette.highlight,
    textShadowOffset: { width:0, height:2},
    textShadowRadius: 6,
    shadowOpacity: .2,    
    color: ColorPalette.offcolor,
  }

});
export default Footer;
