import React from "react";
import { View, StyleSheet, Text, Image, ProgressBar, ProgressBarAndroid, AsyncStorage} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import ColorPalette from "../constants/ColorPalette";

const ProfileScreen = props => {

    //load in values from the user
    var name = props.profile.FullName;
    var level = props.profile.Level;
    var score = props.profile.Score;
    let profilePic = <Image style={styles.profilePicture} source={{uri:props.profile.URLPic}}/>
    var streak = props.profile.WeeklyStreak;
    //variables for progress/level bar.  Let me know if you want this moved somewhere else
    var reqExp = 0;
    for (let i = 0; i <= level; i++){
        if (i===0){
            reqExp = reqExp + 100;
        } else if (i<6){
            reqExp = reqExp + (300);
        } else if (i<11){
            reqExp = reqExp + (500);
        } else if (i<21){
            reqExp = reqExp + (700);
        } else {
            reqExp = reqExp + (1000);
        }
    }
    var preqExp = 0;
    if (level !== 0){
        for (let j = 0; j <= level-1; j++){
            for (let i = 0; i <= j; i++){
                if (i===0){
                    preqExp = preqExp + 100;
                } else if (i<6){
                    preqExp = preqExp + (300);
                } else if (i<11){
                    preqExp = preqExp + (500);
                } else if (i<21){
                    preqExp = preqExp + (700);
                } else {
                    preqExp = preqExp + (1000);
                }
            }
        }
    }
    else {preqExp = 0}
    var currentLevelScore = score-preqExp;
    var getPercent = (currentLevelScore/reqExp)*100;
    var percentDone = getPercent.toFixed(0) + '%';

    return(
        <View style={styles.screen}>
            <Header onButtonPress = {props.onPageChange}/>
            <View style={styles.boxTop}> 
                <Text style={styles.profileName}>{name}</Text>
                <View style={styles.addShadow}>{profilePic}</View>
                <View style={styles.levelContainer}>
                    <View style={styles.levelScoreBox}>
                        <Text style={styles.levelScore}>{level}</Text>
                    </View>
                    <View style={styles.levelBar}>
                        <View style={styles.levelBarFill} width={percentDone}  />
                        <Text style={styles.levelExp}> {currentLevelScore} / {reqExp} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.middleBox}>
                <View style={styles.statBox}>
                    <Text style={styles.text}>Total Score</Text>
                    <Text style={styles.scoreText}>{score}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.text}>Weekly Streak</Text>
                    <Text style={styles.scoreText}>{streak}</Text>
                </View>
            </View>
            <Footer onButtonPress = {props.onPageChange}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor:ColorPalette.primary,
        flex: 1
    },

    text :{
        color: ColorPalette.offcolor,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:2},
        textShadowRadius: 6,
        shadowOpacity: .2,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold'
    },

    profileName:{
        top:7,
        color: ColorPalette.offcolor,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:1, height:1},
        textShadowRadius: 0,
        shadowOpacity: .2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold'
    },

    profilePicture:{
        top:13,
        height: 125,
        width: 125,
        alignSelf: "center",
        borderColor: ColorPalette.offcolor,
        borderWidth: 5,
        borderRadius: 10,
    },

    addShadow: {
        shadowColor: ColorPalette.highlight,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },

    boxTop: {
        width: '100%',
        height: 230,
        alignContent: "space-around",
    },

    levelContainer:{
        flexDirection: "row",
        alignSelf: "center",
        top: 23,
    },

    levelScore:{
        color: ColorPalette.offcolor,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:2},
        textShadowRadius: 6,
        shadowOpacity: .2,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },

    levelScoreBox: {
        height:35,
        width:50,
        borderColor: ColorPalette.offcolor,
        borderWidth:5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        shadowColor: ColorPalette.highlight,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },

    levelExp :{
        color: ColorPalette.offcolor,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:1},
        textShadowRadius: 6,
        shadowOpacity: .2,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        shadowColor: ColorPalette.highlight,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },

    levelBar: {
        height: 35,
        width: '80%',
        backgroundColor: ColorPalette.primary,
        borderColor: ColorPalette.offcolor,
        borderWidth: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignContent: 'center',
        shadowColor: ColorPalette.highlight,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
      },

    levelBarFill: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: ColorPalette.highlight,
    },

    example: {
        marginVertical: 24,
      },

    middleBox: {
        flexDirection:"row",
        justifyContent: 'space-around'
    },

    statBox: {
        width: 150,
        height: 80,
        borderWidth:5,
        borderColor: ColorPalette.offcolor,
        borderRadius: 10,
        shadowColor: ColorPalette.highlight,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },

    scoreText :{
        color: ColorPalette.offcolor,
        textShadowColor: ColorPalette.highlight,
        textShadowOffset: { width:0, height:1},
        textShadowRadius: 0,
        shadowOpacity: .2,
        textAlign: "center",
        fontSize: 30,
        fontWeight: 'bold'
    },
});

export default ProfileScreen;