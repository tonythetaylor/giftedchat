import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View ,Image, Button, ActivityIndicator, Platform } from"react-native";
import { auth, db, storage } from '../firebase';
import uuid from 'react-native-uuid';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ImageScreen({ route, navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const { photo } = route.params;

 const getPictureBlob = (uri) => {
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      // console.warn(imageUri)
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });
  };

  const uploadImageToBucket = async () => {
    let blob;
    try {
      setUploading(true);
      blob = await getPictureBlob(imageUri);

      const ref = await storage.ref().child(uuid.v4());
    //   const ref = await storageRef.ref.child(uuid.v4());
      const snapshot = await ref.put(blob);
      
      switch (snapshot.state) {
        case 'running':
          setImageUri(null);
          break;
        case 'success':
            await sendPushNotification(expoPushToken);
            navigation.push('Feed'); 
            return await snapshot.ref.getDownloadURL();
          break;
        default:
          break;
      }
      setImageUri(null);
      // return await snapshot.ref.getDownloadURL();
    } catch (e) {
      alert(e.message);
    } finally {
      blob.close();
      setUploading(false);
    }
  };

  useEffect(() => {
    setImageUri(photo.uri);
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])
 
 return (
 <View style={{ flex: 1, alignItems:"center",justifyContent:"center" }}>
    <Image source={{ uri: photo.uri }} style={{width:380,height:550}}/>
    {uploading ? (
        <ActivityIndicator />
      ) : (
        <Button title='Upload' onPress={uploadImageToBucket} />
      )}
    {/* <Button title='Upload' onPress={uploadImageToBucket} /> */}

    <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
 </View>
 );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Post uploaded succesfully',
    // body: 'And here is the body!',
    // data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}