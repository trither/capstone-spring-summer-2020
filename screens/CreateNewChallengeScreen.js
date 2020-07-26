import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import RaidioButton from "../components/RaidoButton";

const CreateNewChallengeScreen = (props) => {
  const [selected, setSelected] = useState(0);
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
    difficulty: "",
    exp: 0,
    type: "",
    isLink: false,
  });

  const handleYesSelect = () => {
    setSelected(1);
    challenge.isLink = true;
  };

  const handleNoSelect = () => {
    setSelected(2);
    challenge.isLink = false;
  };

  const handleConfirm = () => {
    //write the challenge object to the database
    props.onPageChange("main screen");
  };

  const handleCancel = () => {
    props.onPageChange("main screen");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.body}>
          <Text style={styles.screenTitle}> Add a Challenge. </Text>
          <TextInput
            style={styles.addChallengeInput}
            placeholder="Challenge Name..."
            onChangeText={(text) => {
              challenge.title = text;
            }}
          ></TextInput>
          <TextInput
            style={styles.addChallengeInput}
            multiline={true}
            placeholder="Challenge Description..."
            onChangeText={(text) => {
              challenge.description = text;
            }}
          ></TextInput>
          <TextInput
            style={styles.addChallengeInput}
            placeholder="Challenge Difficulty..."
            onChangeText={(text) => {
              challenge.difficulty = text;
            }}
          ></TextInput>
          <TextInput
            style={styles.addChallengeInput}
            keyboardType="number-pad"
            placeholder="Challenge Experience..."
            onChangeText={(text) => {
              challenge.exp = parseInt(text, 10);
            }}
          ></TextInput>
          <TextInput
            style={styles.addChallengeInput}
            placeholder="Challenge Type..."
            onChangeText={(text) => {
              challenge.title = text;
            }}
          ></TextInput>
          <View style={styles.raidioContainer}>
            <Text style={styles.raidioText}>
              Does the challenge have an associated video?
            </Text>
            <View style={styles.raidioButtonContainer}>
              <Text style={styles.raidioText}>Yes</Text>
              <TouchableHighlight
                style={styles.raidioButton}
                onPress={() => handleYesSelect()}
              >
                <RaidioButton id={1} selected={1 === selected} />
              </TouchableHighlight>
              <Text style={styles.raidioText}>No</Text>
              <TouchableHighlight
                style={styles.raidioButton}
                onPress={() => handleNoSelect()}
              >
                <RaidioButton id={2} selected={2 === selected} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Confirm" onPress={() => handleConfirm()} />
            <Button title="Cancel" color="red" onPress={() => handleCancel()} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  screenTitle: {
    fontSize: 30,
    marginBottom: "10%",
  },

  body: {
    marginTop: "15%",
    alignItems: "center",
    marginBottom: "15%",
  },

  raidioContainer: {
    marginTop: "5%",
    alignItems: "center",
  },

  raidioButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
  },

  raidioButton: {
    margin: 10,
  },

  raidioText: {
    textAlign: "center",
    fontSize: 18,
  },

  addChallengeInput: {
    borderBottomWidth: 1,
    width: "70%",
    margin: 15,
    fontSize: 20,
  },

  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
});

export default CreateNewChallengeScreen;
