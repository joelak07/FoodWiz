import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LoginScreen from './android/app/src/screens/LoginScreen';
import HomeScreen from './android/app/src/screens/HomeScreen';
import History from './android/app/src/screens/History';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OpeningScreen from './android/app/src/screens/OpeningScreen';
import SettingsScreen from './android/app/src/screens/SettingsScreen';
import StatsScreen from './android/app/src/screens/StatsScreen';
import { ThemeProvider } from './android/app/src/screens/ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Open"
            component={OpeningScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Stats"
            component={StatsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default App;
