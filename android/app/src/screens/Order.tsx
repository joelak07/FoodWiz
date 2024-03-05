import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderProps {
  date: string;
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
  totalExpense: number;
}

const Order: React.FC<OrderProps> = (props) => {
  const { date, breakfast, lunch, snacks, dinner, totalExpense } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date} </Text>
      <Text style={styles.data}>Breakfast: {breakfast.join(', ')}</Text>
      <Text style={styles.data}>Lunch: {lunch.join(', ')}</Text>
      <Text style={styles.data}>Snacks: {snacks.join(', ')}</Text>
      <Text style={styles.data}>Dinner: {dinner.join(', ')}</Text>
      <Text style={styles.dats}>Total Expense: {totalExpense}Rs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'white',
    borderRadius:10,
    marginBottom:10,
  },
  date:{
    fontSize:20,
    marginBottom:5,
    fontWeight:'bold',
    color:'black',
  },
  data:{
    fontSize:15,
    color:'gray',
  },
  dats:{
    fontSize:18,
    marginTop:5,
    color:'gray',
  }
});

export default Order;
