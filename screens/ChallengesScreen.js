import React from "react";
import { View, 
        StyleSheet,
        Text,
        ShadowPropTypesIOS, 
        Button,
        TouchableOpacity,
        Alert, 
        Image } from "react-native";      
import Webview from 'react-native-webview'
import Footer from "../components/Footer";
import Header from "../components/Header";
import ColorPalette from "../constants/ColorPalette";
import Card from "../components/Card";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";


const ChallengesScreen = props => {
    // challenge details recieved from App.js
    var challengeTitle = props.challenge.ChallengeTitle
    var challengeDescription = props.challenge.ChallengeDesc
    var challengeVideoID = "8zT6CYu0iYQ"

    // function to check if video exists to be embedded
    function videoDisplay(challengeVideoID) {
        if (challengeVideoID !== "") {
            return (
                <Webview style={{width:"94%", alignSelf:"center", marginVertical: 10}} source={{uri:"https://www.youtube.com/embed/" + challengeVideoID }} />
            );
        }
    }

    return(
        // Create the screen object
        <View style={styles.screen}>
        <Header onButtonPress = {props.onPageChange}/>
            <View style={styles.cardContainer}>
                {/* Create the cards that contain the title and the description seperately */}
                <Card>
                    <Text style={styles.title}> {challengeTitle} </Text>
                </Card>
                <Card>
                    <Text style={styles.body}> {challengeDescription} </Text>
                </Card>
                {videoDisplay(challengeVideoID)}
                
            </View>
            {/* Create the container for the refresh and button complete (it's invisible and is just here for layout reasons) */}
            <View style={styles.buttonContainer}>
                {/* Create the squares the the buttons exist on top of (buttonBoxes) */}
                <Card style={styles.buttonBox}>
                    {/* CloudFunctions needed here to fetch new challnege and put the new data into the title and description elements above*/}
                    <TouchableOpacity onPress={() => Alert.alert('Refresh')} width="20%">
                        <Icon style={styles.icon} name='refresh' raised='true'/>
                    </TouchableOpacity>
                </Card> 
                <Card style={styles.buttonBox}>
                    {/* CloudFunctions needed here to recieve challenge completed data*/}                    
                    <TouchableOpacity onPress={() => Alert.alert('Challenge Marked Complete')} width="20%">
                        <Icon style={styles.icon} name='check' raised='true'/>
                    </TouchableOpacity>
                </Card>
            </View>
        <Footer onButtonPress = {props.onPageChange}/>
        </View>
    );
};

// Styles for all the elements/objects above
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    image: {
        width: 360,
        height: 125,
        alignSelf: "center"
      },

    cardContainer: {
        backgroundColor: ColorPalette.primary,
        flex: 2,
    },

    buttonContainer: {
        backgroundColor: ColorPalette.primary,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    buttonBox: {
        width: 100,
        height: 100
    },

    title: {
      color: ColorPalette.offcolor,
      textShadowColor: ColorPalette.highlight,
      textShadowOffset: { width:0, height:2},
      textShadowRadius: 6,
      shadowOpacity: .2,
      textAlign: "center",
      fontSize: 24,
      fontWeight: 'bold'    
    },

    body: {
        color: ColorPalette.offcolor,
        textAlign: "center",
        fontSize: 16  
      },

      icon: {
        fontSize: 64,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:2},
        textShadowRadius: 6,
        shadowOpacity: .2,    
        color: ColorPalette.offcolor,
      }
});

export default ChallengesScreen;