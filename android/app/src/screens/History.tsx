import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Order from './Order';

export default function History() {
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceString = await AsyncStorage.getItem('balance');
        if (balanceString !== null) {
          const balance = parseFloat(balanceString);
          setBalance(balance);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let currentDate = new Date();
      let ordersData = {};
      let firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );

      while (currentDate.getTime() >= firstDayOfMonth.getTime()) {
        let dateKey = currentDate.toLocaleDateString('en-GB');
        let ordersForDate = await AsyncStorage.getItem(dateKey);
        if (ordersForDate) {
          ordersData[dateKey] = JSON.parse(ordersForDate);
        }
        currentDate.setDate(currentDate.getDate() - 1); // Move currentDate to the previous day
      }

      setOrders(ordersData);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavBar />
      <View style={styles.container}>
        <View style={styles.balbox}>
          <Text style={styles.titbal}>Your Balance: Rs {balance}</Text>
        </View>
        <Text style={styles.title}>Your Orders</Text>
        <ScrollView>
          <View>
            <View>
              {Object.keys(orders).map(date => (
                <Order
                  key={date}
                  date={date}
                  breakfast={orders[date].breakfast || []} // Use default value if breakfast is undefined
                  lunch={orders[date].lunch || []} // Use default value if lunch is undefined
                  snacks={orders[date].snacks || []} // Use default value if snacks is undefined
                  dinner={orders[date].dinner || []} // Use default value if dinner is undefined
                  totalExpense={orders[date].Expense}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'antiquewhite',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  balbox: {
    marginTop: 10,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    margin: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  titbal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
