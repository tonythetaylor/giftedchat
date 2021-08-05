import React, { useEffect, useState} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { set } from 'react-native-reanimated';
import UploadImage from '../components/UploadImage'
import { auth, db, storage } from '../firebase';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

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
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1}}>
              <Avatar
                size="large"
                rounded
                source={!imageUrl ? require('../assets/profile.png') : {uri: imageUrl}}
              />
            </View>
            <View style={{flex: 3}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{alignContent: 'center'}}>
                  <Text>20</Text>
                  <Text style={{fontSize: 10, color: 'grey'}}>posts</Text>
                </View>
                <View style={{alignContent: 'center'}}>
                  <Text>206</Text>
                  <Text style={{fontSize: 10, color: 'grey'}}>followers</Text>
                </View>
                <View style={{alignContent: 'center'}}>
                  <Text>167</Text>
                  <Text style={{fontSize: 10, color: 'grey'}}>following</Text>
                </View>
              </View>
              { user ? (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}> 
                  <Button 
                  mode="outlined"
                  labelStyle={{ fontSize: 10, color: '#3eb489' }}
                    style={{
                      flex: 3, 
                      marginLeft: 30,
                      justifyContent:'center',
                      height: 30,
                      top: 10, 
                      borderColor: '#3eb489',
                      borderWidth: 1
                    }}
                    title="Settings"
                    onPress={() => navigation.navigate('Edit Profile')}
                    >Settings</Button>
                  <Button
                    style={{
                      flex: 1, 
                      marginRight: 10,
                      marginLeft: 5,
                      justifyContent:'center',
                      
                    }}
                    onPress={() => navigation.navigate('Settings')}>
                      <Ionicons 
                    name='settings'
                    size={25}
                    color='#3eb489'
                  />
                  </Button>
                
              </View>

              ): null}
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={{fontWeight: 'bold'}}>{user.displayName}</Text>
            <Text>{`Dabble in code & design`}</Text>
            <Text>www.taylortheory.com</Text>
          </View>
          <View style={styles.contentContainer}>
            <Ionicons name='image' size={40} color='#3eb489' ></Ionicons>
            <Ionicons name='list' size={40} color='#3eb489'></Ionicons>
            <Ionicons name='calendar' size={40} color='#3eb489'></Ionicons>
          </View>
            <View style={styles.steelBlueContainer} >
              <Text> Content goes here</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    bioContainer: {
      flex: .50,
      paddingBottom: 10, 
      paddingHorizontal: 10,
      padding: 10,
      backgroundColor: 'white',
      height: 10,
      borderTopWidth: 1,
      borderTopColor: '#3eb489',
      borderBottomWidth: 1,
      borderBottomColor: '#3eb489'
    },
    contentContainer: {
      flex: .30,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    steelBlueContainer: {
      flex: 4,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#3eb489',
      borderLeftWidth: 1,
      borderLeftColor: '#3eb489',
      borderRightWidth: 1,
      borderRightColor: '#3eb489',
    },
  });

export default ProfileScreen
