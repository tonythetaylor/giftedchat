import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { storage } from '../firebase';
import ListImageItem from './ListImageItem';

const ImagesList = () => {
  const [urlsUploadedImages, setURLsUploadedImages] = useState(null);

  useEffect(() => {
    setURLsToFilesInBucket();
  }, []);

  const setURLsToFilesInBucket = async () => {
    const imageRefs = await storage.ref().listAll();
    const urls = await Promise.all(
      imageRefs.items.map((ref) => ref.getDownloadURL())
    );
    setURLsUploadedImages(urls);
  };

  return (
    <FlatList
      style={styles.container}
      data={urlsUploadedImages}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <ListImageItem uri={item} />}
    />
  );
};

export default ImagesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});