import React, { createContext, useState } from 'react';
import { auth } from '../firebase';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setName,
        setUser,
        login: async (email, password) => {
          try {
            await auth.signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, name) => {
          try {
            await auth.createUserWithEmailAndPassword(email, password)       
              .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // var name = userCredential.displayName;
                console.log(userCredential.displayName)
                // const filename = image.substring(image.lastIndexOf('/') + 1);
                // const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
                // const reference = storageRef.child('images/'+filename);
                // const task = reference.put(uploadUri, metadata).then((snapshot) => {
                //     console.log('Uploaded a blob or file! ********');
                // });;
                // try {
                    
                // } catch (e) {
                //     console.error(e);
                // }
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
        logout: async () => {
          try {
            await auth.signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};