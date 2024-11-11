import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../utils';

export default function ButtonStatus({status}) {
  const getStatusHistory = () => {
    switch (status) {
      case 'Cancel':
        return styles.cancel;
      case 'Submit':
        return styles.submit;
      case 'Success':
        return styles.success;
      default:
        return {};
    }
  };

  const getColorStatus = () => {
    switch (status) {
      case 'Cancel':
        return {color: COLORS.red};
      case 'Submit':
        return {color: COLORS.blue};
      case 'Success':
        return {color: COLORS.greenSoft};
      default:
        return {color: COLORS.black};
    }
  };

  return (
    <View style={{alignSelf: 'flex-end'}}>
      <View style={[styles.containerStatus, getStatusHistory()]}>
        <Text style={[styles.txtStatus, getColorStatus()]}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  success: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.greenSoft,
  },
  submit: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.blue,
  },
  cancel: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.red,
  },
  txtStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  containerStatus: {
    right: 0,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderRadius: 7,
    padding: 5,
    elevation: 5,
    width: 70,
    borderWidth: 0.6,
  },
});
