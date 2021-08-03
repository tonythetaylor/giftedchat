import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import uuid from 'react-native-uuid';
import ImagesList from '../components/ImageList';
import { auth, db, storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () =>  {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== 'ios') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const getPictureBlob = (uri) => {
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });
  };

  const uploadImageToBucket = async () => {
    let blob;
    try {
      setUploading(true);
      blob = await getPictureBlob(imageUri);

      const ref = await storage.ref().child(uuid.v4());
    //   const ref = await storageRef.ref.child(uuid.v4());
      const snapshot = await ref.put(blob);

      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      alert(e.message);
    } finally {
      blob.close();
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      <Button title='Choose picture' onPress={pickImage} />

      {uploading ? (
        <ActivityIndicator />
      ) : (
        <Button title='Upload' onPress={uploadImageToBucket} />
      )}

      <ImagesList />
    </SafeAreaView>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});