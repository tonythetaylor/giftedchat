import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import RoomScreen from '../screens/RoomScreen';
import { AuthContext } from './AuthProvider';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerNavigator from './DrawerNavigator';
import StackNavigator from './StackNavigator';
import TabsNavigator from './TabsNavigator';
import ChatApp from '../screens/ChatApp';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();
/**
 * All chat app related screens
 */

// function ChatApp() {
//   const { logout } = useContext(AuthContext);

//   return (
//     <ChatAppStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#000'
//         },
//         headerTintColor: '#ffffff',
//         headerTitleStyle: {
//           fontSize: 22
//         }
//       }}
//     >
//       <ChatAppStack.Screen
//         name='Home'
//         component={TabsNavigator}
//         options={({ navigation }) => ({
//           title: 'Chat App',
//           headerRight: () => (
//             <IconButton
//               icon='message-plus'
//               size={28}
//               color='#ffffff'
//               onPress={() => navigation.navigate('AddRoom')}
//             />
//           ),
//           headerLeft: () => (
//             <IconButton
//               icon='menu'
//               size={28}
//               color='#ffffff'
//               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//             />
//           )
//         })}
//       />
//       <ChatAppStack.Screen
//         name='Room'
//         component={RoomScreen}
//         options={({ route }) => ({
//           title: route.params.thread.name
//         })}
//       />
//     </ChatAppStack.Navigator>
//   );
// }

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      {/* <ModalStack.Screen name='Home' component={HomeScreen} /> */}
      <ModalStack.Screen name='ChatApp' component={ChatApp} />
      <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
}