import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import * as firebase from 'firebase'
import auth from '@react-native-firebase/auth';
//import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
GoogleSignin.configure({
	webClientId: '',
});

const LoginScreen = (props) => {

	//function to login to gmail
	async function googleLogin() {
		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		auth().signInWithCredential(googleCredential);

	}
	//function to login to facebook
	async function facebookLogin() {
		alert('attempting to login with fb');
	/*
		const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
		if(result.isCancelled) {
			throw 'User cancelled the loging in';
		}
		const data = await AccessToken.getCurrentAccessToken();
		if(!data) {
			throw 'login failed';
		}
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
		auth().signInWithCredential(facebookCredential);
		props.onPageChange("main screen");
	*/
	}
 
  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Button onPress={googleLogin} title="Login with gmail"/>
        <Button onPress={facebookLogin} title="Login with facebook"/>
      </View>
    </TouchableWithoutFeedback>


/*
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TextInput placeholder="Enter username..." style={styles.input} />
        <TextInput placeholder="Enter password..." style={styles.input}/>
        <Button title="Login"/>
      </View>
    </TouchableWithoutFeedback>
*/
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
});

export default LoginScreen;
