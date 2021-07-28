import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView from 'react-native-maps';

const HomeScreen = () => {
  return (
    <View  style={styles.container}>
      <Text>The home screen</Text>
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

export default HomeScreen
