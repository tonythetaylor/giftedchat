import React, {useLayoutEffect, useEffect, useState, useContext } from 'react';
import { TextInput, TouchableOpacity, ToastAndroid, StatusBar, Keyboard, StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getRegion } from '../helpers/map';
import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import { auth, db, rootRef } from '../firebase';
import moment from 'moment';

import { AuthContext } from '../navigation/AuthProvider';


const MapScreen = () => {
  const [markers, setMarkers] = useState(null)
  const [messageText, setMessageText] = useState(null)
  const [messages, setMessages] = useState([])
  const [sendButtonActive, setSendButtonActive] = useState(false)

  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();

  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setMarkers({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      })
      map.animateToRegion(getRegion(location.coords.latitude, location.coords.longitude, 16000))
    }
  }

  const onChangeText = (messageText) => {
    setMessageText(messageText)
    setSendButtonActive(messageText.length > 0)
  }

  function onSendPress() {
    // console.warn('LOCATION', sendButtonActive, markers, messageText)
    if (sendButtonActive) {
      db
      .collection('MARKERS')
      // .doc(currentUser.uid)
      // .collection('MESSAGES')
      .add({
        createdBy: auth?.currentUser?.displayName,
        text: messageText,
        latitude: markers.location.latitude,
        longitude: markers.location.longitude,
        timestamp: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        }
      })
      // removing this for now since we're not navigating anywhere
      // .then(docRef => {
      //   docRef.collection('MESSAGES').add({
      //     text: `You have joined the event ${markers.messageText}.`,
      //     createdAt: new Date().getTime(),
      //     system: true
      //   });
      //   // navigation.navigate('Map');
      // })
      .then(() => {
        setMessageText(null)
      }).catch((error) => {
        console.log(error);
      });
  }
  }

  useEffect(() => {
    getLocation()
    const unsubscribe = db
    .collection('MARKERS')
    // .doc(currentUser.uid)
    // .collection('MESSAGES')
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => {
      const messages = querySnapshot.docs.map(documentSnapshot => {
        return {
          _id: documentSnapshot.id,
          // give defaults
          name: '',

          ...documentSnapshot.data()
        };
      });
      // const messages = querySnapshot.docs.map(doc => {
      //   const firebaseData = doc.data();
      //   console.warn('DOC ID', doc)
      //   const data = {
      //     _id: doc.id,
      //     name: '',
      //     createdAt: new Date().getTime(),
      //     ...firebaseData
      //   };

        // if (!firebaseData.system) {
        //   data.user = {
        //     ...firebaseData.user,
        //     createdBy: firebaseData.user.displayName
        //   };
        // }

      //   return data;
      // });

      setMessages(messages);

    });
    // console.warn('MESSAGES', messages)
  /**
   * unsubscribe listener
   */
  return () => unsubscribe();
}, []);
 
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here"
            onChangeText={messageText => onChangeText(messageText)}
            value={messageText}
          />
          <View style={{ ...styles.sendButton, ...(sendButtonActive ? styles.sendButtonActive : {}) }}>
            <TouchableOpacity onPress={() => onSendPress()}>
              <MaterialIcons name="send" size={32} color="#fe4027" />
            </TouchableOpacity>
          </View>
        </View>
        <MapView
          ref={(ref) => map = ref}
          style={styles.map}
          initialRegion={getRegion(39.147880, -77.297050, 160000)}
        >
          {messages.map((message, index) => {
            let { latitude, longitude, text, timestamp } = message;

            return (
              <Marker
                ref={(ref) => marker = ref}
                key={index}
                identifier={'marker_' + index}
                coordinate={{ latitude, longitude }}
              >
                <Callout>
                  <View>
                    <Text>{text}</Text>
                    <Text style={{ 'color': '#999' }}>{moment(timestamp).fromNow()}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })}
        </MapView>
      </View>
    );
  }

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  inputWrapper: {
    width: '100%',
    position: 'absolute',
    padding: 10,
    top: 10,
    left: 0,
    zIndex: 100
  },
  input: {
    height: 46,
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  sendButton: {
    position: 'absolute',
    top: 17,
    right: 20,
    opacity: 0.4
  },
  sendButtonActive: {
    opacity: 1
  }
});