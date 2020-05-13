import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ColorPalette from "../constants/ColorPalette";

const MainScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.cardContainer}>
        <Card>
          <Text style={styles.text}> User level + recent challenges completed </Text>
        </Card>
        <Card>
          <Text style={styles.text}> Life Information </Text>
        </Card>
      </View>
      <Footer onButtonPress = {props.onPageChange}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  cardContainer: {
    flex: 2,
    justifyContent: "space-around",
  },


  text: {
    textAlign: "center",
  },
});

export default MainScreen;
