import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonAction} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

const UploadLinkModal = ({
  visible,
  onClose,
  linkTitle,
  setLinkTitle,
  linkUrl,
  setLinkUrl,
  linkDescription,
  setLinkDescription,
}) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleTxtUpload}>Upload Link</Text>
        <TextInput
          placeholder="Judul Tautan"
          value={linkTitle}
          onChangeText={setLinkTitle}
          placeholderTextColor={COLORS.grey}
          style={styles.input}
        />
        <TextInput
          placeholder="Tautan / URL"
          value={linkUrl}
          onChangeText={setLinkUrl}
          placeholderTextColor={COLORS.grey}
          style={styles.input}
        />
        <TextInput
          placeholder="Deskripsi"
          value={linkDescription}
          onChangeText={setLinkDescription}
          placeholderTextColor={COLORS.grey}
          style={styles.input}
        />
        <ButtonAction title="Simpan" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  titleTxtUpload: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default UploadLinkModal;
