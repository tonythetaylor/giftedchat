import React from 'react'
import { View, Text } from 'react-native'

const AddMarkerScreen = () => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default AddMarkerScreen


// import React, { useState, useEffect }  from 'react'
// import { StyleSheet, Dimensions, TouchableOpacity, Alert, Text, View } from 'react-native';
// // import { Text, View } from '../components/Themed';
// import MapView,  { Marker, Callout, CalloutSubview }  from 'react-native-maps';
// import { FontAwesome } from '@expo/vector-icons'; 
// import * as Location  from 'expo-location'
// import { auth, db } from '../firebase';
// import {
//   GiftedChat,
//   Bubble,
//   Send,
//   SystemMessage
// } from 'react-native-gifted-chat';
// // import CustomCallout from './CustomCallout';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 29.9990674;
// const LONGITUDE = -90.0852767;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const SPACE = 0.01;

// const MapScreen = ({ route }) => {
//   console.warn('THE ROUTE: ', route)
//   const [location, setLocation] = useState(null)
//   const [errorMsg, setErrorMsg] = useState(null)
//   const [messages, setMessages] = useState([]);
//   const { marker } = route.params;
//   const { user } = useContext(AuthContext);
//   const currentUser = user.toJSON();

//   async function handleSend(messages) {
//     const text = messages[0].text;

//     db
//       .collection('MARKERS')
//       .doc(marker._id)
//       .collection('MESSAGES')
//       .add({
//         text,
//         createdAt: new Date().getTime(),
//         user: {
//           _id: currentUser.uid,
//           email: currentUser.email,
//           displayName: currentUser.displayName
//         },
//         location
//       });

//     await db
//       .collection('MARKERS')
//       .doc(marker._id)
//       .set(
//         {
//           latestMessage: {
//             text,
//             createdAt: new Date().getTime()
//           }
//         },
//         { merge: true }
//       );
//   }

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS === 'android' && !Constants.isDevice) {
//         setErrorMsg(
//           'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
//         );
//         return;
//       }
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const markers = {location:location.coords, messages}
//       setLocation(markers);
//     })();
//     const messagesListener = db
//     .collection('MARKERS')
//     .doc(marker._id)
//     .collection('MESSAGES')
//     .orderBy('createdAt', 'desc')
//     .onSnapshot(querySnapshot => {
//       const messages = querySnapshot.docs.map(doc => {
//         const firebaseData = doc.data();

//         const data = {
//           _id: doc.id,
//           text: '',
//           createdAt: new Date().getTime(),
//           ...firebaseData
//         };

//         if (!firebaseData.system) {
//           data.user = {
//             ...firebaseData.user,
//             name: firebaseData.user.displayName
//           };
//         }

//         return data;
//       });
//       setMessages(messages);
//     });
//         // Stop listening for updates whenever the component unmounts
//         return () => messagesListener();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }


//   function renderSend(props) {
//     return (
//       <Send {...props}>
//         <View style={styles.sendingContainer}>
//           <IconButton icon='send-circle' size={32} color='#6646ee' />
//         </View>
//       </Send>
//     );
//   }

//   return (
//       <View>
//           <Text style={styles.heading}>Map</Text>
//           <MapView style={styles.map}>
//               {location ? (
//                   <Marker coordinate={location.location} title={location.message} >
//                       <FontAwesome name="map-map" size={40} color="#B12A5B" />
//                   </Marker>
//               ):
//                   <Text>{errorMsg}</Text>
//               }
//           </MapView>
//           <GiftedChat
//             messages={messages}
//             onSend={handleSend}
//             user={{ _id: currentUser.uid }}
//             placeholder='Type your message here...'
//             alwaysShowSend
//             showUserAvatar
//             scrollToBottom
//             renderBubble={renderBubble}
//             renderLoading={renderLoading}
//             renderSend={renderSend}
//             scrollToBottomComponent={scrollToBottomComponent}
//             renderSystemMessage={renderSystemMessage}
//           />
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//       width: Dimensions.get('screen').width,
//       height: Dimensions.get('screen').height * 0.90,
//   },
//   heading: {
//       alignSelf: 'center',
//       paddingTop: 20,
//       marginBottom: 10,
//       fontSize: 24
//   },
// });