import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });

    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              navigation.replace('Chat')
            } else {
              // User is signed out
              navigation.canGoBack() &&
              navigation.popToTop();
              // ...
            }
          });
        return unsubscribe
    }, [])
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{
                    type: 'material',
                    name: 'email',
                }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{
                    type: 'material',
                    name: 'lock',
                }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title="sign In" style={styles.button} onPress={signIn} />
            <Button 
                title="register" 
                style={styles.button}
                onPress={() => navigation.navigate('Register')}/>
        </View>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container : {
        flex: 1,
        alignItems: 'center',
        padding: 10

    }

})
