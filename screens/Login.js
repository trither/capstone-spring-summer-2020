import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";

const LoginScreen = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TextInput placeholder="Enter username..." style={styles.input} />
        <TextInput placeholder="Enter password..." style={styles.input}/>
        <Button title="Login"/>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    padding: 30,
    height: 30,
    width: "80%",
    marginVertical: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default LoginScreen;
