import moment from 'moment';
import React from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export function MonthSelectorModal({
  visible,
  selectedMonth,
  onClose,
  onSelect,
  colors,
  mode,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalWrapper}>
        <View
          style={[styles.modalBox, {backgroundColor: colors[mode].background}]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {Array.from({length: 12}, (_, i) => {
            const month = moment().month(i).format('MMMM');
            return (
              <TouchableOpacity
                key={month}
                style={[
                  styles.modalItem,
                  month === selectedMonth && styles.selectedModalItem,
                ]}
                onPress={() => {
                  onSelect(month);
                  onClose();
                }}>
                <Text
                  style={[
                    styles.modalText,
                    month === selectedMonth && styles.selectedModalText,
                  ]}>
                  {month}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -50,
    right: 0,
    zIndex: 1,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    width: 30,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: DIMENS.xxxxxl,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  modalItem: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedModalItem: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
  },
  modalText: {
    fontSize: DIMENS.l,
    fontWeight: '400',
  },
  selectedModalText: {
    fontSize: DIMENS.xl,
    color: COLORS.turquoiseGreen,
    fontWeight: 'bold',
  },
});
