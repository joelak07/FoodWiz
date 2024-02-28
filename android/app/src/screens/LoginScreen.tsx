import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen() {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    Alert.alert('Welcome', `Welcome, ${name}!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodPark Manager</Text>
      <View style={styles.botbox}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setName}
        value={name}
      />
      <View style={styles.buttonContainer}>
        <Button
            title="Login"
            onPress={handleLogin}
            color="green"
    
        />
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems:'center',
    padding: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
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
  },
  botbox:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
