import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';

export default function FloatingButton({
  message,
  iconName = 'home-account',
  onPress,
  disabled,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {message && (
        <View style={[styles.containerTextAbsolute]}>
          <Text style={{fontSize: 11, color: 'black'}}>{message}</Text>
        </View>
      )}
      <TouchableNativeFeedback
        useForeground
        onPress={onPress}
        disabled={disabled}>
        <View style={[styles.btnAbsolute]}>
          <Icon name={iconName} size={30} color="white" style={styles.icon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnAbsolute: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: COLORS.icon,
    elevation: 3,
    overflow: 'hidden',
  },
  containerTextAbsolute: {
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: '#FFF',
    marginRight: 5,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
    right: 25,
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
