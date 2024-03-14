import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function OpeningScreen() {
  const [loggedIn, setLoggedIn] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const storeMenu = async () => {
      try {
        const breakfastItems = require('../DB/breakfastItems');
        const jsonMenu = JSON.stringify(breakfastItems);
        await AsyncStorage.setItem('breakfast', jsonMenu);
        console.log('Breakfast items stored successfully!');
      } catch (e) {
        console.error('Failed to store breakfast items:', e);
      }

      try {
        const snacksItems = require('../DB/snacksItems');
        const jsonMenu = JSON.stringify(snacksItems);
        await AsyncStorage.setItem('snacks', jsonMenu);
        console.log('Snacks items stored successfully!');
      } catch (e) {
        console.error('Failed to store snacks items:', e);
      }

      try {
        const lunchdinnerItems = require('../DB/lunchdinnerItems');
        const jsonMenu = JSON.stringify(lunchdinnerItems);
        await AsyncStorage.setItem('lunch', jsonMenu);
        await AsyncStorage.setItem('dinner', jsonMenu);
        console.log('Lunch/Dinner items stored successfully!');
      } catch (e) {
        console.error('Failed to store Lunch/Dinner items:', e);
      }

      

      
    };

    storeMenu();
  }, []);

  useEffect(() => {
    const storeMenu = async () => {
      try {
        const menuItems = require('../DB/menuItems');
        const jsonMenu = JSON.stringify(menuItems);
        await AsyncStorage.setItem('menu', jsonMenu);
        console.log('Menu items stored successfully!');
      } catch (e) {
        console.error('Failed to store menu items:', e);
      }
    };

    storeMenu();
  }, []);


  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem('login');
        console.log('Stored login:', storedLogin);
        if (storedLogin === 'true') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching login:', error);
      }
    };

    fetchLogin();
  }, [loggedIn]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodWiz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'antiquewhite', // Light background color
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333', // Dark text color
  },
});
