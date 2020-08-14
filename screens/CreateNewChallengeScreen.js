import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import RaidioButton from "../components/RaidoButton";
import SafeSpaceButton from "../components/SafeSpaceButton";

const CreateNewChallengeScreen = (props) => {
  let theme = ColorPalette();
  const [selected, setSelected] = useState(0);
  const [difficultySelect, setDifficultySelect] = useState(0);
  const [typeSelect, setTypeSelected] = useState(0);
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
    difficulty: "",
    score: 0,
    type: "",
    isLink: false,
  });

  const handleSelect = (id) => {
    if (id === 1) {
      setTypeSelected(1);
      challenge.type = "Social";
    } else if (id === 2) {
      setTypeSelected(2);
      challenge.type = "Mental";
    } else if (id === 3) {
      setTypeSelected(3);
      challenge.type = "Physical";
    } else if (id === 4) {
      setDifficultySelect(4);
      challenge.difficulty = 1;
      challenge.score = 200;
    } else if (id === 5) {
      setDifficultySelect(5);
      challenge.difficulty = 2;
      challenge.score = 500
    } else if (id === 6) {
      setDifficultySelect(6);
      challenge.difficulty = 3;
      challenge.score = 1000;
    } else if (id === 7) {
      setSelected(7);
      challenge.isLink = true;
    } else if (id === 8) {
      setSelected(8);
      challenge.isLink = false;
    }
  };

  const handleConfirm = () => {
    props.onAddNewChallenge(challenge);
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
      <ScrollView style={[styles.screen, { backgroundColor: theme.primary }]}>
        <View style={styles.body}>
          <Text
            style={[
              styles.screenTitle,
              { color: theme.offcolor, textShadowColor: theme.highlight },
            ]}
          >
            Add a Challenge.
          </Text>
          <TextInput
            style={[styles.addChallengeInput, { borderColor: theme.offcolor }]}
            placeholder="Challenge Name..."
            placeholderTextColor={theme.offcolor}
            onChangeText={(text) => {
              challenge.title = text;
            }}
          ></TextInput>
          <TextInput
            style={[styles.addChallengeInput, { borderColor: theme.offcolor }]}
            multiline={true}
            placeholderTextColor={theme.offcolor}
            placeholder="Challenge Description..."
            onChangeText={(text) => {
              challenge.description = text;
            }}
          ></TextInput>
          <View style={styles.raidioContainer}>
            <Text
              style={[
                styles.raidioText,
                { color: theme.offcolor, textShadowColor: theme.highlight },
              ]}
            >
              Challenge Type?
            </Text>
            <View style={styles.raidioButtonContainer}>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Social
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(1)}
              >
                <RaidioButton id={1} selected={1 === typeSelect} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Mental
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(2)}
              >
                <RaidioButton id={2} selected={2 === typeSelect} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Physical
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(3)}
              >
                <RaidioButton id={3} selected={3 === typeSelect} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.raidioContainer}>
            <Text
              style={[
                styles.raidioText,
                { color: theme.offcolor, textShadowColor: theme.highlight },
              ]}
            >
              Challenge Difficulty?
            </Text>
            <View style={styles.raidioButtonContainer}>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Easy
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(4)}
              >
                <RaidioButton id={4} selected={4 === difficultySelect} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Medium
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(5)}
              >
                <RaidioButton id={5} selected={5 === difficultySelect} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Hard
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(6)}
              >
                <RaidioButton id={6} selected={6 === difficultySelect} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.raidioContainer}>
            <Text
              style={[
                styles.raidioText,
                { color: theme.offcolor, textShadowColor: theme.highlight },
              ]}
            >
              Does the challenge have an associated video?
            </Text>
            <View style={styles.raidioButtonContainer}>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                Yes
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(7)}
              >
                <RaidioButton id={7} selected={7 === selected} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.raidioText,
                  { color: theme.offcolor, textShadowColor: theme.highlight },
                ]}
              >
                No
              </Text>
              <TouchableOpacity
                style={styles.raidioButton}
                onPress={() => handleSelect(8)}
              >
                <RaidioButton id={8} selected={8 === selected} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <SafeSpaceButton title="Cancel " onPress={() => handleCancel()} />
            </View>
            <View style={styles.button}>
              <SafeSpaceButton
                title="Confirm"
                onPress={() => handleConfirm()}
              />
            </View>
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

  button: {
    marginHorizontal: 15,
  },

  screenTitle: {
    fontSize: 30,
    marginBottom: "10%",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.26,
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
    margin: 25,
  },

  raidioText: {
    textAlign: "center",
    fontSize: 18,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.26,
  },

  addChallengeInput: {
    borderBottomWidth: 1,
    width: "70%",
    margin: 15,
    padding: 10,
    fontSize: 20,
  },

  buttonContainer: {
    //marginTop: 20,
    margin: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
});

export default CreateNewChallengeScreen;
