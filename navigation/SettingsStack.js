import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthProvider';
import { IconButton } from 'react-native-paper';

import SettingsScreen from '../screens/SettingsScreen';
const Settings = createStackNavigator();
function SettingsStack() {
    const { logout } = useContext(AuthContext);
  
    return (
      <Settings.Navigator
      initialRouteName='Home'
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: '#000'
        //   },
        //   headerTintColor: '#ffffff',
        //   headerTitleStyle: {
        //     fontSize: 22
        //   }
        // }}
      >
        <Settings.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarVisible: false,
          }}
          
          
        //   options={({ navigation }) => ({
        //     headerShown: false,
        //     headerRight: () => (
        //       <IconButton
        //         icon='message-plus'
        //         size={28}
        //         color='#ffffff'
        //         onPress={() => navigation.navigate('AddRoom')}
        //       />
        //     ),
        //     headerLeft: () => (
        //       <IconButton
        //         icon='menu'
        //         size={28}
        //         color='#ffffff'
        //         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        //       />
        //     )
        //   })}
        />
      </Settings.Navigator>
    );
  }
// const SettingsStack = () => {
//     return (
//         <View>
//             <Text></Text>
//         </View>
//     )
// }

export default SettingsStack
