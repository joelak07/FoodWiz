import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function StatsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.title}>Coming Soon</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'antiquewhite',
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
  },
});
