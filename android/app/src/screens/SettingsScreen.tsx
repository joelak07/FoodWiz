import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';
import NavBar from './NavBar';

export default function SettingsScreen() {
  const [balance, setBalance] = useState('');
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const nameo = await AsyncStorage.getItem('name');
        setName(nameo);
      } catch (error) {
        console.error('Failed to fetch name:', error);
      }
    };

    fetchName();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out? This will clear all data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.navigate('Login');
            } catch (e) {
              Alert.alert('Error', 'Failed to log out');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleResetBalance = async () => {
    if (balance.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    const newBalance = parseFloat(balance);
    if (isNaN(newBalance)) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    try {
      if (newBalance > 0) {
        await AsyncStorage.setItem('balance', newBalance.toString());
        console.log('Balance updated successfully:', newBalance);
      } else {
        await AsyncStorage.setItem('balance', '0');
        setBalance('');
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
    Alert.alert(
      'Balance Reset',
      `New balance set to ${newBalance}\n\nKindly, close the app and open it again to see the changes`
    );

    setBalance('');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {!isKeyboardOpen && (
            <View style={styles.namebox}>
              <Text style={styles.userName}>Hello {name}! </Text>
            </View>
          )}
          <View style={styles.topBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter new balance"
              keyboardType="numeric"
              onChangeText={(text) => setBalance(text)}
              value={balance}
              placeholderTextColor="black"
            />
            <TouchableOpacity style={styles.Rbutton} onPress={handleResetBalance}>
              <Text style={styles.buttonText}>Reset Balance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Lbutton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.tot}>Mail me at joelabrahamkoshy@gmail.com for any feedback</Text>
        </View>
      </KeyboardAvoidingView>
      <Footer />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tot: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'black',
    width: '90%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'antiquewhite',
    alignItems: 'center',
  },
  namebox: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    height: 75,
    width: '95%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBox: {
    backgroundColor: 'antiquewhite',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: '100%',
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'center', // Margin at the bottom
  },
  userName: {
    fontSize: 25,
    color: 'black',
  },
  Rbutton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Lbutton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 70,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 20,
    color: 'black',
    borderWidth:1,
    borderColor:'#ccc'
  },
});
