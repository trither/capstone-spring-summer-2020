import React, { useRef, useEffect } from "react";
import { Animated, Text, View } from "react-native";

//From https://reactnative.dev/docs/animations
const Test = (props) => {
  /*const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
      }
    ).start();
  }, [fadeAnim])*/
  let opacity = new Animated.Value(0);

  const animate = () => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing: Easing.back(),
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <Animated.View // Special animatable View
      style={{ animatedStyles }}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    height: 160,
    alignItems: "center",
  },
});

export default Test;
