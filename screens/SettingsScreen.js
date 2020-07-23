import React, {useState} from "react";
import { View, StyleSheet, Text, AsyncStorage, TouchableOpacity} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import DropDownPicker from 'react-native-dropdown-picker';
import ColorPalette from '../constants/ColorPalette';

const SettingsScreen = props =>{
    //Set Theme
    let theme = ColorPalette();

    //Refresh me
    const [refresh, setRefresh] = useState(false);
    const refreshMe = () => {
        setRefresh(!refresh);
    }

    //Async Storage for Theme and Bubble
    const [Theme, setThemeState] = useState("theme1");
    const changeTheme = (newTheme) => {
        setThemeState(newTheme);
    }

    const [Bubble, setBubbleState] = useState("bubble1");
    const changeBubble = (newBubble) => {
        setBubbleState(newBubble);
    }

    AsyncStorage.getItem("theme")
    .then((value)=>{
    const data = value;
    if (data !== null){
        changeTheme(data)
    }
    console.log(data)
    })

    AsyncStorage.getItem("bubble")
    .then((value)=>{
    const data = value;
    if (data !== null){
        changeBubble(data)
    }
    console.log(data)
    })

    return(
        <View style= {styles.screen}>
            <Header onButtonPress = {props.onPageChange}/>
            <View style={[styles.viewContainer, {backgroundColor: theme.primary}]}>
                <Text style={[styles.text, {color: theme.offcolor, textShadowColor: theme.highlight,}]}>Theme</Text>
                <View height={180}>
                    <DropDownPicker
                        items={[
                            {label: 'Classic', value: 'theme1'},
                            {label: 'Sedona', value: 'theme2'},
                            {label: 'Artic', value: 'theme3'},
                            {label: 'Cave', value: 'theme4'},
                        ]}
                        defaultValue={Theme}
                        containerStyle={{height: 40}}
                        onChangeItem={function (item) { 
                            AsyncStorage.setItem('theme', item.value)
                            .then(()=>{console.log('saved');})
                            .catch((error)=>{console.log(error)})
                            refreshMe()
                        }}
                    />
                </View>
                <Text style={[styles.text, {color: theme.offcolor, textShadowColor: theme.highlight,}]}>Bubble Type</Text>
                <View height={160}>
                    <DropDownPicker
                        items={[
                            {label: 'Bubble', value: 'bubble1'},
                            {label: 'Hearts', value: 'bubble2'},
                            {label: 'Battery', value: 'bubble3'},
                        ]}
                        defaultValue={Bubble}
                        containerStyle={{height: 40}}
                        onChangeItem={item => 
                            AsyncStorage.setItem('bubble', item.value)
                            .then(()=>{console.log('saved');})
                            .catch((error)=>{console.log(error)})}
                    />
                </View>
            </View>
            <Footer onButtonPress = {props.onPageChange}/>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    viewContainer: {
        flex: 2,
      },

    text: {
    textShadowOffset: { width:0, height:2},
    textShadowRadius: 6,
    shadowOpacity: .2,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold'    
    },

    dropDown: {
        height: 120
    }
});

export default SettingsScreen;