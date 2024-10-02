import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

const Background = () => (
  <Image
    style={styles.bg}
    source={require('../../assets/background/yellowish-1.png')}
    resizeMethod="scale"
    fadeDuration={300}
  />
);

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: [{rotateY: '180deg'}],
  },
});

export default Background;
