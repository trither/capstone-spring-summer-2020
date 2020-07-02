import React from "react";
import { View, 
        StyleSheet,
        Text,
        ShadowPropTypesIOS, 
        Button,
        TouchableOpacity,
        Alert, 
        Image } from "react-native";      
import Footer from "../components/Footer";
import Header from "../components/Header";
import ColorPalette from "../constants/ColorPalette";
import Card from "../components/Card";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";


const ChallengesScreen = props => {
    // Need CloudFunctions here to fill both of these variables 
    // with the correct data about the challenge that should be displayed
    // Might be getting it from the main screen though, so it's possible it's not neccesary here
    var challengeTitle = "Challenge Title"
    var challengeDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    + "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"
    + " took a galley of type and scrambled it to make a type specimen book. It has survived not only five" 
    + " centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was"
    + " popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and"
    + " more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

    return(
        // Create the screen object
        <View style={styles.screen}>
        {/* Create the Safe_ title at the top of the screen */}
        <Header title="Safe__"/>
            {/* Create the container for the challenge title and descriptions (it's invisible and is just here for layout reasons) */}
            <View style={styles.cardContainer}>
                {/* Create the cards that contain the title and the description seperately */}
                <Card>
                    <Text style={styles.title}> {challengeTitle} </Text>
                </Card>
                <Card>
                    <Text style={styles.body}> {challengeDescription} </Text>
                </Card>
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