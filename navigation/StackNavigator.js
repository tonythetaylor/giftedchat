import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator'
// import Messages from '../screens/Messages';
// import Profile from '../screens/Profile';
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatApp"
        component={DrawerNavigator}
        options={{
          headerShown: false 
        }}
      />
      {/* <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
};
export default StackNavigator;