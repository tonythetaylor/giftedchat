import React from 'react'
import { View, Text } from 'react-native'
import useStatsBar from '../utils/userStatusBar';

const SettingsScreen = () => {
    useStatsBar('light-content');
    return (
        <View>
            <Text>THis is settings</Text>
        </View>
    )
}

export default SettingsScreen
