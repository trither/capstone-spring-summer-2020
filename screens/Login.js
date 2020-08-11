import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Button,
  AsyncStorage,
  Image,
  Text,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import myIcon from "../constants/myIcon.js";

const LoginScreen = (props) => {
  let theme = ColorPalette();
  let ssIcon = myIcon;

  //If User Exists
  const [myLoggedIn, setMyLoggedIn] = useState("false");
  const changeLoggedIn = (newLoggedIn) => {
    setMyLoggedIn(newLoggedIn);
  };
  const [myUid, setMyUid] = useState(null);
  const changeMyUid = (newUid) => {
    setMyUid(newUid);
  };

  AsyncStorage.getItem("loggedIn").then((value) => {
    const data = value;
    if (data !== null) {
      changeLoggedIn(data);
    }
  });

  AsyncStorage.getItem("uid").then((value) => {
    const data = value;
    if (data !== null) {
      changeMyUid(data);
    }
  });

  //function handling sign-in with google
  function onSignIn(googleUser) {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        console.log("firebase user: ", firebaseUser);
        // ebase with the correct user.
        //if (!isUserEqual(googleUsCheck if we are already signed-in Firer, firebaseUser)) {
        console.log("myUid login: ", myUid);
        if (!myUid) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in");
              AsyncStorage.setItem("loggedIn", "true");
              AsyncStorage.setItem("uid", result.user.uid);
              props.onSignup(result);
            })
            .catch(function (error) {
              console.log(error);
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
          console.log("when do we execute this if?");
          props.onGetProfile();
          props.onGetChallenges();
          setTimeout(() => props.onPageChange("main screen"), 1000);
        }
      });
  }

  async function googleLogin() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "834378217953-evm1tm9qqrunbec0ghiuhp9a9tl82ev8.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "834378217953-ipaa5iu6kurv11u1gftatq6ifcgvqcn3.apps.googleusercontent.com",
        behaviour: "web",
        iosClientId:
          "834378217953-577ep8gscl0k0v5poq72r8o6jlouvqcp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        props.onPageChange("home address");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      return { error: true };
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
      {ssIcon}
      <TouchableOpacity onPress={googleLogin}>
        <Text
          style={[
            styles.text,
            { color: theme.offcolor, textShadowColor: theme.highlight },
          ]}
        >
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    padding: 30,
    height: 30,
    width: "80%",
    marginVertical: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  text: {
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    shadowOpacity: 0.2,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 13,
  },
});

export default LoginScreen;
