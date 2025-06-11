import React from 'react';
import {StyleSheet, Text} from 'react-native';
import version from 'react-native-version-info';
import {COLORS} from '../../utils';

const AppVersion = () => {
  return <Text style={styles.textVersion}>{version.appVersion}</Text>;
};

const styles = StyleSheet.create({
  textVersion: {
    color: COLORS.black,
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },
});

export default AppVersion;
