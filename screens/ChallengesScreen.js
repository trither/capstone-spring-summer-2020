import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ColorPalette from "../constants/ColorPalette";
import Card from "../components/Card";
import Icon from "@expo/vector-icons/FontAwesome";

const ChallengesScreen = (props) => {
  // challenge details recieved from App.js
  const [challenge, setChallenge] = useState({title: props.challenge.title, description: props.challenge.description});

  //Control when the modal is visible / what is displayed when the modal is visible.
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState();

  //When the admin presses on the edit button for a desciption,
  //Create the associated modal content, and set the modal to be visable.
  const editTitleHandler = () => {
    createModalContent("title");
    setModalVisible(!modalVisible);
  };

  //When the admin presses on the edit button for a desciption,
  //Create the associated modal content, and set the modal to be visable.
  const editDescriptionHandler = () => {
    createModalContent("description");
    setModalVisible(!modalVisible);
  };

  //Depending on which edit button the admin presses,
  //load the correct text input box.
  const createModalContent = (fieldToEdit) => {
    if (fieldToEdit == "title") {
      setModalContent(
        <TextInput
          style={styles.editInput}
          placeholder="New Title..."
          onChangeText={(text) => challenge.title = text}
        />
      );
    }
    if (fieldToEdit == "description") {
      setModalContent(
        <TextInput
          style={styles.editInput}
          placeholder="New Description..."
          onChangeText={(text) => challenge.description = text}
        />
      );
    }
  };

  const onModalClose = () => {
    //WRITE CHALLENGE TITLE AND CHALLENGE DESCRIPTION TO THE DATABASE
    props.onEditChallenge(props.challenge, challenge)
  };

  const onDeleteButtonPress = () => {
    //Database call to delete the current challenge.
    props.onDeleteChallenge();
    setChallenge();
    props.onPageChange("main screen");
  };

  //If the adminRights prop is true, then load the edit title component.
  const ChallengeTitleAdminComponent = () => {
    if (props.adminRights) {
      return (
        <TouchableOpacity
          onPress={() => {
            editTitleHandler();
          }}
          style={styles.editIconContainer}
        >
          <Icon style={styles.editIcon} name="edit" />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  //If the user is an admin, load the description edit component.
  const ChallengeDescriptionAdminComponent = () => {
    if (props.adminRights) {
      return (
        <TouchableOpacity
          onPress={() => {
            editDescriptionHandler();
          }}
          style={styles.editIconContainer}
        >
          <Icon style={styles.editIcon} name="edit" />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  //If the user is an admin, load the delete challenge button.
  const AdminDeleteButton = () => {
    if (props.adminRights) {
      return (
        <Button
          onPress={() => onDeleteButtonPress()}
          title="Delete Challenge."
          color="red"
        />
      );
    } else {
      return;
    }
  };

  return (
    // Create the screen object
    <View style={styles.screen}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalContent}
            <Button
              title="Accept"
              onPress={() => setModalVisible(!modalVisible) + onModalClose()}
            />
          </View>
        </View>
      </Modal>
      <Header onButtonPress={props.onPageChange} />
      <View style={styles.cardContainer}>
        {/* Create the cards that contain the title and the description seperately */}
        <Card style={styles.adminContainer}>
          {ChallengeTitleAdminComponent()}
          <Text style={styles.title}> {challenge.title} </Text>
        </Card>
        <Card style={styles.adminContainer}>
          {ChallengeDescriptionAdminComponent()}
          <Text style={styles.body}> {challenge.description} </Text>
        </Card>
        {AdminDeleteButton()}
      </View>
      {/* Create the container for the refresh and button complete (it's invisible and is just here for layout reasons) */}
      <View style={styles.buttonContainer}>
        {/* Create the squares the the buttons exist on top of (buttonBoxes) */}
        <Card style={styles.buttonBox}>
          {/* CloudFunctions needed here to fetch new challnege and put the new data into the title and description elements above*/}
          <TouchableOpacity onPress={() => Alert.alert("Refresh")} width="20%">
            <Icon style={styles.icon} name="refresh" raised="true" />
          </TouchableOpacity>
        </Card>
        <Card style={styles.buttonBox}>
          {/* CloudFunctions needed here to recieve challenge completed data*/}
          <TouchableOpacity
            onPress={() => Alert.alert("Challenge Marked Complete")}
            width="20%"
          >
            <Icon style={styles.icon} name="check" raised="true" />
          </TouchableOpacity>
        </Card>
      </View>
      <Footer onButtonPress={props.onPageChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  modalTextContainer: {
    marginBottom: 15,
  },

  editInput: {
    width: "80%",
    padding: 8,
    marginBottom: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    width: "75%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  adminContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  editIcon: {
    fontSize: 30,
    color: ColorPalette.offcolor,
  },

  editIconContainer: {
    position: "absolute",
    left: 8,
  },

  image: {
    width: 360,
    height: 125,
    alignSelf: "center",
  },

  cardContainer: {
    backgroundColor: ColorPalette.primary,
    flex: 2,
  },

  buttonContainer: {
    backgroundColor: ColorPalette.primary,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonBox: {
    width: 100,
    height: 100,
  },

  title: {
    color: ColorPalette.offcolor,
    textShadowColor: ColorPalette.highlight,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },

  body: {
    color: ColorPalette.offcolor,
    textAlign: "center",
    fontSize: 16,
    width: "90%",
  },

  icon: {
    fontSize: 64,
    textShadowColor: ColorPalette.highlight,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    color: ColorPalette.offcolor,
  },
});

export default ChallengesScreen;
