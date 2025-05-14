import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, DIMENS} from '../../utils';
import {IMG_LOGO} from '../../assets';

export const toastConfig = {
  info: ({text1}) => (
    <View style={styles.toastContainer}>
      <Image source={IMG_LOGO} style={styles.icon} />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.goldenOrange,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    color: COLORS.black,
    fontWeight: '600',
    fontSize: DIMENS.m,
  },
});
