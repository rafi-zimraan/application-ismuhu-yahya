import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {COLORS} from '../../utils';

export default function ButtonModal({
  onPress,
  loading,
  disabled,
  title = 'Button Title',
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.buttonAction}>
        {loading ? (
          <ActivityIndicator color={'black'} />
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>{title}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  buttonAction: {
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
    width: '100%',
    maxWidth: 200,
    height: 45,
    alignSelf: 'center',
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
