import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBz50Wx9U9ZI_kebmGVbTj6_7pXnCtyYJ4",
    authDomain: "apptemplate-65013.firebaseapp.com",
    projectId: "apptemplate-65013",
    storageBucket: "apptemplate-65013.appspot.com",
    messagingSenderId: "963555762391",
    appId: "1:963555762391:web:582ffe13c6ec0369191092"
  };

  let app;
  if (firebase.apps.length === 0) {
      // Initialize Firebase
      app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app()
  }

  const db = app.firestore();
  const auth = firebase.auth();
  const rootRef = firebase.database();
  // Create a root reference
  const storage = firebase.storage();
  const storageRef = firebase.storage();
  // Create a folder reference
//   const folderRef = storageRef.child('images/');
  const folderRef = storageRef;

  const taskEvent = firebase.storage.TaskEvent.STATE_CHANGED

  export{db,auth, storageRef, storage, folderRef, taskEvent, rootRef }