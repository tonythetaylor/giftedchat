import React, {useContext } from 'react';
import { View, Text, Alert, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';


import { auth, db } from '../firebase';

import { AuthContext } from './AuthProvider';

// import ChatApp from '../screens/ChatApp';
import AddRoomScreen from '../screens/AddRoomScreen';
import RoomScreen from '../screens/RoomScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
// import ChatScreen from '../screens/ChatScreen';
import ThreadScreen from '../screens/ThreadScreen';


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
const ChatAppStack = createStackNavigator();

function ChatApp() {
  const { logout } = useContext(AuthContext);

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}
    >
      <ChatAppStack.Screen
        name='Thread'
        component={ThreadScreen}
        options={({ navigation }) => ({
          title: 'Threads',
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
              icon='menu'
              size={28}
              color='#ffffff'
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
        })}
      />
      <ChatAppStack.Screen
        name='Room'
        component={RoomScreen}
        options={({ route }) => ({
          title: route.params.thread.name,
          headerBackTitleVisible: false,
        })}
      />
    </ChatAppStack.Navigator>
  );
}

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator 
    mode='modal' 
    headerMode='none'
    screenOptions={{
        headerStyle: {
          backgroundColor: '#000'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}>
    <ModalStack.Screen 
        name='ChatApp' 
        component={ChatApp}
        options={({ navigation }) => ({
            title: 'Thread',
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
                icon='menu'
                size={28}
                color='#ffffff'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            )
          })}
    />
    <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
    <ModalStack.Screen
        name='Room'
        component={RoomScreen}
        options={({ route }) => ({
          title: route.params.thread.name
        })}
      />
  </ModalStack.Navigator>
);

const ActionsStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ActionsStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontSize: 22
    }
  }}>
    <ActionsStack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={28}
                color='#ffffff'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            )
        })}
   
        />
        <ActionsStack.Screen 
        name="Threads" 
        component={ThreadScreen}
        options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={28}
                color='#ffffff'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            )
        })}
   
        />
    {/* <ActionsStack.Screen name="ActionDetails" component={ActionDetails} /> */}
  </ActionsStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontSize: 22
    }
  }}>
    <SettingsStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={28}
                color='#ffffff'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            )
        })}
   
        />
    {/* <ActionsStack.Screen name="ActionDetails" component={ActionDetails} /> */}
  </SettingsStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontSize: 22
    }
  }}>
    <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={28}
                color='#ffffff'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            ),
            headerRight: () => (
                <IconButton
                  icon='message-plus'
                  size={28}
                  color='#ffffff'
                  onPress={() => navigation.navigate('AddRoom')}
                />
              )
        })}
   
        />
    {/* <ActionsStack.Screen name="ActionDetails" component={ActionDetails} /> */}
  </HomeStack.Navigator>
);

const MapStack = createStackNavigator();
const MapStackScreen = () => (
  <MapStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontSize: 22
    }
  }}>
    <MapStack.Screen 
        name="Map" 
        component={MapScreen}
        options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={28}
                color='#ffffff'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            ),
            headerRight: () => (
                <IconButton
                  icon='message-plus'
                  size={28}
                  color='#ffffff'
                  onPress={() => navigation.navigate('AddRoom')}
                />
              )
        })}
   
        />
  </MapStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator 
  tabBarOptions={{
    activeTintColor: '#ffffff',
    style: {
      backgroundColor: '#000',
    },
  }}>
      <AppTabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons
            name="home"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons
            name="map"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTabs.Screen
      name="Threads"
      component={ModalStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="people" size={props.size} color={props.color} />
        ),
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
              icon='menu'
              size={28}
              color='#ffffff'
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
      }}
    />
    <AppTabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons
            name="person-circle-outline"
            size={props.size}
            color={props.color}
          />
        )
      }}
    />
  </AppTabs.Navigator>
);

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator
  drawerContentOptions={{
    activeTintColor:'#f2f3f4',
    inactiveTintColor:'#f8f8ff'}} 
  drawerContent={props=><AppDrawerContent {...props} />}
    drawerPosition="right"
    screenOptions={{
        headerStyle: {
          backgroundColor: '#000'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}>
    <AppDrawer.Screen
      name="Tabs"
      component={AppTabsScreen}
    //   options={{ drawerLabel: 'Home' }}
      options={({ navigation }) => ({
        title: 'Home',
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
            icon='menu'
            size={28}
            color='#ffffff'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        )
      })}
      
    />
    <AppDrawer.Screen
      name="Settings"
      component={SettingsStackScreen}
    //   options={{
    //     gestureEnabled: false,
    //   }}

      
    />

  </AppDrawer.Navigator>
);

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

export default AppDrawerScreen


