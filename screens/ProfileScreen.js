import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import UploadImage from '../components/UploadImage'
import { auth, db } from '../firebase';

const ProfileScreen = ({ navigation }) => {
  console.log(auth?.currentUser?.displayName)

    return (
        <View style={styles.container}>
            <UploadImage/>
            <Text style={{marginVertical:20,fontSize:16}}>{auth?.currentUser?.displayName}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      padding:50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ProfileScreen
