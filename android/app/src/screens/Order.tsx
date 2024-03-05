import React from 'react';
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
      <Text style={styles.date}>Date:{date} </Text>
      <Text style={styles.data}>Breakfast: {breakfast}</Text>
      <Text style={styles.data}>Lunch: {lunch}</Text>
      <Text style={styles.data}>Snacks: </Text>
      <Text style={styles.data}>Dinner: </Text>
      <Text style={styles.data}>Total Expense: {totalExpense}</Text>
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
  },
  data:{
    fontSize:15,
  }
});

export default Order;
