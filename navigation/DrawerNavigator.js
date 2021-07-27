import React, { useContext } from 'react'
import { View, Text, Alert} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from './AuthProvider';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const AppDrawerContent = (props) => {
  const { logout } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
        {/*all of the drawer items*/}
        <DrawerItemList {...props}/>
        <View >
          {/* here's where you put your logout drawer item*/}
          <DrawerItem 
            label={({color}) => 
            <Text style={{color: '#6646ee'}}>
              Logout
            </Text>}
            options={{ drawerLabel: "Log Out"}}
            onPress={() => {
              // props.navigation.toggleDrawer();
              Alert.alert(
                'Logout',
                'Are you sure? You want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {logout()},
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </View>
      </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props=><AppDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
  }

export default DrawerNavigator
