import React from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import ColorPalette from "../constants/ColorPalette";
import { FontAwesome } from "@expo/vector-icons";

const TutorialNavbar = (props) => {
  //Load the arrows on the navbar
  const loadArrows = () => {
    //If the page is the welcome tutorial page, there is no previous page so don't spawn the left arrow
    if (props.first) {
      return (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => props.onArrowPress(props.nextPage)}>
            <FontAwesome name="arrow-right" size={50} color="black" />
          </TouchableOpacity>
        </View>
      );
      //if the tutorial page is the heatmap page, there is no other more tutorials so don't spawn the right arrow.
    } else if (props.last) {
      return (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => props.onArrowPress(props.prevPage)}>
            <FontAwesome name="arrow-left" size={50} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.tutorialNavbar}>
          <View style={styles.arrowContainer}>
            <TouchableOpacity
              onPress={() => props.onArrowPress(props.prevPage)}
            >
              <FontAwesome name="arrow-left" size={50} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.arrowContainer}>
            <TouchableOpacity
              onPress={() => props.onArrowPress(props.nextPage)}
            >
              <FontAwesome name="arrow-right" size={50} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  return <View style={styles.tutorialNavbar}>{loadArrows()}</View>;
};

const styles = StyleSheet.create({
  arrowContainer: {
    margin: 40,
  },

  tutorialNavbar: {
    flexDirection: "row",
  },
});

export default TutorialNavbar;
