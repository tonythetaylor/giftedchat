import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to Chat app</Title>
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
        title='Login'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={() => login(email, password)}
      />
      <FormButton
        title='New user? Join here'
        modeValue='text'
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate('Register')}
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
    fontSize: 16
  }
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
