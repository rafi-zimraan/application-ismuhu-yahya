import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

export default function ButtonAuth({
  onPress,
  priority,
  loading,
  title,
  width = '80%',
  maxWidth = 480,
  disabled,
  color = COLORS.white,
  borderWidth = 0.7,
  borderColor = COLORS.primary,
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      background={COLORS.ripple}
      onPress={onPress}
      disabled={loading || disabled}>
      <View
        style={{
          ...styles.btnSubmit,
          backgroundColor:
            priority === 'primary' ? COLORS.goldenOrange : COLORS.white,
          width,
          maxWidth,
          borderWidth,
          borderColor,
        }}>
        {loading ? (
          <ActivityIndicator color={'white'} style={{height: '100%'}} />
        ) : (
          <Text style={{...styles.textSubmit, color}}>{title}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textSubmit: {
    fontWeight: 'bold',
    fontSize: DIMENS.l,
    textShadowRadius: 5,
    textShadowOffset: {
      height: 1,
      width: 1,
    },
  },
  btnSubmit: {
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
