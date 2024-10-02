import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ErrorGlobal({onPress}) {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontWeight: '500'}}>Terjadi Kesalahan</Text>
      <View style={{height: 10}} />
      <TouchableNativeFeedback useForeground onPress={onPress}>
        <View style={styles.btnContainer}>
          <Icon name="refresh" size={30} color={'black'} style={styles.icon} />
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
  btnContainer: {
    backgroundColor: 'white',
    elevation: 5,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
