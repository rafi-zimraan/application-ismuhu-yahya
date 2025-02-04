import {viewDocument} from '@react-native-documents/viewer';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  Image,
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

const UploadFileModal = ({
  visible,
  onClose,
  fileTitle,
  setFileTitle,
  fileType,
  setFileType,
  setFileUri,
  fileDescription,
  setFileDescription,
  handleFileUpload,
  handlePdfUpload,
  fileUri,
  loading,
}) => (
  <Modal visible={visible} transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {/* Icon silang untuk menutup modal */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color={COLORS.black} />
        </TouchableOpacity>
        {/* Body */}
        <Text style={styles.titleTxtUpload}>Upload File</Text>
        <TextInput
          placeholder="Judul File"
          value={fileTitle}
          onChangeText={setFileTitle}
          style={styles.input}
          placeholderTextColor={COLORS.grey}
        />
        <Picker
          selectedValue={fileType}
          style={styles.input}
          dropdownIconColor={COLORS.black}
          onValueChange={itemValue => {
            setFileType(itemValue);
            setFileUri(null);
          }}>
          <Picker.Item label="Pilih Tipe File" value="" />
          <Picker.Item label="PDF" value="pdf" />
          <Picker.Item label="Gambar" value="image" />
        </Picker>
        {fileType === 'image' && (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleFileUpload}>
            <Icon name="cloud-upload" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Pilih Gambar</Text>
          </TouchableOpacity>
        )}

        {fileType === 'pdf' && (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePdfUpload}>
            <Icon name="file-document" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Pilih PDF</Text>
          </TouchableOpacity>
        )}

        {fileUri && fileType === 'image' && (
          <Image source={{uri: fileUri.uri}} style={styles.previewImage} />
        )}

        {fileUri && fileType === 'pdf' && (
          <TouchableOpacity onPress={() => viewDocument({uri: fileUri.uri})}>
            <Text style={styles.fileText}>Buka PDF: {fileUri.name}</Text>
          </TouchableOpacity>
        )}
        <TextInput
          placeholder="Deskripsi (Opsional)"
          value={fileDescription}
          onChangeText={setFileDescription}
          placeholderTextColor={COLORS.grey}
          style={styles.input}
        />
        <ButtonAction title="Simpan" onPress={onClose} loading={loading} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  titleTxtUpload: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: '500',
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FF8A80',
    elevation: 2,
    borderColor: COLORS.black,
    borderWidth: 0.4,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 7,
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: COLORS.goldenOrange,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  fileText: {
    marginVertical: 10,
    color: COLORS.black,
  },
  previewImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default UploadFileModal;
