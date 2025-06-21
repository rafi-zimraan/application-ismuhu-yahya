import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

const BGOnBoardingThrid = () => (
  <Image
    style={styles.bg}
    source={require('../../../assets/onboarding/onBoard3.jpeg')}
    resizeMethod="resize"
    resizeMode="cover"
    fadeDuration={0}
  />
);

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '110%',
    position: 'absolute',
  },
});

export default BGOnBoardingThrid;
