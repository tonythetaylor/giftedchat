import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Camera } from "expo-camera";

export default function CameraAppScreen({navigation}) {
 const [hasPermission, setHasPermission] = useState(null);
 const [cameraRef, setCameraRef] = useState(null)
 const [type, setType] = useState(Camera.Constants.Type.back);

useEffect(() => {
  (async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  })();
 }, []);
 
if (hasPermission === null) {
 return <View />;
 }
 if (hasPermission === false) {
 return <Text>No access to camera</Text>;
 }
 return (
 <View style={styles.rootContainer}>
    <View style={styles.closeButtonContainer}>
        <Ionicons
          name='close'
          size={36}
          color='#fff'
          onPress={() => navigation.goBack()}
        />
    </View>
    <View style={styles.flipButtonContainer}>
        <Ionicons
            name='camera-reverse'
            size={36}
            color="#fff"
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
        />
    </View>
    <Camera 
        style={{ flex: 1 }} 
        type={type} 
        ref={ref => {
            setCameraRef(ref);
        }} autoFocus="on"
    >
    <View
        style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end"
    }}>
    {/* <IconButton
          icon='camera-reverse'
          size={36}
          color='#fff'
          onPress={() => navigation.goBack()}
        /> */}
    <TouchableOpacity 
        style={{alignSelf: "center", bottom:30}} 
        onPress={async() => {
            if(cameraRef){
                let photo = await cameraRef.takePictureAsync("photo");
                console.log("photo", photo);
                navigation.navigate("Image",{"photo":photo});
            }
        }}
    >
    <View style={{ 
        borderWidth: 2,
        borderRadius:"50%",
        borderColor: "white",
        height: 50,
        width:50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}
    >
    <View style={{
        borderWidth: 2,
        borderRadius:"50%",
        borderColor: "white",
        height: 40,
        width:40,
        backgroundColor: "white"}} 
    >
    </View>
    </View>
    </TouchableOpacity>
    </View>
 </Camera>
 </View>
 );
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 50,
      right: 10,
      zIndex: 1
    },
    flipButtonContainer: {
        position: 'absolute',
        bottom: 35,
        left: 10,
        zIndex: 1
      },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 24,
      marginBottom: 10
    },
    buttonLabel: {
      fontSize: 22
    }
  });