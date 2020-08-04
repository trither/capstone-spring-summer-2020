import React from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";

const Header = (props) => {
  let theme = ColorPalette();
  return (
    <View style={[styles.header, { backgroundColor: theme.secondary }]}>
            <TouchableOpacity
        style={styles.left}
        onPress={() => props.onButtonPress("welcome")}
      >
        <Icon style={styles.icon} name="info" raised="true" />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerTitle,
          { color: theme.offcolor, textShadowColor: theme.highlight },
        ]}
      >
        Safe__
      </Text>
      <TouchableOpacity
        onPress={() => props.onButtonPress("settings")}
        style={[
          styles.touchable,
          { color: theme.offcolor, textShadowColor: theme.highlight },
        ]}
      >
        <Icon
          style={[
            styles.icon,
            { textShadowColor: theme.highlight, color: theme.offcolor },
          ]}
          name="cog"
          raised="true"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  left: {
    position: "absolute",
    left: "10%",
    top:"90%",
  },

  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.26,
  },
  icon: {
    fontSize: 30,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
  },
  touchable: {
    position: "relative",
    left: 120,
    top: 0,
  },
});
export default Header;
