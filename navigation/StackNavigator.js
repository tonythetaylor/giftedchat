import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator'

// import Messages from '../screens/Messages';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          headerShown: false 
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false 
        }}
      />
      {/* <Stack.Screen name="Messages" component={Messages} /> */}
      <Stack.Screen name="Profile" component={ProfileScreen} /> 
    </Stack.Navigator>
  );
};
export default StackNavigator;