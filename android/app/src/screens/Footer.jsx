import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
    const navigation = useNavigation();
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
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleAddPress}>
                <FontAwesomeIcon icon={faPlus} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleHistoryPress}>
                <FontAwesomeIcon icon={faClockRotateLeft} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStatsPress}>
                <FontAwesomeIcon icon={faChartSimple} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSettingsPress}>
                <FontAwesomeIcon icon={faGear} />
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
    button: {
        width: '23%',
        height: 60,
        backgroundColor: '#C8BCAC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});
