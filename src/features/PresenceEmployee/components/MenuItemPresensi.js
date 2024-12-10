import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS} from '../../../utils';

export default function MenuItemPresensi({
  iconName,
  iconColor,
  label,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.contentMenu}
      onPress={onPress}>
      <View style={styles.bodyRequest}>
        <Icon name={iconName} color={iconColor} size={22} />
      </View>
      <Gap width={10} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  contentMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
    height: 69,
    borderRadius: 10,
    padding: 15,
  },
  bodyRequest: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  label: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '500',
  },
};
