import React from "react";
import { View, StyleSheet, Text, } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";

const ProfileScreen = props => {
    return(
        <View style={styles.screen}>
            <Header onButtonPress = {props.onPageChange}/>
            <Card>
                <Text> Profile Picture</Text>
            </Card>
            <Card>
                <Text> Name </Text>
            </Card>
            <Card> 
                <Text> Challenges completed</Text>
                <Text> Score </Text>
                <Text> Survival Time</Text>
                <Text> These could be things you press on and it gives more stats</Text>
            </Card>
            <Card> 
                <Text> Area for the extra info about completed challenges, score, or survival time</Text>
            </Card>
            <Footer onButtonPress = {props.onPageChange}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
});

export default ProfileScreen;