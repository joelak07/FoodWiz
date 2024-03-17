import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useTheme } from './ThemeContext';

export default function StatsScreen() {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <NavBar />
      <View style={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Coming Soon</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'antiquewhite',
  },
  darkContainer: {
    backgroundColor: '#333333', // Dark mode background color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
  },
  darkTitle: {
    color: 'white', // Dark mode text color
  },
});
