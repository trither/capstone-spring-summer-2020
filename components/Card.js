import React from "react";
import { View, StyleSheet, Button, } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const Card = props => {
    return(
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        //IOS only
        shadowColor: 'black',
        shadowOffset: { width:0, height:2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        //Andriod
        backgroundColor: ColorPalette.secondary,
        padding: 20,
        borderRadius: 10,
    },
});

export default Card;