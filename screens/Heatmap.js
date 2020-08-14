import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Modal,
  AsyncStorage,
} from "react-native";
import MapView, { Polygon } from "react-native-maps";
import Footer from "../components/Footer";
import Header from "../components/Header";
import covidCases from "../assets/COVIDcases.json";
import zipCodeData from "../assets/Zip_Code_Boundaries.json";

const HeatmapScreen = (props) => {
  const [polygons, setPolygons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const handleZipcodePress = (e) => {
    var numCases = 0;
    covidCases.zipcodes.forEach(function (y) {
      if (y.zipcode == e) {
        numCases = y.CaseCount;
      }
    });
    setModalContent(
      <View>
        <View style={styles.modalTextContainer}>
          <Text>Zipcode: {e}</Text>
        </View>
        <View style={styles.modalTextContainer}>
          <Text>Case Count: {numCases}</Text>
        </View>
      </View>
    );
    setModalVisible(true);
  };

  //Create an array of polygons and return that array
  const createPolygonComponents = (zipcodes) => {
    var tempArray = [];
    var numCases = 0;
    var fillcolor;
    zipcodes.forEach(function (e) {
      numCases = 0;
      covidCases.zipcodes.forEach(function (y) {
        if (e.zipcode == y.zipcode) {
          numCases = y.CaseCount;
        }
      });
      if (numCases == 0) {
        fillcolor = "rgba(0,255,0,0.5)";
      } else if (numCases < 50) {
        fillcolor = "rgba(255,255,0,0.5)";
      } else if (50 <= numCases && numCases < 100) {
        fillcolor = "rgba(255,165,0,0.5)";
      } else if (100 < numCases) {
        fillcolor = "rgba(255,0,0,0.5)";
      }
      var temp = (
        <Polygon
          key={e.zipcode}
          id={e.zipcode}
          coordinates={e.coordinates}
          fillColor={fillcolor}
          strokeColor="rgba(0,0,0,0.5)"
          strokeWidth={2}
          tappable={true}
          onPress={() => handleZipcodePress(e.zipcode)}
        />
      );
      tempArray.push(temp);
    });
    return tempArray;
  };

  //Parse through and read the local json file containing the boundaries
  //of oregon zipcode data.
  const readPolygonData = () => {
    //A single longitude latitude point
    var latlng;
    //A list of latlng's that make up a polygon
    var coordinatesArray = [];
    //A list of all polygons, this is what we ultimately pass to set our state.
    var polygonArray = [];

    var zipcode = [];

    //Loop through all of the zipcodes in the portland area and extract the data
    //needed for a polygon (basically the coordinates of the boundry and the zip)
    zipCodeData.features.forEach(function (e) {
      if (e.geometry.type === "Polygon") {
        e.geometry.coordinates[0].forEach(function (e) {
          latlng = { latitude: e[1], longitude: e[0] };
          coordinatesArray.push(latlng);
        });
      } else {
        e.geometry.coordinates[0][0].forEach(function (e) {
          latlng = { latitude: e[1], longitude: e[0] };
          coordinatesArray.push(latlng);
        });
      }
      polygonArray.push(coordinatesArray);
      var temp = {
        zipcode: e.properties.ZIPCODE,
        coordinates: coordinatesArray,
      };
      zipcode.push(temp);
      coordinatesArray = [];
    });

    return zipcode;
  };

  useEffect(() => {
    var zipcodes = readPolygonData();
    var polygonComponentList = createPolygonComponents(zipcodes);
    setPolygons(polygons.concat(polygonComponentList));
  }, []);

  return (
    <View style={styles.screen}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalContent}

            <Button
              title="close"
              color="red"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
      <MapView
        id="anchor"
        style={{ flex: 1 }}
        region={{
          latitude: 45.5051,
          longitude: -122.675,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        showsUserLocation={true}
      >
        {polygons}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  modalTextContainer: {
    marginBottom: 15,
    //justifyContent:"space-around"
  },

  modalText: {},

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default HeatmapScreen;
