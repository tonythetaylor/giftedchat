import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { IconButton } from 'react-native-paper';
import HomeScreen from './HomeScreen';
import AddRoomScreen from './AddRoomScreen';
import RoomScreen from './RoomScreen';
import AppTabsScreen from './AppTabScreen';
import { AuthContext } from '../navigation/AuthProvider';
import AppDrawerScreen from './AppDrawerScreen';

import useStatsBar from '../utils/userStatusBar';

const ChatAppStack = createStackNavigator();

const ChatAppScreen = () => {
    useStatsBar('light-content');
    const { logout } = useContext(AuthContext);
  
    return (
      <ChatAppStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6646ee'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 22
          }
        }}
      >
        <ChatAppStack.Screen
          name='Home'
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon='message-plus'
                size={28}
                color='#ffffff'
                onPress={() => navigation.navigate('AddRoom')}
              />
            ),
            headerLeft: () => (
              <IconButton
                icon='logout-variant'
                size={28}
                color='#ffffff'
                onPress={() => logout()}
              />
            )
          })}
        />
        <ChatAppStack.Screen
          name='Room'
          component={RoomScreen}
          options={({ route }) => ({
            title: route.params.thread.name
          })}
        />
        <ChatAppStack.Screen
          name='AppDrawerScreen'
          component={AppDrawerScreen}
        />
      </ChatAppStack.Navigator>
    );
  }

  export default ChatAppScreen