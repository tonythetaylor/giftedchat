import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../screens/Home';
// import Messages from '../screens/Messages';
import Profile from '../screens/ProfileScreen';
// import Cart from '../screens/Cart';
import StackNavigator from './StackNavigator';
import ChatScreen from '../screens/ChatScreen';
// import ChatApp from '../screens/ChatApp';
import { Ionicons } from '@expo/vector-icons';
import ThreadScreen from '../screens/ThreadScreen';
import HomeScreen from '../screens/HomeScreen';
const Tabs = createBottomTabNavigator();

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Thread':
        iconName = 'chatbubbles-outline';
        break;
      case 'Profile':
        iconName = 'person-circle-outline';
        break;
      default:
        break;
    }
  
    return <Ionicons name={iconName} color={color} size={24} />;
  };

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
    screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        // tabBarVisible: cameraVisibility(route)
      })}
    tabBarOptions={{
        activeTintColor: '#ffffff',
        style: {
          backgroundColor: '#000',
        },
      }}>
      <Tabs.Screen name="Home" component={StackNavigator} />
      {/* <Tabs.Screen name="Home" component={HomeScreen} /> */}

      <Tabs.Screen name="Thread" component={ThreadScreen} />
      {/* <Tabs.Screen name="ChatApp" component={ChatApp} /> */}
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};
export default TabsNavigator;