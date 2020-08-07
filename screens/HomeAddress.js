import React from 'react';
import { Image, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const HomeAddress = (props) => {
  return (
    <View>
    <Text>lalalalalalalalalala</Text>
    <Text>lalalalalalalalalala</Text>
    <Text>lalalalalalalalalala</Text>
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
    />
    </View>
  );
};
 
export default HomeAddress;