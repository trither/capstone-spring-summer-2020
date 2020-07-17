import React from "react";
import { View, StyleSheet, Text, AsyncStorage} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";

const SettingsScreen = props =>{
    return(
        <View style= {styles.screen}>
            <Header onButtonPress = {props.onPageChange}/>
            <Text> Hello </Text>
            <Footer onButtonPress = {props.onPageChange}/>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
});

export default SettingsScreen;