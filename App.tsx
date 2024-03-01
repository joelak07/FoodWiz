import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LoginScreen from './android/app/src/screens/LoginScreen';
import HomeScreen from './android/app/src/screens/HomeScreen';
import NavBar from './android/app/src/screens/NavBar';
import Footer from './android/app/src/screens/Footer';

const App = () => {
  return (
    <View style={styles.container}>
      <NavBar/>
      <HomeScreen/>
      <Footer/>
      {/* <LoginScreen/> */}
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
