import React from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils';

export default function StatusPresensi({iconColor, iconName, label}) {
  return (
    <TouchableNativeFeedback useForeground background={COLORS.ripple}>
      <View style={styles.btnCarStatus}>
        <View style={styles.body}>
          <Icon
            color={iconColor}
            style={styles.icon}
            name={iconName}
            size={40}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = {
  body: {
    width: 130,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCarStatus: {
    backgroundColor: COLORS.white,
    elevation: 5,
    width: 140,
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 5,
    opacity: 0.2,
  },
  label: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
};
