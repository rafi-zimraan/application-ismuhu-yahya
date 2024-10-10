import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../utils';

export default function PresenceEmployee() {
  return (
    <View style={styles.container}>
      <Text>hii</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
