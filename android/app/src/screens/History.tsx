import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Order from './Order';

export default function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let currentDate = new Date();
      let ordersData = {};
      while (true) {
        let dateKey = currentDate.toLocaleDateString('en-GB');
        let ordersForDate = await AsyncStorage.getItem(dateKey);
        if (!ordersForDate) break;
        ordersData[dateKey] = JSON.parse(ordersForDate);
        currentDate.setDate(currentDate.getDate() - 1);
        console.log(ordersData);
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
          <Text style={styles.titbal}>Your Balance: Balance</Text>
        </View>
        <Text style={styles.title}>Your Orders</Text>
        <View>
          <ScrollView>
            <View>
              {Object.keys(orders).map(date => (
                <Order
                  key={date}
                  date={date}
                  breakfast={orders[date].breakfast}
                  lunch={orders[date].lunch}
                  snacks={orders[date].snacks}
                  dinner={orders[date].dinner}
                  totalExpense={orders[date].Expense}
                />
              ))}              
            </View>
          </ScrollView>
        </View>
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
