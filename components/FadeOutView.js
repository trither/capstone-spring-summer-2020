import React, { useRef, useState, useEffect } from "react";
import { Animated, Text, View } from "react-native";

//From https://reactnative.dev/docs/animations
const FadeOutView = (props) => {
  const opacity = useState(new Animated.Value(1))[0];

  if (props.fadeOut) {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

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

export default FadeOutView;
