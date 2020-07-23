import React,{useState} from 'react';
import { AsyncStorage } from "react-native";

let theme
const myTheme = () => {
    const [Theme, setThemeState] = useState("");
    const changeTheme = (newTheme) => {
        setThemeState(newTheme)
    }

    AsyncStorage.getItem("theme")
    .then((value)=>{
    const data = value;
    if (data !== null){
        changeTheme(data)
    }
    })

    if(Theme === 'theme1'){
        themeVar = 1
    } else if(Theme === 'theme2'){
        themeVar = 2
    } else if(Theme === 'theme3'){
        themeVar = 3
    } else if(Theme === 'theme4'){
        themeVar = 4
    } else {
        themeVar = 1
    }

    if (themeVar=== 1) {
        theme = {
            primary: '#0E9AA7',
            secondary: '#3DA4AB',
            offcolor: '#F6CD61',
            highlight: '#FE8A71',
        }
    } else if (themeVar=== 2){
        theme = {
            primary: '#7EBDB4',
            secondary: '#F6D198',
            offcolor: '#862A5C',
            highlight: '#F4A548',
        }
    } else if (themeVar=== 3){
        theme = {
            primary: '#63B7AF',
            secondary: '#ABF0E9',
            offcolor: '#D4F3EF',
            highlight: '#EE8572',
        }
    } else if (themeVar=== 4){
        theme = {
            primary: '#084177',
            secondary: '#687466',
            offcolor: '#CD8D7B',
            highlight: '#FBC490',
        }
    } else {
        theme = {
            primary: 'err',
            secondary: 'err',
            offcolor: 'err',
            highlight: 'err',
        }
    }
    return (theme)   
}


export default myTheme;