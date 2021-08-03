import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ListImageItem = ({ uri }) => {
  return <Image source={{ uri }} style={styles.image} />;
};

export default ListImageItem;

const styles = StyleSheet.create({
  image: {
    marginBottom: 3,
    width: 100,
    height: 100,
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20,
    },
  },
});