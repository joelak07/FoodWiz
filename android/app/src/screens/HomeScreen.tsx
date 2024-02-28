import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';

export default function HomeScreen() {
  const [mealTime, setMealTime] = useState('breakfast');
  const [items, setItems] = useState(['Chicken Fried Rice']);

  const addItem = () => {
    setItems([...items, '']);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <SelectPicker
          selectedValue={mealTime}
          onValueChange={(itemValue, itemIndex) => setMealTime(itemValue)}
          style={styles.picker}
        >
          <SelectPicker.Item label="Breakfast" value="breakfast" />
          <SelectPicker.Item label="Lunch" value="lunch" />
          <SelectPicker.Item label="Snacks" value="snacks" />
          <SelectPicker.Item label="Dinner" value="dinner" />
        </SelectPicker>
      </View>
      <View style={styles.items}>
        <Text style={styles.title}>Add Items</Text>
        {items.map((_, index) => (
          <SelectPicker
            key={index}
            selectedValue={items[index]}
            onValueChange={(itemValue) => updateItem(index, itemValue)}
            style={styles.picker}
          >
            <SelectPicker.Item label="Chicken Fried Rice - 60" value="Chicken Fried Rice" />
            <SelectPicker.Item label="Chicken Biriyani - 100" value="Chicken Biriyani" />
            <SelectPicker.Item label="Naan - 20" value="Naan" />
            <SelectPicker.Item label="Porotta - 10" value="Porotta" />
          </SelectPicker>
        ))}
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'antiquewhite',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
  },
  items: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
