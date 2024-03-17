import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme);

  useEffect(() => {
    const fetchThemeMode = async () => {
      try {
        const themeMode = await AsyncStorage.getItem('themeMode');
        setIsDarkMode(themeMode === 'dark');
      } catch (error) {
        console.error('Failed to fetch theme mode:', error);
      }
    };

    fetchThemeMode();
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode ? 'dark' : 'light';
    AsyncStorage.setItem('themeMode', newMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
