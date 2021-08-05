import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, Image, StyleSheet, SafeAreaView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';
import { auth, db, storage } from '../firebase';
import ImageFilters, { Presets } from 'react-native-gl-image-filters';
import filters from '../utils/filters';
const AddPostScreen = ({navigation}) => {
    // useStatsBar('dark-content');
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { uploadPost } = useContext(AuthContext);
    const user = auth?.currentUser
  
    useEffect(() => {
        getPermission();
      }, []);
    
      const getPictureBlob = (uri) => {
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
    
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          // console.warn(imageUri)
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });


        return blob
      };

      const getPermission = async () => {
        if (Platform.OS !== 'ios') {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };
      
    /**
     * Create a new Firestore collection to save threads
     */
     const onSubmit = async () => {
       let blob
        try {
          blob = await getPictureBlob(image);
          setImage(image)
          const post = {
            photo: image,
            title: title,
            description: description
          }
          uploadPost(image, title, description)
    
          setImage(null)
          setTitle('')
          setDescription('')
        } catch (e) {
          console.error(e)
        }
      }

    //   function selectImage() {
    //     const options = {
    //       noData: true
    //     }
    //     ImagePicker.launchImageLibrary(options, response => {
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker')
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error)
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton)
    //       } else {
    //         const source = { uri: response.uri }
    //         console.log(source)
    //         setImage({image: source})
    //       }
    //     })
    //   }

      const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 60 }}>
            {image ? (
              <Image  {...Presets.StinsonPreset}
                source={{ uri: image}}
                style={{ width: '100%', height: 300 }}
              />
            ) : (
              <Button
                onPress={selectImage}
                style={{
                  alignItems: 'center',
                  padding: 10,
                  margin: 30,
                }}
                color="#841584"
                mode='contained'
                >
                  Add an image
                </Button>
            )}
            
          <View style={{ flex: 2, marginTop: 80, alignItems: 'center' }}>
            <Text category='h4'>Post Details</Text>
            <TextInput
              placeholder='Give it some details'
              style={{ margin: 20 }}
              value={title}
              onChangeText={(title) => setTitle(title)}
            />
            <TextInput
              placeholder='Enter description'
              style={{ margin: 20 }}
              value={description}
              onChangeText={(description) => setDescription (description)}
            />
            <Button 
              status='success' 
              mode='contained'
              onPress={onSubmit}>
                Add post
            </Button>
          </View>
        </SafeAreaView>
      )
  }

  export default  AddPostScreen