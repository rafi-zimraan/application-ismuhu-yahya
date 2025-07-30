import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils';
import {IMG_APPLICATION} from '../../assets';

const BottomSheetUpdate = ({
  isVisible,
  onClose,
  onUpdate,
  updatedAt = '29 Juni 2025',
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.6}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <Icon name="close" size={24} color={COLORS.grey} />
        </TouchableOpacity>

        <Image
          source={IMG_APPLICATION}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Update available</Text>
        <Text style={styles.description}>
          Untuk menggunakan aplikasi ini, harap perbarui ke versi terbaru. Kamu
          tetap bisa menggunakan aplikasi sambil mengunduh pembaruan.
        </Text>

        <View style={styles.whatsNewContainer}>
          <Text style={styles.whatsNewLabel}>Terakhir diperbarui</Text>
          <Text style={styles.whatsNewValue}>{updatedAt}</Text>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={onUpdate}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  whatsNewContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  whatsNewLabel: {
    fontSize: 13,
    color: COLORS.grey,
  },
  whatsNewValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: COLORS.goldenOrange,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BottomSheetUpdate;
