import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';

function ButtonRefresh({onPress, width = 45, height = 45, iconSize = 30}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={{...styles.container, width: width, height: height}}>
        <Icon name="refresh" size={iconSize} color="black" />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 45 / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ButtonRefresh;
