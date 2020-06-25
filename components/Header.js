import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPalette from "../constants/ColorPalette";

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {props.title}
            </Text>
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

});
export default Header;