import React from "react";
import { View, 
        StyleSheet,
        Text,
        ShadowPropTypesIOS, 
        Button,
        TouchableOpacity,
        Alert, 
        Image,
        AsyncStorage,
    } from "react-native";      
import Footer from "../components/Footer";
import Header from "../components/Header";
import ColorPalette from "../constants/ColorPalette";
import Card from "../components/Card";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";


const ChallengesScreen = props => {
    // challenge details recieved from App.js
    var challengeTitle = props.challenge.ChallengeTitle
    var challengeDescription = props.challenge.ChallengeDesc
    let theme = ColorPalette();

    return(
        // Create the screen object
        <View style={styles.screen}>
        <Header onButtonPress = {props.onPageChange}/>
            <View style={[styles.cardContainer, {backgroundColor: theme.primary}]}>
                {/* Create the cards that contain the title and the description seperately */}
                <Card>
                    <Text style={[styles.title, {color: theme.offcolor, textShadowColor: theme.highlight}]}> {challengeTitle} </Text>
                </Card>
                <Card>
                    <Text style={[styles.body, {color: theme.offcolor}]}> {challengeDescription} </Text>
                </Card>
            </View>
            {/* Create the container for the refresh and button complete (it's invisible and is just here for layout reasons) */}
            <View style={[styles.buttonContainer,{backgroundColor: theme.primary}]}>
                {/* Create the squares the the buttons exist on top of (buttonBoxes) */}
                <Card style={styles.buttonBox}>
                    {/* CloudFunctions needed here to fetch new challnege and put the new data into the title and description elements above*/}
                    <TouchableOpacity onPress={() => Alert.alert('Refresh')} width="20%">
                        <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor}]} name='refresh' raised='true'/>
                    </TouchableOpacity>
                </Card> 
                <Card style={styles.buttonBox}>
                    {/* CloudFunctions needed here to recieve challenge completed data*/}                    
                    <TouchableOpacity onPress={() => Alert.alert('Challenge Marked Complete')} width="20%">
                        <Icon style={[styles.icon, {textShadowColor: theme.highlight, color: theme.offcolor}]} name='check' raised='true'/>
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
        flex: 2,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    buttonBox: {
        width: 100,
        height: 100
    },

    title: {
      textShadowOffset: { width:0, height:2},
      textShadowRadius: 6,
      shadowOpacity: .2,
      textAlign: "center",
      fontSize: 24,
      fontWeight: 'bold'    
    },

    body: {
        textAlign: "center",
        fontSize: 16  
      },

      icon: {
        fontSize: 64,
        textShadowOffset: { width:0, height:2},
        textShadowRadius: 6,
        shadowOpacity: .2,    
      }
});

export default ChallengesScreen;