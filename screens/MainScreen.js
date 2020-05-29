import React from "react";
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
} from "react-native";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ColorPalette from "../constants/ColorPalette";
import Header from "../components/Header";

const MainScreen = (props) => {
  //API grab lives remaining
  var lives = 2;
  // The following determines the image or gif to be displayed based on the number of lives remaining.
  let bubble;
  if (lives === 1){
    bubble =  <Image 
              style={styles.image} 
              source={require("./Assets/OneBubble.png")}/>
  } else if (lives === 2){
    bubble =  <Image 
              style={styles.image} 
              source={require("./Assets/TwoBubble.png")}/>
  } else if (lives === 3){
    bubble =  <Image 
              style={styles.image} 
              source={require("./Assets/ThreeBubble.png")}/>
  }

  return (
    <View style={styles.screen}>
      <View style={styles.cardContainer}>
        <Card>
          <Text style={styles.text}> User level + recent challenges completed </Text>
        </Card>
        <Card>
          <Text style={styles.text}> Life Information </Text>
        </Card>
        <Card>
          <Text style={styles.text}> Bubbles Remaining </Text>
          <View>{bubble}</View>
        </Card>
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
    backgroundColor: ColorPalette.primary,
    flex: 2,
    justifyContent: "space-evenly",
  },


  text: {
    color: ColorPalette.offcolor,
    textShadowColor: ColorPalette.highlight,
    textShadowOffset: { width:0, height:2},
    textShadowRadius: 6,
    shadowOpacity: .2,
    textAlign: "center",
  },

  image: {
    width: 360,
    height: 125,
    alignSelf: "center"
  }
});

export default MainScreen;
