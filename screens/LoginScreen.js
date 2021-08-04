import React, {useState, createRef, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Loader from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoadings] = useState(false);

  const passwordInputRef = createRef();

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.mainBody}>
    <StatusBar backgroundColor="aqua" barStyle="light-content" />
    <LinearGradient
      // Background Linear Gradient
      colors={['#3eb489', '#3b5998', '#192f6a']}
      start={{ x: 0, y: 0 }} end={{ x: 0, y: 3 }}
      style={styles.background}
    />
    {!login ? (
      <Loader loading={loading} />
    ) : null} 
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View>
        <KeyboardAvoidingView enabled>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/images/apptemplate.png')}
              style={{
                width: '100%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setEmail(UserEmail)
              }
              placeholder="Enter Email" //dummy@abc.com
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              placeholderTextColor="#dadae8"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setPassword(UserPassword)
              }
              placeholder="Enter Password" //12345
              placeholderTextColor="#dadae8"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
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
            onPress={() => login(email, password)}>
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('Register')}>
            New Here? Register
          </Text>
        </KeyboardAvoidingView>
      </View>
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
});

// import React, { useState, useEffect } from 'react'
// import { View, StyleSheet } from 'react-native'
// import { Input, Button } from 'react-native-elements'
// import { auth } from '../firebase';

// const LoginScreen = ({navigation}) => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const signIn = () => {
//         auth.signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             var errorMessage = error.message;
//             alert(errorMessage)
//         });

//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) {
//               // User is signed in, see docs for a list of available properties
//               // https://firebase.google.com/docs/reference/js/firebase.User
//               var uid = user.uid;
//               navigation.replace('Chat')
//             } else {
//               // User is signed out
//               navigation.canGoBack() &&
//               navigation.popToTop();
//               // ...
//             }
//           });
//         return unsubscribe
//     }, [])
//     return (
//         <View style={styles.container}>
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
//             <Button title="sign In" style={styles.button} onPress={signIn} />
//             <Button 
//                 title="register" 
//                 style={styles.button}
//                 onPress={() => navigation.navigate('Register')}/>
//         </View>
        
//     )
// }

// export default LoginScreen

// const styles = StyleSheet.create({
//     button: {
//         width: 200,
//         marginTop: 10
//     },
//     container : {
//         flex: 1,
//         alignItems: 'center',
//         padding: 10

//     }

// })
