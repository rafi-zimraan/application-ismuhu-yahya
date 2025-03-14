import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function ExitAppModal({
  isVisible,
  onCancel,
  onConfirm,
  loading,
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          Apakah kamu yakin untuk keluar dari SIMPONDOK?
        </Text>
        <Text style={styles.modalDescription}>
          Setelah keluar, kamu harus memasukkan kembali informasi login kamu
          untuk menggunakan layanan simpondok
        </Text>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Batalkan</Text>
        </TouchableOpacity>
        <Gap height={15} />
        <TouchableOpacity
          style={[styles.exitButton, loading && styles.disabledButton]}
          onPress={onConfirm}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.exitButtonText}>Keluar</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: COLORS.black,
  },
  modalDescription: {
    fontSize: DIMENS.md,
    marginBottom: 20,
    textAlign: 'left',
    color: COLORS.grey,
  },
  cancelButton: {
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.goldenOrange,
    padding: 13,
    borderRadius: 35,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: COLORS.grey,
    fontSize: DIMENS.l,
  },
  exitButton: {
    marginHorizontal: 15,
    backgroundColor: COLORS.goldenOrange,
    padding: 13,
    borderRadius: 35,
  },
  exitButtonText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: DIMENS.l,
  },
});
