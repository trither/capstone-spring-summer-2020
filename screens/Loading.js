import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const LoadingScreen = (props) => {
  //load challenges and user profile
  useEffect(() => {


  }, []);

  return (
    <View style={styles.screen}>
      <Text>UID: {props.uid} Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default LoadingScreen;
