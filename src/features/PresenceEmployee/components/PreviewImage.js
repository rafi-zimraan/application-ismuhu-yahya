import React from 'react';
import {Image, StyleSheet} from 'react-native';

const PreviewImage = ({source}) => {
  return <Image source={{uri: source}} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: '100%',
    resizeMode: 'contain', // Mengganti objectFit dengan resizeMode
    backgroundColor: 'black',
  },
});

export default PreviewImage;
