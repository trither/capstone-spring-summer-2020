import React from "react";
import { View, StyleSheet, ShadowPropTypesIOS, Button, Image } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";


const ChallengesScreen = props => {
    return(
        <View style={styles.screen}>
            <Header title="CHALLENGES"/>
            <Footer onButtonPress = {props.onPageChange}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    image: {
        width: 360,
        height: 125,
        alignSelf: "center"
      }
});

export default ChallengesScreen;