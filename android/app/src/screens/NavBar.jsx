import { View, Text, Switch, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

export default function NavBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.navBar, isDarkMode && styles.darkMode]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>FoodWiz</Text>
      <View style={styles.iconContainer}>
        {isDarkMode ? (
          <FontAwesomeIcon icon={faMoon} style={[styles.icon, { color: 'white' }]} />
        ) : (
          <FontAwesomeIcon icon={faSun} style={styles.icon} />
        )}
        <Switch
          trackColor={{ false: '#767577', true: 'white' }}
          thumbColor={isDarkMode ? '#333333' : 'antiquewhite'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
          style={styles.switch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8BCAC',
    padding: 10,
    width: '100%',
  },
  darkMode: {
    backgroundColor: 'black', // Dark mode background color
  },
  text: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    color: 'black',
  },
  darkText: {
    color: 'white', // Dark mode text color
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 2,
    fontSize: 20,
    color: 'black', // Color for the sun icon
  },
  switch: {
    marginLeft: 'auto',
    marginRight: 5,
  },
});
