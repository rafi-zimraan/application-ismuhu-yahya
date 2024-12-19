import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

const BGOnBoarding = () => (
  <Image
    style={styles.bg}
    source={require('../../../assets/onboarding/imgBgOnboard.png')}
    resizeMethod="scale"
    fadeDuration={300}
  />
);

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '110%',
    position: 'absolute',
  },
});

export default BGOnBoarding;
