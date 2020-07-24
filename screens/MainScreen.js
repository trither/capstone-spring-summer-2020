import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ColorPalette from "../constants/ColorPalette";
import BubbleType from "../constants/BubbleType";
import Header from "../components/Header";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";


const MainScreen = (props) => {
  //API grab lives remaining
  var lives = props.profile.Lives;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  let myBubble = BubbleType();
  let bubble;
  var types = myBubble.type;
  if (lives === 1){
    bubble =  myBubble.oneLife;
  } else if (lives === 2){
    bubble =  myBubble.twoLife;
  } else if (lives === 3){
    bubble =  myBubble.thrLife;
  }
  //Set theme for page
  let theme = ColorPalette();
  //API for Challenge Titles
  var ch1 = props.challenges[0].ChallengeTitle;
  var ch2 = props.challenges[1].ChallengeTitle;
  var ch3 = props.challenges[2].ChallengeTitle;

  return (
    <View style={[styles.screen, {backgroundColor:theme.primary}]}>
      <Header onButtonPress = {props.onPageChange}/>  
        <View style={styles.cardContainer}>
            <View style={[styles.challenge, {backgroundColor: theme.primary, borderBottomColor: theme.offcolor}]}>
              <TouchableOpacity onPress={()=>props.onPageChange("challenge1")} width="80%">
                <Text style={[styles.text, {color: theme.offcolor, textShadowColor: theme.highlight}]}> {ch1} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Refresh')} width="20%">
                <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor}]} name='refresh' raised='true'/>
              </TouchableOpacity>  
            </View>
            <View style={[styles.challenge, {backgroundColor: theme.primary, borderBottomColor: theme.offcolor}]}>
              <TouchableOpacity onPress={()=>props.onPageChange("challenge2")} width="80%">
                <Text style={[styles.text, {color: theme.offcolor, textShadowColor: theme.highlight}]}> {ch2} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Refresh')} width="20%">
                <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor}]} name='refresh' raised='true'/>
              </TouchableOpacity>  
            </View>
            <View style={[styles.challenge, {backgroundColor: theme.primary, borderBottomColor: theme.offcolor}]}>
              <TouchableOpacity onPress={()=>props.onPageChange("challenge3")} width="80%">
                <Text style={[styles.text, {color: theme.offcolor, textShadowColor: theme.highlight}]}> {ch3} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Refresh')} width="20%">
                <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor}]} name='refresh' raised='true'/>
              </TouchableOpacity>  
            </View>
            <View style={styles.health}>
              <Text style={[styles.text, {color: theme.offcolor, textShadowColor: theme.highlight}]}> {types} Remaining </Text>
              <View>{bubble}</View>
            </View>
      </View>
      <Footer onButtonPress = {props.onPageChange}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  cardContainer: {
    flex: 2,
  },

  text: {
    textShadowOffset: { width:0, height:2},
    textShadowRadius: 6,
    shadowOpacity: .2,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold'    
  },

  image: {
    height: 125,
    width: 360,
    alignSelf: "center",
  },

  challenge: {
    height: 40,
    width: "100%",
    bottom: 0,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
    borderBottomWidth: 4,
    borderBottomStartRadius: 45,
    borderBottomEndRadius: 45,
  },

  icon: {
    fontSize: 35,
    textShadowColor: ColorPalette.highlight,
    color: ColorPalette.offcolor,
    textShadowOffset: { width:0, height:2},
    textShadowRadius: 6,
    shadowOpacity: .2,    
  },

  health: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 120,
  }
});

export default MainScreen;
