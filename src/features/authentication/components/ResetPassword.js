import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, DIMENS} from '../../../utils';

export default function ResetPassword({onPress}) {
  return (
    <View style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.resetText}> Atur ulang disini!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    textAlign: 'center',
  },
  resetText: {
    color: COLORS.goldenOrange,
    fontWeight: '600',
    textAlign: 'center',
  },
});
