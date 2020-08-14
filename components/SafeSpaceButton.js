import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const SafeSpaceButton = (props) => {
  let theme = ColorPalette();
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={[
          { ...props.style },
          styles.buttonBorder,
          { borderColor: theme.offcolor },
        ]}
      >
        <TouchableOpacity onPress={() => props.onPress()}>
          <Text
            style={[
              { fontSize: 24, color: theme.offcolor, textAlign: "center" },
            ]}
          >
            {props.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBorder: {
    borderWidth: 1,
    padding: 10,
  },
});

export default SafeSpaceButton;
