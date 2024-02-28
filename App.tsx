import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LoginScreen from './android/app/src/screens/LoginScreen';
import HomeScreen from './android/app/src/screens/HomeScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <HomeScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default App;
