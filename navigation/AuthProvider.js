import React, { createContext, useState, useEffect } from 'react';
import { auth, storage, db} from '../firebase';
import Loader from '../components/Loading';
import {
  View,

} from 'react-native';
import uuid from 'react-native-uuid';
/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [imageUri, setImageUri] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null)
  const [errortext, setErrortext] = useState('');
  const [postURL, setPostURL] = useState('')

  const getPictureBlob = async (uri, user) => {
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    const ref = storage.ref(`users/${user.uid}/profile.jpg`);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL().then(downloadURL => {
      user.updateProfile({ photoURL: downloadURL })
     });
  
    // We're done with the blob, close and release it
    blob.close();
  
    return remoteUri
  };

  const getPostsBlob = async (uri, id) => {
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    const ref = storage.ref(`posts/${id}/${filename}`);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL()
  
    // We're done with the blob, close and release it
    blob.close();
  
    return remoteUri
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setName,
        setUser,
        login: async (email, password) => {
          setErrortext('');
            if (!email) {
              alert('Please fill Email');
              return;
            }
            if (!password) {
              alert('Please fill Password');
              return;
            }
          try {
            await auth.signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, name, image) => {
          let blob;
          console.warn('DAMN IMAGE: ', image)
          try {
            await auth.createUserWithEmailAndPassword(email, password)       
              .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // var name = userCredential.displayName;
                console.log(userCredential.displayName)
                const filename = image.substring(image.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
                const remoteUri = getPictureBlob(image, user);
                // console.warn('setting blob', remoteUri)
                setImageUri(remoteUri)

                // console.warn('should be set: ', imageUri)
                user.updateProfile({
                    displayName: name,
                }).then(() => {
                  console.log(user)

                // Update successful
                // uploadImage(image)
                // ...
                }).catch((error) => {
                // An error occurred
                // ...
                });
                // navigation.popToTop();  
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
          } catch (e) {
            console.log(e);
          }
        },
        profile: async () => {
          try {
            
          } catch (error) {
            
          }
        },
        logout: async () => {
          try {
            await auth.signOut();
          } catch (e) {
            console.error(e);
          }
        },
        uploadPost: async (photo, title, description) => {
          let blob
          try {
            const id = uuid.v4()
            const user = auth?.currentUser
            // const ref = storage.ref(`posts/${id}`);
            // const snapshot = await ref.put(photo);
            // const remoteUri = await snapshot.ref.getDownloadURL()
            const downloadURL = getPostsBlob(photo, id)
            setPostURL(downloadURL)
            console.warn(postURL)
            // getPostsBlob(photo, id)
            const uploadData = {
              id: id,
              postPhoto: postURL,
              postTitle: title,
              postDescription: description,
              createdAt: new Date().getTime(),
              likes: [],
              displayName: auth?.currentUser?.displayName,
              avatar: auth?.currentUser?.photoURL
            }

          return db.collection('posts')
            .doc(id)
            .set(uploadData)
          } catch (error) {
            console.error(error);
          }
        },
        getPosts: () => {
          try {
            return db.collection('posts')
            .orderBy('createdAt', 'desc')
            .get()
            .then(function(querySnapshot) {
              let posts = querySnapshot.docs.map(doc => doc.data())
              // console.log(posts)
              return posts
            })
            .catch(function(error) {
              console.log('Error getting documents: ', error)
            })
          } catch (error) {
            console.log(error)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};