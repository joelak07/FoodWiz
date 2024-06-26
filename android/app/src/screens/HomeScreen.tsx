import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  Alert,
  Linking,
  ScrollView,
  Button,
  Platform,

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
import firestore from '@react-native-firebase/firestore';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

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
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const today = new Date();
  const actd = new Date().toLocaleDateString('en-GB');
  const [date, setDate] = useState(today);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const appcheck = async () => {
      try {
        const doc = await firestore().collection('main').doc('app').get();
        const appurl = doc.data().appurl;
        const ver = doc.data().version;
        const msg=doc.data().message;
        let ins="2.0";
        let cver = Math.max(parseFloat(await AsyncStorage.getItem('version')||'0'), parseFloat(ins));
        console.log('cver ' + cver);
        console.log('ver ' + ver);
        const docref = firestore().collection('main').doc('app');
        const docs = await docref.get();

        if (ver > cver) {
          Alert.alert(
            'Update Available, Version ' + ver.toString(),
            'Do you want to update?\n\nUpdate Message: '+msg,
            [
              {
                text: 'No',
                onPress: () => {
                  console.log('User clicked No');
                },
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  console.log('User clicked Yes');
                  await AsyncStorage.setItem('version', ver.toString());
                  console.log('settt');
                  Linking.openURL(appurl);
                  if (doc.exists) {
                    await docref.update({
                      downloads: firestore.FieldValue.increment(1),
                    });
                  }
                },
              },
            ],
            {cancelable: false},
          );
        }
      } catch (e) {
        console.error('App Check Error:', e);
      }
    };
    appcheck();
  }, []);

  const navigation = useNavigation();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const disableBackButton = () => {
      // Disable back button on home screen
      if (navigation.isFocused()) {
        return true; // Return true to disable back button
      }
      return false; // Return false to allow back button
    };

    // Add event listener for back button press
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);

    return () => {
      // Remove event listener when component unmounts
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, [navigation]);

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

  const fetchBalance = async () => {
    console.log('FETCH BAL IS RUNNING');
    try {
      const storedBalance = await AsyncStorage.getItem('balance');
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
        const checkday = await AsyncStorage.getItem('balday');
        if (!checkday || parseInt(checkday) !== currentDate.getDate()) {
          await AsyncStorage.setItem(
            'balday',
            currentDate.getDate().toString(),
          );
          await AsyncStorage.setItem('tbal', todayBalanceValue.toFixed(2));
          console.log('Today Balance:', todayBalanceValue);
          console.log('Blad', checkday);
          setTodayBalance(todayBalanceValue.toFixed(2));
        } else {
          const storedTodayBalance = await AsyncStorage.getItem('tbal');
          if (parseFloat(storedTodayBalance) > 0) {
            setTodayBalance(parseFloat(storedTodayBalance));
          } else {
            setTodayBalance(0);
          }
        }
        // }
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadBalance();
      fetchBalance();
    }, []),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMealTime(getDefaultMealTime());
    }, 60000); 

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

  const removeItem = (index: number): void => {
    const newFoods: string[] = [...foods];
    newFoods.splice(index, 1);
    setFoods(newFoods);
  };

  const removeCusItem = (index: number): void => {
    const newFoods: string[] = [...cusfoods];
    const newPrices: number[] = [...cusfoodsprices];
    newFoods.splice(index, 1);
    newPrices.splice(index, 1);
    setCusFoods(newFoods);
    setCusFoodsPrices(newPrices);
  };

  const addItem = (): void => {
    if (foods.length < 5 && cusfoods.length < 5) {
      setFoods([...foods, '']);
      console.log('Foods:', foods);
    }
  };

  const addCusItem = (): void => {
    if (foods.length < 5 && cusfoods.length < 5) {
      setCusFoods([...cusfoods, '']);
      setCusFoodsPrices([...cusfoodsprices, '']);
    }
  };

  const updateItem = (index: number, value: string): void => {
    console.log('Updating item:', value);
    if (value !== '' && value !== 'Select') {
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

  const aaj = new Date().toLocaleDateString('en-GB');

  const completeOrder = async (mealTime: string) => {
    try {
      const currentDate = formattedDate;
      console.log(currentDate);
      const storedData = await AsyncStorage.getItem(currentDate);
      let data = storedData ? JSON.parse(storedData) : {};

      if (!data[mealTime]) {
        data[mealTime] = [];
      }

      // Remove empty strings from foods array
      const filteredFoods = foods.filter(
        food => food !== '' && food !== 'Select',
      );

      console.log('Items to save:', filteredFoods, cusfoods);
      data[mealTime] = [...data[mealTime], ...filteredFoods, ...cusfoods];

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
        if (food !== '') {
          const price = menu[food] || 0;
          if (priceMap.has(food)) {
            priceMap.set(food, priceMap.get(food) + price);
          } else {
            priceMap.set(food, price);
          }
        }
      });

      const prices = Array.from(priceMap, ([food, price]) => ({[food]: price}));

      const pricesObject = Object.assign({}, ...prices);
      console.log('Prices:', pricesObject);
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
      console.log('aaj ' + aaj);
      if (aaj == formattedDate) {
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
      }
      updateBalance(curbal - totalCost);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }

    try {
      const currentDate = formattedDate;
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

  // useEffect(() => {
  //   const getItemsForCurrentDate = async () => {
  //     console.log('GICD IS RUNNING');
  //     try {
  //       const itemsJson = await AsyncStorage.getItem(aaj);
  //       if (itemsJson !== null) {
  //         const disp = JSON.parse(itemsJson);
  //         console.log('Items for current date:', disp);
  //       } else {
  //         const currentDate = new Date();
  //         const lastDayOfMonth = new Date(
  //           currentDate.getFullYear(),
  //           currentDate.getMonth() + 1,
  //           0,
  //         ).getDate();
  //         const daysLeft = lastDayOfMonth - currentDate.getDate() + 1;
  //         const todayBalanceValue = balance / daysLeft;
  //         setTodayBalance(parseFloat(todayBalanceValue.toFixed(2)));
  //         console.log('hi ' + todayBalanceValue);
  //       }
  //     } catch (e) {
  //       console.error('Failed to get items:', e); // Set items to an empty array
  //     }
  //   };

  //   getItemsForCurrentDate(); // Call the function when the component mounts
  // }, []);

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

  const [formattedDate, setFormattedDate] = useState(actd);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setFormattedDate(formattedDate); // Output: Date: dd/mm/yyyy
  };

  const showMode = currentMode => {
    setMode(currentMode);
    setShow(true);
  };

  useEffect(() => {
    const coo = () => {
      console.log('Date:', formattedDate);
    };
    coo(); // Call the function to log the date when the component mounts
  }, []); // Empty dependency array to run the effect only once

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.hs}>
        <NavBar />
        <View style={[styles.main, isDarkMode && styles.darkmain]}>
          {!isKeyboardOpen && (
            <View style={styles.container}>
              <TouchableOpacity onPress={toggleBalance}>
                {showTodayBalance ? (
                  <Text style={[styles.bal,isDarkMode && styles.darkbal]}>
                    Today's Balance: Rs {todaybalance}
                  </Text>
                ) : (
                  <Text style={[styles.bal,isDarkMode && styles.darkbal]}>Balance: Rs {balance}</Text>
                )}
              </TouchableOpacity>
              <View style={styles.toppic}>
                <SelectPicker
                  selectedValue={mealTime}
                  onValueChange={(itemValue, itemIndex) =>
                    setMealTime(itemValue)
                  }
                  style={styles.pickerr}>
                  <SelectPicker.Item label="Breakfast" value="breakfast" />
                  <SelectPicker.Item label="Lunch" value="lunch" />
                  <SelectPicker.Item label="Snacks" value="snacks" />
                  <SelectPicker.Item label="Dinner" value="dinner" />
                </SelectPicker>
                <TouchableOpacity
                  onPress={() => showMode('date')}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesomeIcon icon={faCalendar} size={20} color={isDarkMode ? '#dcdcdc' : 'gray'} />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={today}
                  />
                )}
              </View>
            </View>
          )}
          <View style={styles.items}>
            <Text style={[styles.title,isDarkMode && styles.darkbal]}>Add Items</Text>
            {foods.map((_, index) => (
              <View key={index} style={styles.itemContainer}>
                <SelectPicker
                  selectedValue={foods[index]}
                  onValueChange={itemValue => updateItem(index, itemValue)}
                  style={styles.picker}>
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
                <TouchableOpacity
                  onPress={() => removeItem(index)}
                  style={styles.deleteButtonn}>
                  <FontAwesomeIcon icon={faTrash} style={{color: isDarkMode ? '#dcdcdc' : 'gray'}} />
                </TouchableOpacity>
              </View>
            ))}
            {cusfoods.map((_, index) => (
              <View key={index} style={styles.cus}>
                <View style={styles.cusbox}>
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
                <TouchableOpacity
                  onPress={() => removeCusItem(index)}
                  style={styles.deleteButton}>
                  <FontAwesomeIcon icon={faTrash} style={{color: isDarkMode ? '#dcdcdc' : 'gray'}} />
                </TouchableOpacity>
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
                style={[styles.completeButton,isDarkMode && styles.darkcb]}
                onPress={() => completeOrder(mealTime)}>
                <Text style={[styles.completeButtonText,isDarkMode && styles.darkcbt]}>SUBMIT</Text>
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
  toppic: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cusbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '98%',
    paddingRight: 2,
    marginLeft: 5,
  },
  cus: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  cup: {
    width: '76%',
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginLeft: 7,
    color: 'black',
  },
  cupr: {
    width: '20%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingRight: 0,
    marginLeft: 10,
    color: 'black',
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
  deleteButton: {
    marginLeft: 10,
    padding: 0,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  deleteButtonn: {
    marginLeft: 10.7,
    padding: 0,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
  },
  main: {
    flex: 1,
    backgroundColor: 'antiquewhite',
    width: '100%',
    height: '100%',
  },
  darkmain:{
    flex: 1,
    backgroundColor: '#333333',
    width: '100%',
    height: '100%',
  },
  bal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    color: '#787067',
  },
  darkbal:{
    color:'#dcdcdc'
  },
  container: {
    padding: 20,
    paddingBottom: 0,
  },
  items: {
    padding: 20,
    paddingTop: 5,
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#787067',
    marginBottom: 5,
  },
  picker: {
    width: '96%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    color: 'black',
  },
  pickerr: {
    width: '96%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    marginRight: 8,
    marginBottom: 10,
    color: 'black',
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
  darkcb:{
    backgroundColor:'#dcdcdc'
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  darkcbt:{
    color:'#333333'
  },
});
