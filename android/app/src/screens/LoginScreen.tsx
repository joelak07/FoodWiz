import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState('');


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



  const handleLog=async()=>{
    try {
      await AsyncStorage.setItem('login', "true");
    } catch (e) {
      console.error('Failed to store balance:', e);
    }
  }

  const handleSetDate = async()=>{
    try {
      const date = new Date().toLocaleDateString('en-GB');;
      await AsyncStorage.setItem('stdate', date);
      console.log('Date stored successfully! ' +date);
    } catch (e) {
      console.error('Failed to store balance:', e);
    }
  }

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

  const handleLogin = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    handleLog()
    handleSetName();
    handleSetDate();
    handleSetBalance(); // Set balance here
    setLoggedIn("true");
    navigation.navigate('Home');
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodWiz</Text>
      <View style={styles.botbox}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={setName}
          value={name}
          placeholderTextColor="gray"
        />
        
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          placeholder="Enter your balance"
          value={inputValue}
          keyboardType='numeric'
          placeholderTextColor="gray"
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
    color:'#333'
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
    color:'black'
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
