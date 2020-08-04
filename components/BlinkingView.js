import React, { useState, useEffect } from "react";
import { Animated, } from "react-native";

//From https://reactnative.dev/docs/animations
const BlinkingView = (props) => {
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
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
      { iterations: 100000 }
    ).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={
        [props.style, { opacity: opacity }]
        // Bind opacity to animated value
      }
    >
      {props.children}
    </Animated.View>
  );
};

export default BlinkingView;
