import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to chat</Title>
      <FormInput
        placeholder="Enter your name"
        labelName='Name'
        value={name}
        autoCapitalize='none'
        onChangeText={userEmail => setName(userEmail)}
      />
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <FormButton
        title='Signup'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={() => register(email, password, name)}
      />
      <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        color='#6646ee'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 18
  },
  navButton: {
    marginTop: 10
  }
});

// import React, { useState, useEffect } from 'react'
// import { StyleSheet, Image, TouchableOpacity, View, Platform } from 'react-native'
// import { Input, Button, Text } from 'react-native-elements'
// import * as ImagePicker from 'expo-image-picker';
// // import storage from '@react-native-firebase/storage';
// import { auth, storageRef, taskEvent } from '../firebase';

// const RegisterScreen = ({navigation}) => {
//     const [image, setImage] = useState(null);
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [uploading, setUploading] = useState('')
//     var metadata = {
//         contentType: 'image/jpeg',
//       };
//     const register = () => {
//         auth.createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in 
//             var user = userCredential.user;
//             // const filename = image.substring(image.lastIndexOf('/') + 1);
//             // const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
//             // const reference = storageRef.child('images/'+filename);
//             // const task = reference.put(uploadUri, metadata).then((snapshot) => {
//             //     console.log('Uploaded a blob or file! ********');
//             // });;
//             // try {
                
//             // } catch (e) {
//             //     console.error(e);
//             // }
//             user.updateProfile({
//                 displayName: name,
//                 photoURL: image? image:"https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"
//             }).then(() => {
//             // Update successful
//             uploadImage(image)
//             // ...
//             }).catch((error) => {
//             // An error occurred
//             // ...
//             });
//             navigation.popToTop();  
//         })
//         .catch((error) => {
//             var errorMessage = error.message;
//             alert(errorMessage)
//         });
//     }

//     const uploadImage = async () => {
//         const blob = await new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest();
//             xhr.onload = function() {
//               resolve(xhr.response);
//             };
//             xhr.onerror = function() {
//               reject(new TypeError('Network request failed'));
//             };
//             xhr.responseType = 'blob';
//             xhr.open('GET', image, true);
//             xhr.send(null);
//           });
//           const filename = image.substring(image.lastIndexOf('/') + 1);
//           const ref = storageRef.child(`avatars/${filename}`)
//           const snapshot = ref.put(blob)

//           snapshot.on(taskEvent, () => {
//               setUploading(true)
//           },
//           (error) => {
//             //   setUploading(false)
//               console.log(error)
//               blob.close()
//               return
//           },
//           () => {
//               snapshot.snapshot.ref.getDownloadURL().then((url) => {
//                 // setUploading(false)
//                 console.log('DOWNLAOD URL: ->', url)
//                 blob.close();
//                 return url;
//               })
//           })
//     }

//     useEffect(() => {
//         (async () => {
//           if (Platform.OS !== 'ios') {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== 'granted') {
//               alert('Sorry, we need camera roll permissions to make this work!');
//             }
//           }
//         })();
//       }, []);

//       const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.All,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
    
//         console.log(result);
        
//         if (!result.cancelled) {
//           setImage(result.uri);
//         }
//       };

//     return (
//         <View style={styles.container}>
//             {/* <Button title="Choose a profile picture" style={styles.profilePicture} onPress={pickImage} /> */}
//             <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
//             {image && <Image source={{ uri: image }} style={styles.profilePicture} />}
//             </TouchableOpacity>
//             <Input
//                 placeholder="Enter your name"
//                 label="Name"
//                 leftIcon={{
//                     type: 'material',
//                     name: 'person',
//                 }}
//                 value={name}
//                 onChangeText={text => setName(text)}
//             />
//             <Input
//                 placeholder="Enter your email"
//                 label="Email"
//                 leftIcon={{
//                     type: 'material',
//                     name: 'email',
//                 }}
//                 value={email}
//                 onChangeText={text => setEmail(text)}
//             />
//             <Input
//                 placeholder="Enter your password"
//                 label="Password"
//                 leftIcon={{
//                     type: 'material',
//                     name: 'lock',
//                 }}
//                 value={password}
//                 onChangeText={text => setPassword(text)}
//                 secureTextEntry
//             />
//             <Button title="register" style={styles.button} onPress={register}/>
//         </View>
        
//     )
// }

// export default RegisterScreen

// const styles = StyleSheet.create({
//     button: {
//         width: 200,
//         marginTop: 10
//     },
//     container : {
//         flex: 1,
//         alignItems: 'center',
//         padding: 10

//     },
//     profileContainer: {
//         width: 200,
//         height: 200,
//         borderWidth: 1,
//         borderRadius: 100
//     },
//     profilePicture: {
//         width: 200, 
//         height: 200,  
//         borderRadius: 100
//     }

// })
