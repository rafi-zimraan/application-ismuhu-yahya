import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS} from '../../utils';

export default function ModalLoading({
  children,
  visible,
  onRequestClose,
  onOutContentPress,
  absoluteChildren,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}>
      <StatusBar backgroundColor={COLORS.blackDark} />
      <Pressable onPress={onOutContentPress} style={styles.pressable} />
      <View style={styles.alignment}>
        {children ? (
          children
        ) : (
          <View style={styles.container}>
            <ActivityIndicator color={COLORS.primary_dark} size="large" />
          </View>
        )}
      </View>
      {absoluteChildren}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    maxWidth: 480,
    borderRadius: 25,
    elevation: 3,
    width: 125,
    height: 125,
    justifyContent: 'center',
  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pressable: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: COLORS.blackDark,
  },
});
