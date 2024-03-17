import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

export default function Footer() {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                setIsKeyboardOpen(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setIsKeyboardOpen(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    if (isKeyboardOpen) {
        return null; // Return null to hide the footer when the keyboard is open
    }

    const handleHistoryPress = () => {
        navigation.navigate('History');
    };

    const handleAddPress = () => {
        navigation.navigate('Home');
    }

    const handleSettingsPress = () => {
        navigation.navigate('Settings');
    }

    
    const handleStatsPress = () => {
        navigation.navigate('Stats');
    }

    return (
        <View style={[styles.footer, isDarkMode && styles.darkFooter]}>
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleAddPress}>
                <FontAwesomeIcon icon={faPlus} style={[styles.icon, isDarkMode && styles.whiteIcon]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleHistoryPress}>
                <FontAwesomeIcon icon={faClockRotateLeft} style={[styles.icon, isDarkMode && styles.whiteIcon]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleStatsPress}>
                <FontAwesomeIcon icon={faChartSimple} style={[styles.icon, isDarkMode && styles.whiteIcon]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleSettingsPress}>
                <FontAwesomeIcon icon={faGear} style={[styles.icon, isDarkMode && styles.whiteIcon]} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'antiquewhite',
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 5,
    },
    darkFooter: {
        backgroundColor: '#333333', // Dark mode background color
    },
    button: {
        width: '23%',
        height: 60,
        backgroundColor: '#C8BCAC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    darkButton: {
        backgroundColor: '#1a1a1a', // Dark mode button background color
    },
    icon: {
        color: 'black', // Default icon color
        fontSize: 24,
    },
    whiteIcon: {
        color: 'white', // Icon color in dark mode
    },
});
