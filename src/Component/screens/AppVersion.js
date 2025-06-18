import React from 'react';
import {StyleSheet} from 'react-native';
import version from 'react-native-version-info';
import {COLORS} from '../../utils';
import Text from './Text';
import View from './View';

const AppVersion = () => {
  return (
    <View style={styles.container} section={true}>
      <Text style={styles.textVersion}>{version.appVersion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textVersion: {
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default AppVersion;
