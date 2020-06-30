/* eslint-disable import/extensions */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './screens/MainView';
import SearchView from './screens/SearchView';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});
const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainView"
        component={MainView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchView"
        component={SearchView}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const Container = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>{SearchStack()}</NavigationContainer>
      {/* <Text> dsdsds</Text> */}
    </View>
  );
};

export default Container;
