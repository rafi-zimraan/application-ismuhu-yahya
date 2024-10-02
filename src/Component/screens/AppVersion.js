import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import version from 'react-native-version-info';

const AppVersion = () => {
  return <Text style={styles.textVersion}>{version.appVersion}</Text>;
};

const styles = StyleSheet.create({
  textVersion: {
    color: 'grey',
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
  },
});

export default AppVersion;
