import React, { useState, useContext, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Button
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Loader from '../components/Loading';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../navigation/AuthProvider';

export default function RegisterScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();

  const { register } = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('image picked' , result);
    
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#4c669f',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainBody}>
      {/* <StatusBar backgroundColor="aqua" barStyle="light-content" /> */}
      <LinearGradient
        // Background Linear Gradient
        colors={['#3eb489', '#3b5998', '#192f6a']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 3 }}
        style={styles.background}
      />
      { !register ? (<Loader loading={loading} />) : null}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/kikbacks-logo.png')}
            style={{
              width: '100%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
            <Button title="Choose a profile picture" style={styles.profilePicture} onPress={pickImage} />
            <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
            {image && <Image source={{ uri: image }} style={styles.profilePicture} />}
            </TouchableOpacity>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Username"
              placeholderTextColor="#dadae8"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#dadae8"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#dadae8"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => register(email, password, name, image)}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('Login')}>
            Already a user? Sign In!
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4c669f',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  buttonStyle: {
    backgroundColor: '#dadae8',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#29785B',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  profileContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 100
},
profilePicture: {
    width: 200, 
    height: 200,  
    borderRadius: 100
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
