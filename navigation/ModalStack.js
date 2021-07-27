import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const ModalStack = createStackNavigator();

export default function ModalStack() {
    return (
      <ModalStack.Navigator mode='modal' headerMode='none'>
        <ModalStack.Screen name='ChatApp' component={ChatApp} />
        <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
      </ModalStack.Navigator>
    );
  }