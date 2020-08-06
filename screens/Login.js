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
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import myIcon from '../constants/myIcon.js';

const LoginScreen = (props) => {
  let theme = ColorPalette();
  let ssIcon = myIcon;

//function handling sign-in with google
	function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
	      googleUser.idToken,
	      googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).then(function(result){
        console.log('user signed in');
        AsyncStorage.setItem("login", result.user.uid);
        props.onSignup(result);
      })
	    .catch(function(error) {
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
      console.log('User already signed-in Firebase.');
    }
  });
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}


/*
	async function facebookLogin() {
  try {
    await Facebook.initializeAsync('732205167600953');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      //sign user into firebase
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(token).then(function(result){
        console.log('facebook user signed in');
        AsyncStorage.setItem("login", result.user.uid);
      });

      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      props.onPageChange('main screen');
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}
*/
	async function googleLogin() {
  try {
    const result = await Google.logInAsync({
      androidClientId: '834378217953-evm1tm9qqrunbec0ghiuhp9a9tl82ev8.apps.googleusercontent.com',
      behaviour: 'web',
      iosClientId: '834378217953-577ep8gscl0k0v5poq72r8o6jlouvqcp.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
	    props.onPageChange('main screen');
	    onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

  return (
		  
	<View style={[styles.screen, { backgroundColor: theme.primary }]}>
    {ssIcon}
    <TouchableOpacity onPress= {googleLogin}>
      <Text
        style={[
          styles.text,
          { color: theme.offcolor, textShadowColor: theme.highlight, },
        ]}
      >
        Sign in with Google
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => console.log("Facebook Sign In") /*onPress={facebookLogin}*/}>
      <Text
        style={[
          styles.text,
          { color: theme.offcolor, textShadowColor: theme.highlight, },
        ]}
      >
        Sign in with Facebook
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
    alignItems: 'center',
    justifyContent: 'center',
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