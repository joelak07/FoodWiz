import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function NavBar() {
  return (
    <View style={styles.navBar}>
      <Text style={styles.text}>FoodWiz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#C8BCAC',
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    color: 'black',
  },
});
