import React, { useContext } from 'react'
import { View, Text, Alert} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { AuthContext } from '../navigation/AuthProvider';

const Drawer = createDrawerNavigator();

const Logout = (props) => {
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

export default Logout
