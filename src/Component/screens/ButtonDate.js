import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {COLORS} from '../../utils';

export default function ButtonDate({onPress, title = 'Title'}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.viewButton}>
        <Text style={{color: 'black'}}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  viewButton: {
    borderRadius: 3,
    padding: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    elevation: 3,
  },
});
