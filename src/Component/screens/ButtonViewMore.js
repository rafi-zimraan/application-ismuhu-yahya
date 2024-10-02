import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';

export default function ButtonViewMore({
  onPress,
  icon = 'chevron-right',
  title = 'Lihat Selengkapnya',
  backgroundColor = COLORS.primary,
  elevation = 3,
  position,
  bottom,
}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View
        style={{
          ...styles.view,
          backgroundColor,
          elevation,
          position,
          bottom,
        }}>
        <Text style={styles.text}>{title}</Text>
        <View style={{width: 5}} />
        <Icon name={icon} size={27} color="black" />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
  view: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 2.5,
    paddingLeft: 17.5,
    paddingRight: 7.5,
    borderRadius: 3,
  },
});
