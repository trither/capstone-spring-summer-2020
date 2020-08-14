import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from "react-native";

//From https://reactnative.dev/docs/animations
const test = (props) => {
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  const moveLeftVal = useState(new Animated.Value(0))[0];
  const opacity = useState(new Animated.Value(0))[0];
  const position = useState(new Animated.Value(0))[0];

  const size = useState(new Animated.ValueXY({ x: 100, y: 100 }))[0];
  const spinVal = useState(new Animated.Value(0))[0];
  const spin = spinVal.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spring = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(position, {
          toValue: 200,
          velocity: 1,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(spinVal, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),

      Animated.timing(spinVal, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.spring(position, {
          toValue: 0,
          velocity: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const looping = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),

      { iterations: 10 }
    ).start();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const moveBall = () => {
    Animated.timing(value, {
      toValue: { x: -1000, y: -1000 },
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  //Move the animated component left
  const moveLeft = () => {
    Animated.timing(moveLeftVal, {
      toValue: 1000,
      duration: 1000,
      /*
        React native has two threads, the ui and js thread. Ideally we want use native driver to be true
        So the animation work is done on the ui thread and javascript computations don't ruin the framerate of the animations!
        The only problem with useNativeDriver: true, is there are less animateable properties, so we need to work around
      */
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          styles.Elipse,
          {
            opacity: opacity,
            transform: [{ translateX: position }, { rotate: spin }],
          },
        ]}
      ></Animated.View>
      <TouchableOpacity onPress={() => looping()}>
        <Text>Yo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  Elipse: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});

export default test;
