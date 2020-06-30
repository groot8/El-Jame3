/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MainView = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearResults, setNearResult] = useState(null);
  // console.log(location);
  // console.log(errorMsg);
  // console.log(nearResults && nearResults);

  const getNearByMosques = (lat = '', lng = '', zoom = 18, cursor = '') => {
    return axios(
      `https://apis.algame3.xtend-eg.com/api/mosques?lat=${lat}&lng=${lng}&zoom=${zoom}&cursor=${cursor}`,
      {
        'Content-Type': 'application/json',
      },
    ).then((response) => setNearResult(response.data.results));
  };
  const renderMarkers = () =>
    nearResults?.map((result) => (
      <Marker
        coordinate={{
          latitude: result.location.lat,
          longitude: result.location.lat,
        }}
        title={result.name}
      />
    ));

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);
  useEffect(() => {
    getNearByMosques(30.1605349, 31.4111452, 18, '');
  }, [location]);

  // console.log();

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation
          region={{
            latitude: location && location.coords.latitude,
            longitude: location && location.coords.longitude,
            longitudeDelta: 0.0015,
            latitudeDelta: 0.0015,
          }}
          // Camera={{
          //   center: {
          //     latitude: location && location.coords.latitude,
          //     longitude: location && location.coords.longitude,
          //   },
          //   heading: location && location.coords.heading,
          //   pitch: location && location.coords.speed,
          //   zoom: 18,
          // }}
        >
          {renderMarkers()}
        </MapView>
      </View>
      <View style={styles.instructions}>
        <TouchableOpacity
          style={styles.searchBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SearchView')}
        >
          <Text style={styles.btnText}> ابحث باسم المسجد </Text>
        </TouchableOpacity>
        <View style={styles.list}>
          <Text style={styles.text}>١ - قم بتحريك الخريطة لتغيير موقعك</Text>
          <Text style={styles.text}>
            ٢ - بينما يتم تحريك الخريطة تظهر المساجد المحيطة على شكل أيقونة مسجد
          </Text>
          <Text style={styles.text}>
            ٣ - اضغط على ايقونة المسجد لتسجيل الحجز
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  mapView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: '#FF5722',
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  instructions: {
    width: '100%',
    height: '25%',
    backgroundColor: '#f3f4f8ab',
    alignItems: 'center',
  },
  list: {
    flexDirection: 'column',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',

    marginTop: 30,
    paddingRight: 20,
    width: '80%',
  },

  text: {
    textAlign: 'right',
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  searchBtn: {
    width: '94%',
    height: 50,
    justifyContent: 'center',
    paddingRight: 20,
    borderRadius: 6,
    marginTop: -20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  btnText: {
    color: '#888',
    fontSize: 16,
  },
});
export default MainView;
