import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';

const AbsenceStatusButton = ({title, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.button,
        {backgroundColor: isSelected ? COLORS.goldenOrange : COLORS.champagne},
      ]}
      onPress={onPress}>
      <Text
        style={{
          fontSize: DIMENS.l,
          fontWeight: '600',
          color: isSelected ? COLORS.white : COLORS.black,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    elevation: 7,
    height: 40,
    flex: 1,
  },
});

export default AbsenceStatusButton;
