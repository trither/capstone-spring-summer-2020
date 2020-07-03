import React from "react";
import { View, StyleSheet, Button, TouchableHighlight, TouchableOpacity, Text, } from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                Safe__
            </Text>
            <TouchableOpacity onPress = {() => props.onButtonPress("settings")} style={styles.touchable}>
                <Icon style={styles.icon} name='cog' raised='true'/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorPalette.secondary,
        flexDirection: 'row',
        zIndex: 1
    },

    headerTitle: {
        color: ColorPalette.offcolor,
        fontSize: 18,
        fontWeight: "bold",
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:2},
        textShadowRadius: 6,
        shadowOpacity: 0.26,
    },
    icon: {
        fontSize: 30,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:2},
        textShadowRadius: 6,
        shadowOpacity: .2,    
        color: ColorPalette.offcolor,
      },
    touchable: {
        position: 'relative',
        left: 120,
        top: 0
    }
    

});
export default Header;