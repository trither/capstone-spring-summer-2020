import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import Icon from "../node_modules/@expo/vector-icons/FontAwesome5";


const CongratsScreen = (props) => {
    let theme = ColorPalette();

    return (
        // Create the screen object
        <View style={[styles.screen, { backgroundColor: theme.primary }]}>
            <View style={styles.container} >
                <Text style={[
                    styles.title,
                    { color: theme.offcolor, textShadowColor: theme.highlight },{marginVertical: 30},
                    ]}>Congratulations!</Text>
                <Text style={[
                    styles.subtitle,
                    { color: theme.offcolor, textShadowColor: theme.highlight },
                    ]}>You survived the week!</Text>
                <Icon
                    style={[
                    styles.icon,
                    { textShadowColor: theme.highlight, color: theme.offcolor },{marginVertical: 90},
                    ]}
                    name="medal"
                    raised="true"
                />
            </View>
        </View>
      );
};

// Styles for all the elements/objects above
const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      shadowOpacity: 0.2,
      textAlign: "center",
      fontSize: 48,
      fontWeight: "bold",
    },

    subtitle: {
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        shadowOpacity: 0.2,
        textAlign: "center",
        fontSize: 36,
        fontWeight: "bold",
      },

    icon: {
      fontSize: 200,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      shadowOpacity: 0.2,
    },
  });

  export default CongratsScreen;