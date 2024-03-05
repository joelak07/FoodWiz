import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function OpeningScreen() {
    const [loggedIn, setLoggedIn] = useState('');
    const navigation = useNavigation();
    

    useEffect(() => {
        const fetchLogin = async () => {
          try {
            const storedLogin = await AsyncStorage.getItem('login');
            console.log('Stored login:', storedLogin);
            if (storedLogin === "true") {
              navigation.navigate('Home');
            }else{
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
