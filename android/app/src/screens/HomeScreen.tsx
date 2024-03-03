import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewComponent,
} from 'react-native';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import Footer from './Footer';
import {useNavigation} from '@react-navigation/native';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {TextInput} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [mealTime, setMealTime] = useState('breakfast');
  const [cost, setCost] = useState(0);
  // const [mealTime, setMealTime] = useState(getDefaultMealTime());
  const [items, setItems] = useState([]);
  const [foods, setFoods] = useState(['Select']);
  const [cusfoods, setCusFoods] = useState([]);
  const [disp, setDisp] = useState([]);
  const [balance, setBalance] = useState(0);
  const [todaybalance, setTodayBalance] = useState(0);
  const [prices, setPrices] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem('login');
        if (storedLogin !== 'true') {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching login:', error);
      }
    };

    fetchLogin();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
        try {
            const storedBalance = await AsyncStorage.getItem('balance');
            console.log('Stored balance:', storedBalance);
            if (storedBalance !== null) {
                const balanceValue = parseInt(storedBalance);
                setBalance(balanceValue);
                const currentDate = new Date();
                const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
                const daysLeft = lastDayOfMonth - currentDate.getDate() + 1;
                const todayBalanceValue = balanceValue / daysLeft;
                setTodayBalance(parseFloat(todayBalanceValue.toFixed(2)));
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    fetchBalance();
}, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMealTime(getDefaultMealTime());
  //   }, 60000); // Update meal time every minute

  //   return () => clearInterval(interval);
  // }, []);

  // function getDefaultMealTime() {
  //   const hour = new Date().getHours();
  //   if (hour >= 4 && hour < 12) {
  //     return 'breakfast';
  //   } else if (hour >= 12 && hour < 15) {
  //     return 'lunch';
  //   } else if (hour >= 15 && hour < 19) {
  //     return 'snacks';
  //   } else {
  //     return 'dinner';
  //   }
  // }

  const addItem = (): void => {
    if (foods.length < 5 && cusfoods.length < 4) {
      setFoods([...foods, '']);
    }
  };

  const addCusItem = (): void => {
    if (foods.length < 5 && cusfoods.length < 4) {
      setCusFoods([...cusfoods, '']);
    }
  };

  const updateItem = (index: number, value: string): void => {
    const newFoods: string[] = [...foods];
    newFoods[index] = value;
    setFoods(newFoods);
  };

  const updateCusItem = (index: number, value: string): void => {
    const newFoods: string[] = [...cusfoods];
    newFoods[index] = value;
    setCusFoods(newFoods);
  }

  const completeOrder = async (mealTime: string) => {
    try {
      const currentDate = new Date().toLocaleDateString('en-GB');
      console.log(currentDate);
      const storedData = await AsyncStorage.getItem(currentDate);
      let data = storedData ? JSON.parse(storedData) : {};

      if (!data[mealTime]) {
        data[mealTime] = [];
      }
      console.log('cusom foods:', cusfoods);
      console.log('Items to save:', foods);
      data[mealTime] = [...data[mealTime], ...foods];

      await AsyncStorage.setItem(currentDate, JSON.stringify(data));
      console.log('Items saved successfully');
    } catch (e) {
      console.error('Failed to save items:', e);
    }

    try {
      const menuString = await AsyncStorage.getItem('menu');
      if (!menuString) {
        console.error('Menu not found in AsyncStorage');
        return;
      }

      const menu = JSON.parse(menuString);

      const prices = foods.map(food => {
        const price = menu[food] || 0;
        return {[food]: price};
      });

      const pricesObject = Object.assign({}, ...prices);
      setPrices(pricesObject);
      console.log(pricesObject);

      let totalCost = 0;
      Object.keys(pricesObject).forEach(food => {
        const priceStr = pricesObject[food];
        const price = parseInt(priceStr, 10);
        if (!isNaN(price)) {
          totalCost += price;
        }
      });
      setCost(totalCost);
      const curbal = balance;
      setBalance(curbal - totalCost);
      updateBalance(curbal - totalCost);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const updateBalance = async (newBalance: number) => {
    try {
      await AsyncStorage.setItem('balance', newBalance.toString());
      console.log('Balance updated successfully:', newBalance);
      setBalance(newBalance);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const getItemsForCurrentDate = async () => {
    try {
      const currentDate = new Date().toLocaleDateString('en-GB');
      const itemsJson = await AsyncStorage.getItem(currentDate);
      if (itemsJson !== null) {
        const disp = JSON.parse(itemsJson);
        console.log('Items for current date:', disp);
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

  const [showTodayBalance, setShowTodayBalance] = useState(false);

    const toggleBalance = () => {
        setShowTodayBalance(!showTodayBalance);
    };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsString = await AsyncStorage.getItem(mealTime);
        if (itemsString) {
          const itemsArray = JSON.parse(itemsString);
          setItems(itemsArray);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [mealTime]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.hs}>
      <NavBar />
      <View style={styles.main}>
        <View style={styles.container}>
        <TouchableOpacity onPress={toggleBalance}>
            {showTodayBalance ? (
                <Text style={styles.bal}>Today's Balance: {todaybalance}Rs</Text>
            ) : (
                <Text style={styles.bal}>Balance: {balance}Rs</Text>
            )}
        </TouchableOpacity>
          <SelectPicker
            selectedValue={mealTime}
            onValueChange={(itemValue, itemIndex) => setMealTime(itemValue)}
            style={styles.picker}>
            <SelectPicker.Item label="Breakfast" value="breakfast" />
            <SelectPicker.Item label="Lunch" value="lunch" />
            <SelectPicker.Item label="Snacks" value="snacks" />
            <SelectPicker.Item label="Dinner" value="dinner" />
          </SelectPicker>
        </View>
        <View style={styles.items}>
          <Text style={styles.title}>Add Items</Text>
          {foods.map((_, index) => (
            <SelectPicker
              key={index}
              selectedValue={foods[index]}
              onValueChange={itemValue => updateItem(index, itemValue)}
              style={styles.picker}>

              {items.map((item, itemIndex) => (
                <SelectPicker.Item key={itemIndex} label={item} value={item} />
              ))}
            </SelectPicker>
          ))}
          {cusfoods.map((_, index) => (
            <View style={styles.cus}>
            <TextInput
              style={styles.cup}
              placeholder="Enter Custom Item"
              onChangeText={value => updateCusItem(index, value)}
            />
            <TextInput
              style={styles.cupr}
              placeholder="$"
              onChangeText={value => updateCusItem(index, value)}
            />
          </View>
          
          ))}
          {foods.length + cusfoods.length < 5 && (
            <View style={styles.adding}>
              <TouchableOpacity onPress={addItem} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addCusItem} style={styles.cusButton}>
                <FontAwesomeIcon icon={faPen} color="white" />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.completeButton}
            // onPress={() => deleteItemsForCurrentDate ()}>
            onPress={() => completeOrder(mealTime)}>
            <Text style={styles.completeButtonText}>COMPLETE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
     </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cus:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  cup:{
    width: '78%',
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  cupr:{
    width: '20%',
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
  },
  adding: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  hs: {
    width: '100%',
    height: '100%',
  },
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
    marginBottom: 10,
  },
  container: {
    padding: 20,
    paddingBottom: 0,
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
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 10,
  },
  cusButton: {
    backgroundColor: 'red',
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
