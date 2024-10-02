import React from 'react';
import {StyleSheet, View} from 'react-native';

function Line({
  borderWidth = StyleSheet.hairlineWidth,
  borderColor,
  maxWidth,
  width,
  opacity,
  marginHorizontal,
  marginVertical,
  margin,
  height,
  flex,
  alignSelf,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
}) {
  return (
    <View
      style={{
        borderWidth,
        borderColor,
        maxWidth,
        width,
        opacity,
        marginLeft,
        marginRight,
        marginBottom,
        marginTop,
        marginHorizontal,
        marginVertical,
        margin,
        height,
        flex,
        alignSelf,
      }}
    />
  );
}

export default Line;
