import React from 'react'
import { View, Text } from 'react-native'
import useStatsBar from '../utils/userStatusBar';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../components/Header'

const SettingsScreen = props => {
    const Stack = createStackNavigator();
    useStatsBar('light-content');
    return (
        <View>
             {/* <CustomHeader navigation={props.navigation} title="Settings" /> */}
            <Text>This is settings</Text>
        </View>
    )
}

export default SettingsScreen
