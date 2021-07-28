import React from 'react'
import { Header } from 'react-native-elements'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import HamburgerMenu from './HamburgerMenu'
import { Button } from './Button';

const CustomHeader = ({ onLeftPress, leftText, onRightPress, rightText }) => {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={onLeftPress}>
      <Text style={styles.linkText}>{leftText}</Text>
    </TouchableOpacity>
    <Button onPress={onRightPress} text={rightText} />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
    },
    linkText: {
      color: '#1ca1f2',
      fontSize: 22,
      marginLeft: 5,
    },
  });
export default CustomHeader