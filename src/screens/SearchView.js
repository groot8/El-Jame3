import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ResultCard from '../components/ResultCard';
import axios from 'axios';
import { SearchField } from '../components/SearchBar';

const SearchView = () => {
  const [nearResults, setNearResult] = useState([]);
  const getNearByMosques = (lat = '', lng = '', zoom = 18, cursor = '') => {
    return axios(
      `https://apis.algame3.xtend-eg.com/api/mosques?lat=${lat}&lng=${lng}&zoom=${zoom}&cursor=${cursor}`,
      {
        'Content-Type': 'application/json',
      },
    ).then((response) => setNearResult(response.data.results));
  };
  useEffect(() => {
    getNearByMosques(30.1605349, 31.4111452, 18, '');
  }, []);

  const renderNearResult = () =>
    nearResults?.map((item) => (
      <ResultCard name={item?.name} address={item?.formatted_address} />
    ));
  return (
    <View style={styles.container}>
      <SearchField />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            color: '#888',
            fontWeight: 'bold',
          }}
        >
          مساجد بالقرب من موقعك
        </Text>
      </View>
      <ScrollView style={{ paddingRight: 50 }}>{renderNearResult()}</ScrollView>
    </View>
  );
};

export default SearchView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    height: 25,
    backgroundColor: '#fff',
  },
});
