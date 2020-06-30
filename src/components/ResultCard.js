import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ResultCard = ({ name, address }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/mosque.png')}
        style={{ width: 40, height: 40, marginLeft: 15 }}
      />
      <View style={styles.cardMeta}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ fontSize: 16, color: '#888' }}>{address}</Text>
      </View>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    height: 80,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  cardMeta: { height: 40, justifyContent: 'center', marginTop: 5 },
});
