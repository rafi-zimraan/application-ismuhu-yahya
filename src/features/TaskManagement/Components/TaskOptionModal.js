import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';

export default function TaskOptionModal({
  visible,
  onClose,
  onSelectOption,
  position,
}) {
  const options = ['Selesai', 'Edit', 'Delete'];
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFillObject}>
        <View style={[styles.modalBubble, position]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close-circle" size={24} color={COLORS.white} />
          </TouchableOpacity>
          {options.map((option, idx) => (
            <TouchableOpacity key={idx} onPress={() => onSelectOption(option)}>
              <Text style={styles.modalText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBubble: {
    position: 'absolute',
    backgroundColor: COLORS.blueLight,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

    gap: 15,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.white,
    paddingHorizontal: 8,
  },
  closeButton: {
    position: 'absolute',
    top: -31,
    right: -7,
    backgroundColor: COLORS.red,
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
});
