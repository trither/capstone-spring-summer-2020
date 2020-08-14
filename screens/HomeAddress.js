import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import ColorPalette from "../constants/ColorPalette";
import myIcon from '../constants/myIcon.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const HomeAddress = (props) => {
  let theme = ColorPalette();
  let ssIcon = myIcon;

  const [lng, setLng] = useState("");
  const changeLng = (newLng) =>{
    setLat(newLng)
  }

  const [lat, setLat] = useState(null);
  const changeLat = (newLat) =>{
    setLat(newLat)
  }
  /*
  //grab the latitude and longitude to turn off bluetooth
  AsyncStorage.getItem("lat")
  .then((value)=>{
          const data = value;
          if (data !== null){
            changeLat(data)
            //console.log('lat', lat);
          }
        })

  AsyncStorage.getItem("lng")
  .then((value)=>{
          const data = value;
          if (data !== null){
            changeLng(data)
            //console.log('lng', lat);
          }
        })
        */
  return (
    <View style={[stiles.screen, { backgroundColor: theme.primary }]}>
    <GooglePlacesAutocomplete
      placeholder='enter your home address'
      fetchDetails={true}
      styles={{
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: "70%",
          color: '#5d5d5d',
          fontSize: 20,
        },
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        //console.log(data, details);
        console.log(details.geometry.location.lat);
        console.log(details.geometry.location.lng);
        const laty = JSON.stringify(details.geometry.location.lat);
        const lngy = JSON.stringify(details.geometry.location.lng);
        AsyncStorage.setItem("lat", laty);
        AsyncStorage.setItem("lng", lngy);
        changeLat(laty);
        changeLng(lngy);
        props.onPageChange("main screen")
      }}
      query={{
        key: 'XXXXXXXXXX',
        language: 'en',
        components: 'country:us',
      }}
    />
    {ssIcon}
    </View>
  );
};
const stiles = StyleSheet.create({
  screen: {
    padding: "5%",
    width: "100%",
    height: "100%",
    //flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
})
export default HomeAddress;
