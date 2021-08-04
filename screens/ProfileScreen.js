import React, { useEffect, useState} from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import { set } from 'react-native-reanimated';
import UploadImage from '../components/UploadImage'
import { auth, db, storage } from '../firebase';
import { Avatar } from 'react-native-elements';

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(auth?.currentUser?.photoURL)
  const [imageUrl, setImageUrl] = useState(undefined);
  const user = auth?.currentUser

  useEffect(() => {
    storage
      .ref(`users/${user.uid}/profile.jpg`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  }, []);

  // console.log('HMPH---->', imageUrl)
    return (
        <View style={styles.container}>
            {/* <UploadImage/> */}
            <Avatar
              size="xlarge"
              rounded
              source={!imageUrl ? require('../assets/profile.png') : {uri: imageUrl}}
            />
            {/* <Image
            source={{uri: imageUrl}}
          /> */}
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
