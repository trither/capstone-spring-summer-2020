import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HeatmapScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Header onButtonPress = {props.onPageChange}/>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      />
      <Footer onButtonPress={props.onPageChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default HeatmapScreen;
