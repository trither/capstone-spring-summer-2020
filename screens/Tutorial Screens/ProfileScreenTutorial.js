import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import TutorialNavbar from "../../components/TutorialNavbar";
import ColorPalette from "../../constants/ColorPalette";

const ProfileScreenTutorial = (props) => {
  return (
    <View style={styles.screen}>
      <Text>
          Profile
      </Text>
      <TutorialNavbar
        first={false}
        last={false}
        nextPage={"heatmapTutorial"}
        prevPage={"challengeTutorial"}
        onArrowPress={props.onPageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.primary,
  },
});

export default ProfileScreenTutorial;