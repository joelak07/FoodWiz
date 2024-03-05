import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import lunchdinnerItems from '../DB/lunchdinnerItems';

export default function LoginScreen() {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState('');

  // useEffect(() => {
  //   const fetchLogin = async () => {
  //     try {
  //       const storedLogin = await AsyncStorage.getItem('login');
  //       console.log('Stored login:', storedLogin);
  //       if (storedLogin === "true") {
  //         navigation.navigate('Home');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching login:', error);
  //     }
  //   };

  //   fetchLogin();
  // }, [loggedIn]);

  const navigation = useNavigation();


  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleSetName = async()=>{
    try {
      await AsyncStorage.setItem('name', name);
    } catch (e) {
      console.error('Failed to store balance:', e);
    }
  }

  const handleSetBalance = () => {
    const newBalance = parseInt(inputValue);
    if (!isNaN(newBalance)) {
      setInputValue('');
      storeBalance(newBalance);
      console.log('Balance set to:', newBalance);
    }
  };

  const storeBalance = async (newBalance:number) => {
    try {
      await AsyncStorage.setItem('balance', newBalance.toString());
      console.log('Balance stored successfully! ' +newBalance.toString());
    } catch (e) {
      console.error('Failed to store balance:', e);
    }
  }

  // const fetchBalance = async () => {
  //   try {
  //     const storedBalance = await AsyncStorage.getItem('balance');
  //     if (storedBalance) {
  //       console.log(parseInt(storedBalance));
  //     }
  //   } catch (e) {
  //     console.error('Failed to fetch balance:', e);
  //   }
  // }

  const handleLog=async()=>{
    try {
      await AsyncStorage.setItem('login', "true");
    } catch (e) {
      console.error('Failed to store balance:', e);
    }
  }

  const handleLogin = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    handleLog()
    handleSetName();
    handleSetBalance(); // Set balance here
    setLoggedIn("true");
    navigation.navigate('Home');
    
  };

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
          placeholder="Enter your balance"
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
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
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
