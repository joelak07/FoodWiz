import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import Footer from './Footer';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen() {
  const [cost, setCost] = useState(0);
  const [mealTime, setMealTime] = useState(getDefaultMealTime());
  const [items, setItems] = useState([]);
  const [foods, setFoods] = useState(['Select']);
  const [cusfoods, setCusFoods] = useState([]);
  const [cusfoodsprices, setCusFoodsPrices] = useState([]);
  const [cupa, setCupa] = useState([]);
  const [disp, setDisp] = useState([]);
  const [balance, setBalance] = useState(0);
  const [todaybalance, setTodayBalance] = useState(0);
  const [prices, setPrices] = useState({});

  const navigation = useNavigation();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  const forceReload = () => {
    setReloadKey(prevKey => prevKey + 1);
  };

  useFocusEffect(
    useCallback(() => {
      forceReload();
      return () => {};
    }, []),
  );

  useEffect(() => {
    let newCupa = {};
    cusfoods.forEach((food, index) => {
      newCupa[food] = cusfoodsprices[index];
    });
    setCupa(newCupa);
    console.log('Cusom prices:', newCupa);
  }, [cusfoods, cusfoodsprices]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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

  const loadBalance = async () => {
    try {
      const storedBalance = await AsyncStorage.getItem('balance');
      if (storedBalance !== null) {
        setBalance(parseFloat(storedBalance));
      }
    } catch (e) {
      console.error('Failed to load balance', e);
    }
  };

  
  useFocusEffect(
    React.useCallback(() => {
      loadBalance();
      
    }, [])
  );

  useEffect(() => {
    const fetchBalance = async () => {
      let flag = 0;
      try {
        const storedBalance = await AsyncStorage.getItem('balance');
        console.log('Stored balance:', storedBalance);
        if (storedBalance !== null) {
          const balanceValue = parseInt(storedBalance);
          setBalance(balanceValue);
          const currentDate = new Date();
          const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
          ).getDate();
          const daysLeft = lastDayOfMonth - currentDate.getDate() + 1;
          const todayBalanceValue = balanceValue / daysLeft;
          console.log('Today Balance1:', todayBalanceValue.toFixed(2));
          const currDate = new Date().toLocaleDateString('en-GB');
          const checkday = await AsyncStorage.getItem('balday');
          if (!checkday || parseInt(checkday) !== currentDate.getDate()) {
            await AsyncStorage.setItem(
              'balday',
              currentDate.getDate().toString(),
            );
            await AsyncStorage.setItem('tbal', todayBalanceValue.toFixed(2));
            const storedTodayBalance = await AsyncStorage.getItem('tbal');
            setTodayBalance(parseFloat(todayBalanceValue.toFixed(2)));
            console.log('Today Balance2:', storedTodayBalance);
          } else {
            const storedTodayBalance = await AsyncStorage.getItem('tbal');
            if (parseFloat(storedTodayBalance) > 0) {
              setTodayBalance(parseFloat(storedTodayBalance));
            } else {
              setTodayBalance(0);
            }
            console.log('Today Balance3:', storedTodayBalance);
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

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

  const addItem = (): void => {
    if (foods.length < 5 && cusfoods.length < 4) {
      setFoods([...foods, '']);
    }
  };

  const addCusItem = (): void => {
    if (foods.length < 5 && cusfoods.length < 4) {
      setCusFoods([...cusfoods, '']);
      setCusFoodsPrices([...cusfoodsprices, '']);
    }
  };

  const updateItem = (index: number, value: string): void => {
    if (value !== '') {
      const newFoods: string[] = [...foods];
      newFoods[index] = value;
      setFoods(newFoods);
    }
  };

  const updateCusItem = (index: number, value: string): void => {
    const newFoods: string[] = [...cusfoods];
    newFoods[index] = value;
    setCusFoods(newFoods);
  };

  const updateCusItemPrices = (index: number, value: string): void => {
    const newPrices: number[] = [...cusfoodsprices];
    newPrices[index] = parseFloat(value);
    setCusFoodsPrices(newPrices);
  };

  const completeOrder = async (mealTime: string) => {
    try {
      // const currentDate = new Date().toLocaleDateString('en-GB');
      const currentDate='01/03/2024'
      console.log(currentDate);
      const storedData = await AsyncStorage.getItem(currentDate);
      let data = storedData ? JSON.parse(storedData) : {};

      if (!data[mealTime]) {
        data[mealTime] = [];
      }
      console.log('Items to save:', foods, cusfoods);
      data[mealTime] = [...data[mealTime], ...foods, ...cusfoods];

      await AsyncStorage.setItem(currentDate, JSON.stringify(data));
      console.log('Items saved successfully');
    } catch (e) {
      console.error('Failed to save items:', e);
    }
    let totalCost = 0;
    try {
      const menuString = await AsyncStorage.getItem('menu');
      if (!menuString) {
        console.error('Menu not found in AsyncStorage');
        return;
      }

      const menu = JSON.parse(menuString);
      const priceMap = new Map();

      foods.forEach(food => {
        const price = menu[food] || 0;
        if (priceMap.has(food)) {
          priceMap.set(food, priceMap.get(food) + price);
        } else {
          priceMap.set(food, price);
        }
      });

      const prices = Array.from(priceMap, ([food, price]) => ({[food]: price}));

      const pricesObject = Object.assign({}, ...prices);
      const combinedObject = {...pricesObject, ...cupa};
      console.log('Prices:', combinedObject);
      setPrices(combinedObject);

      Object.keys(combinedObject).forEach(food => {
        const priceStr = combinedObject[food];
        console.log('Price:' + food + ' is', priceStr);
        const price = parseInt(priceStr, 10);
        if (!isNaN(price)) {
          totalCost += price;
        }
      });
      setCost(totalCost);
      console.log('cost1 ' + cost);
      const curbal = balance;
      setBalance(curbal - totalCost);
      console.log('Today Balance:', todaybalance);
      const storemon = todaybalance - totalCost;
      if (storemon > 0) {
        setTodayBalance(parseFloat(storemon.toFixed(2)));
      } else {
        setTodayBalance(0);
      }
      if (storemon > 0) {
        await AsyncStorage.setItem('tbal', storemon.toFixed(2));
      } else {
        await AsyncStorage.setItem('tbal', '0');
      }
      updateBalance(curbal - totalCost);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }

    try {
      const currentDate='01/03/2024'
      console.log(currentDate);
      const storedData = await AsyncStorage.getItem(currentDate);
      let data = storedData ? JSON.parse(storedData) : {};
      console.log('Cost ' + totalCost);
      if (!data['Expense']) {
        data['Expense'] = totalCost;
      } else {
        data['Expense'] = data['Expense'] + totalCost;
      }
      await AsyncStorage.setItem(currentDate, JSON.stringify(data));
      console.log('Items saved successfully');
    } catch (e) {
      console.error('Failed to save items:', e);
    }
    setFoods([]);
    setCusFoods([]);
    setCost(0);
  };

  const updateBalance = async (newBalance: number) => {
    try {
      if (newBalance > 0) {
        await AsyncStorage.setItem('balance', newBalance.toString());
        console.log('Balance updated successfully:', newBalance);
        setBalance(newBalance);
      } else {
        await AsyncStorage.setItem('balance', '0');
        setBalance(0);
      }
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
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.hs}>
        <NavBar />
        <View style={styles.main}>
          {!isKeyboardOpen && (
            <View style={styles.container}>
              <TouchableOpacity onPress={toggleBalance}>
                {showTodayBalance ? (
                  <Text style={styles.bal}>
                    Today's Balance: {todaybalance}Rs
                  </Text>
                ) : (
                  <Text style={styles.bal}>Balance: {balance}Rs</Text>
                )}
              </TouchableOpacity>
              <SelectPicker
                selectedValue={mealTime}
                onValueChange={(itemValue, itemIndex) => setMealTime(itemValue)}
                style={styles.picker} >
                <SelectPicker.Item label="Breakfast" value="breakfast" />
                <SelectPicker.Item label="Lunch" value="lunch" />
                <SelectPicker.Item label="Snacks" value="snacks" />
                <SelectPicker.Item label="Dinner" value="dinner" />
              </SelectPicker>
            </View>
          )}
          <View style={styles.items}>
            <Text style={styles.title}>Add Items</Text>
            {foods.map((_, index) => (
              <SelectPicker
                key={index}
                selectedValue={foods[index]}
                onValueChange={itemValue => updateItem(index, itemValue)}
                style={styles.picker} >
                <SelectPicker.Item
                  key="disabled-option"
                  label="Select Item"
                  value=""
                />
                {items.map((item, itemIndex) => (
                  <SelectPicker.Item
                    key={itemIndex}
                    label={item}
                    value={item}
                  />
                ))}
              </SelectPicker>
            ))}
            {cusfoods.map((_, index) => (
              <View key={index} style={styles.cus}>
                <TextInput
                  style={styles.cup}
                  placeholder="Enter Custom Item"
                  placeholderTextColor="gray"
                  onChangeText={value => updateCusItem(index, value)}
                />
                <TextInput
                  style={styles.cupr}
                  placeholder="$"
                  placeholderTextColor="gray"
                  onChangeText={value => updateCusItemPrices(index, value)}
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

            {!isKeyboardOpen && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => completeOrder(mealTime)}>
                <Text style={styles.completeButtonText}>SUBMIT</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Footer />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cus: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  cup: {
    width: '78%',
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  cupr: {
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
    color:'#787067'
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
    color:'#787067',
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
    color:'black'
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
