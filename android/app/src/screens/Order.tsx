import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface OrderProps {
  date: string;
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
  totalExpense: number;
}

const Order: React.FC<OrderProps> = props => {
  const {date, breakfast, lunch, snacks, dinner, totalExpense} = props;

  const [balance, setBalance] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceString = await AsyncStorage.getItem('balance');
        if (balanceString !== null && !isNaN(parseFloat(balanceString))) {
          const balance = parseFloat(balanceString);
          setBalance(balance);
        } else {
          console.error('Invalid balance value:', balanceString);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleDel = async () => {
    console.log("DELDATE",date);
    console.log("TODAY",new Date().toLocaleDateString('en-GB'));
    if (date == new Date().toLocaleDateString('en-GB')) {
      try {
        const today = await AsyncStorage.getItem('tbal');
        console.log("TODAYBAL",today);
        const val = parseFloat(today);
        if (!isNaN(val)) {
          await AsyncStorage.setItem('tbal', (val + totalExpense).toString());
        } else {
          console.error('Invalid today value:', today);
        }
      } catch (e) {
        console.error('Failed to update today balance:', e);
        Alert.alert(
          'Update Failed',
          'Failed to update today balance. Please try again.',
        );
        return;
      }
    }
  
    try {
      await AsyncStorage.removeItem(date);
  
      const balance = await AsyncStorage.getItem('balance');
      const parsedBalance = parseFloat(balance);
      if (!isNaN(parsedBalance) && !isNaN(totalExpense)) {
        await AsyncStorage.setItem('balance', (parsedBalance + totalExpense).toString());
        setBalance(prevBalance => prevBalance + totalExpense);
      } else {
        console.error('Invalid balance or totalExpense:', balance, totalExpense);
      }
  
      Alert.alert(
        'Deletion Successful',
        'Items have been deleted successfully.',
      );
      navigation.navigate('Home');
    } catch (e) {
      console.error('Failed to delete items:', e);
      Alert.alert(
        'Deletion Failed',
        'Failed to delete items. Please try again.',
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.ordo}>
        <Text style={styles.date}>{date} </Text>
        <TouchableOpacity style={styles.del} onPress={handleDel}>
          <FontAwesomeIcon icon={faTrash} style={{color: 'gray'}} />
        </TouchableOpacity>
      </View>

      <Text style={styles.data}>Breakfast: {breakfast.join(', ')}</Text>
      <Text style={styles.data}>Lunch: {lunch.join(', ')}</Text>
      <Text style={styles.data}>Snacks: {snacks.join(', ')}</Text>
      <Text style={styles.data}>Dinner: {dinner.join(', ')}</Text>
      <Text style={styles.dats}>Total Expense: Rs {totalExpense}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  del: {
    marginTop: 5,
    color: 'gray',
  },
  ordo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  data: {
    fontSize: 15,
    color: 'gray',
  },
  dats: {
    fontSize: 18,
    marginTop: 5,
    color: 'gray',
  },
});

export default Order;
