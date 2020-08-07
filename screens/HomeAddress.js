import React from 'react';
import { Image, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const HomeAddress = (props) => {
  return (
    <GooglePlacesAutocomplete
    placeholder='enter your home address'
    fetchDetails={true}
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
      props.onPageChange("main screen")
    }}
    query={{
      key: 'AIzaSyC0D_mqgtjsOIhC-haBWaxgBZTRhFRj9ek',
      language: 'en',
      components: 'country:us',
    }}
    styles={{
      textInputContainer: {
        top:50,
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0,
      }}}
  />
  );
};
 
export default HomeAddress;