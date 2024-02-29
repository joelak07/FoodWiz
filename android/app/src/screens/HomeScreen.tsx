import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [mealTime, setMealTime] = useState(getDefaultMealTime());
  const [items, setItems] = useState(['Chicken Fried Rice']);
  const [balance, setBalance] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setMealTime(getDefaultMealTime());
    }, 60000); // Update meal time every minute

    return () => clearInterval(interval);
  }, []);

  function getDefaultMealTime() {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      return 'breakfast';
    } else if (hour >= 12 && hour < 15) {
      return 'lunch';
    } else if (hour >= 15 && hour < 19) {
      return 'snacks';
    } else {
      return 'dinner';
    }
  }

  const addItem = () => {
    if (items.length < 6) {
      setItems([...items, '']);
    }
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const completeOrder = async (mealTime: string) => {
    try {
      const currentDate = new Date().toLocaleDateString('en-GB');
      const storedData = await AsyncStorage.getItem(currentDate);
      let data = storedData ? JSON.parse(storedData) : {};
  
      if (!data[mealTime]) {
        data[mealTime] = [];
      }
  
      data[mealTime] = [...data[mealTime], ...items];
      
      await AsyncStorage.setItem(currentDate, JSON.stringify(data));
      console.log('Items saved successfully');
    } catch (e) {
      console.error('Failed to save items:', e);
    }
  };

  const getItemsForCurrentDate = async () => {
  try {
    const currentDate = new Date().toLocaleDateString('en-GB');
    const itemsJson = await AsyncStorage.getItem(currentDate);
    if (itemsJson !== null) {
      const items = JSON.parse(itemsJson);
      console.log('Items for current date:', items);
      return items;
    } else {
      console.log('No items found for current date');
      return [];
    }
  } catch (e) {
    console.error('Failed to get items:', e);
    return [];
  }
};

const deleteItemsForCurrentDate = async () => {
  try {
    const currentDate = new Date().toLocaleDateString('en-GB');
    await AsyncStorage.removeItem(currentDate);
    console.log('Items deleted successfully for current date');
  } catch (e) {
    console.error('Failed to delete items:', e);
  }
};

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.bal}>Balance: {balance}Rs</Text>
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
        {items.length < 6 && (
          <TouchableOpacity onPress={addItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.completeButton} onPress={() => completeOrder(mealTime)}>
          <Text style={styles.completeButtonText}>COMPLETE</Text>
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
  bal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  container: {
    padding: 20,
  },
  items: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'antiquewhite',
    height: '100%',
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
    marginTop: 10,
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
    width: '90%',
    position: 'absolute',
    bottom: 150,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
