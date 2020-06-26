import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from './src/Container';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.statusbar} />

      <Container />
      <StatusBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 50,
  },
  statusbar: {
    height: 36,
    backgroundColor: '#fff',
  },
});
