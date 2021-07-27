import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import UploadImage from '../components/UploadImage'

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <UploadImage/>
            <Text style={{marginVertical:20,fontSize:16}}>Profile Screen</Text>
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
