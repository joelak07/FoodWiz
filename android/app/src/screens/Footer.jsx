import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
    const navigation = useNavigation();

    const handleHistoryPress = () => {
        navigation.navigate('History');
    };
    
    const handleAddPress = () => {
        navigation.navigate('Home');
    }

    const handleSettingsPress = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleAddPress}>
                <FontAwesomeIcon icon={faPlus} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleHistoryPress}>
                <FontAwesomeIcon icon={faClockRotateLeft} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faChartSimple} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}  onPress={handleSettingsPress}>
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
        width: 95,
        height: 60,
        backgroundColor: '#C8BCAC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});
