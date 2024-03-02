import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const [balance, setBalance] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleSetBalance = () => {
    const newBalance = parseInt(inputValue);
    if (!isNaN(newBalance)) {
      setBalance(newBalance);
      setInputValue('');
      console.log(newBalance);
    }
  };

  const handleLogin = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    Alert.alert('Welcome', `Welcome, ${name}!`);
  };

  useEffect(() => {

    const breakfastItems= require('../DB/breakfastItems');
    console.log(breakfastItems);
    
    const storeMenu = async () => {
      try {
        const jsonMenu = JSON.stringify(breakfastItems);
        await AsyncStorage.setItem('breakfast', jsonMenu);
        console.log('Breakfast items stored successfully!');
      } catch (e) {
        console.error('Failed to store breakfast items:', e);
      }
    };

    storeMenu();
  }, []);

  useEffect(() => {
    const menuItems = require('../DB/menuitems');

    const storeMenu = async () => {
      try {
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
    const getMenu = async () => {
      try {
        const jsonMenu = await AsyncStorage.getItem('menu');
        const menu = jsonMenu != null ? JSON.parse(jsonMenu) : null;
        const chickenFriedRicePrice =
          menu != null ? menu['Chicken Fried Rice/Noodles'] : null;
        console.log('Price of Chicken Fried Rice:', chickenFriedRicePrice);
      } catch (e) {
        console.error('Failed to retrieve menu items:', e);
      }
    };

    getMenu();
  }, []);

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodWiz</Text>
      <View style={styles.botbox}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={setName}
          value={name}
        />
        
        <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={inputValue}
        keyboardType='numeric'
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="green" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'antiquewhite',
  },
  title: {
    fontSize: 74,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    borderColor: 'green',
  },
  botbox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
