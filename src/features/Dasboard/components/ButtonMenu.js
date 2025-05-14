import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';

export default function ButtonMenu({
  onPress,
  iconName,
  iconSize,
  title,
  image,
  color = COLORS.white,
  backgroundColor = COLORS.white,
  height,
  width,
  mode,
  colors,
}) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        useForeground
        background={COLORS.ripple}
        onPress={onPress}>
        <View style={{...styles.viewButton, backgroundColor, height, width}}>
          {image && <Image source={image} style={styles.image} />}
          {iconName && <Icon name={iconName} size={iconSize} color={color} />}
        </View>
      </TouchableNativeFeedback>
      <Text
        style={[styles.textTitle, {color: colors[mode].text}]}
        numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 47.5,
    height: 47.5,
    marginBottom: 2.5,
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLORS.goldenOrange,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    width: 58,
    height: 58,
  },
  textTitle: {
    fontWeight: '500',
    fontSize: DIMENS.s,
    top: 2,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 70,
  },
});
