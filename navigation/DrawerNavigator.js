import React, { useContext } from 'react'
import { View, Text, Alert, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from './AuthProvider';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreadScreen from '../screens/ThreadScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { auth, db } from '../firebase';
import SettingsStack from './SettingsStack';
const Drawer = createDrawerNavigator();

const AppDrawerContent = (props) => {
  const { logout } = useContext(AuthContext);
  var currentUser = auth?.currentUser?.displayName
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#000'}}>
          {currentUser?.charAt(0).toUpperCase()}

          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>
          <Text>{auth?.currentUser?.displayName}</Text>
        </Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

    <DrawerContentScrollView {...props}>
        {/*all of the drawer items*/}
        <DrawerItemList {...props}/>
        <View >
          {/* here's where you put your logout drawer item*/}
          <DrawerItem 
            label={({color}) => 
            <Text style={{color: '#fff'}}>
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
      </View>
  )
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor:'#f2f3f4',
            inactiveTintColor:'#f8f8ff'}} 
          drawerContent={props=><AppDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />

          {/* <Drawer.Screen name="Thread" component={ThreadScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
  }

  const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      paddingTop: 40,
      color: 'white',
    },
    profileHeader: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: 15,
      textAlign: 'center',
    },
    profileHeaderPicCircle: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      color: 'white',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileHeaderText: {
      color: 'white',
      alignSelf: 'center',
      paddingHorizontal: 10,
      fontWeight: 'bold',
    },
    profileHeaderLine: {
      height: 1,
      marginHorizontal: 20,
      backgroundColor: '#e2e2e2',
      marginTop: 15,
    },
  });

export default DrawerNavigator
