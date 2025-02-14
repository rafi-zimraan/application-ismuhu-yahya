import {pick, types} from '@react-native-documents/picker';
import {viewDocument} from '@react-native-documents/viewer';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addFileTaskManagement} from '..';
import {ButtonAction, Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function UploadFileModal({
  visible,
  onClose,
  selectedTaskId,
  setSelectedTaskId,
  fetchTasks,
}) {
  const [fileTitle, setFileTitle] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileUri, setFileUri] = useState(null);
  const [fileDescription, setFileDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setFileTitle('');
      setFileType('');
      setFileUri(null);
      setFileDescription('');
    }
  }, [visible]);

  const pickPDFDocument = async () => {
    try {
      const result = await pick({
        mode: 'open',
        type: [types.pdf],
      });
      if (result && result[0]) {
        const pdfFile = {
          uri: result[0].uri,
          name: result[0].name,
          type: 'application/pdf',
        };
        setFileUri(pdfFile);
        setFileType('pdf');
      }
    } catch (error) {
      ToastAndroid.show('Gagal memilih file PDF', ToastAndroid.SHORT);
    }
  };

  const handleUploadImage = async () => {
    const options = {quality: 0.5, mediaType: 'photo'};
    Alert.alert('Pilih sumber gambar', '', [
      {
        text: 'Kamera',
        onPress: async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            launchCamera(options, response => {
              const imageFile = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              };
              setFileUri(imageFile);
              setFileType('image');
            });
          } else {
            ToastAndroid.show('Izin kamera ditolak', ToastAndroid.SHORT);
          }
        },
      },
      {
        text: 'Galeri',
        onPress: () => {
          launchImageLibrary(options, response => {
            if (!response.didCancel && !response.error) {
              const imageFile = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              };
              setFileUri(imageFile);
              setFileType('image');
            }
          });
        },
      },
      {
        text: 'Batal',
        style: 'cancel',
      },
    ]);
  };

  const handleUploadFile = async () => {
    if (!selectedTaskId) {
      ToastAndroid.show('ID tugas tidak ditemukan!', ToastAndroid.SHORT);
      return;
    }

    if (!fileTitle.trim()) {
      ToastAndroid.show('Judul file tidak boleh kosong!', ToastAndroid.SHORT);
      return;
    }

    if (!fileType) {
      ToastAndroid.show('Pilih tipe file!', ToastAndroid.SHORT);
      return;
    }

    if (!fileUri) {
      ToastAndroid.show('File harus dipilih!', ToastAndroid.SHORT);
      return;
    }

    setIsUploading(true);

    try {
      const response = await addFileTaskManagement(
        selectedTaskId,
        fileTitle,
        fileType,
        fileUri,
        fileDescription,
      );
      if (response?.status) {
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        setFileTitle('');
        setFileType('');
        setFileDescription('');
        setFileUri(null);
        if (typeof selectedTaskId === 'function') {
          setSelectedTaskId(null);
        }
        onClose();
        fetchTasks();
      } else {
        ToastAndroid.show(
          'Gagal menambahkan file rencana harian, Silahkan hubungi developer',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('Gagal uplaod file', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.titleTxtUpload}>Upload File</Text>
          <TextInput
            placeholder="Judul File"
            value={fileTitle}
            onChangeText={setFileTitle}
            style={styles.input}
            placeholderTextColor={COLORS.grey}
          />
          <Gap height={5} />
          <View
            style={[
              styles.pickerContainer,
              fileType && {backgroundColor: COLORS.lightGrey},
            ]}>
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
          </View>

          {fileType === 'image' && (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadImage}>
              <Icon name="cloud-upload" size={20} color={COLORS.black} />
              <Text style={styles.buttonText}>Pilih Gambar</Text>
            </TouchableOpacity>
          )}

          {fileType === 'pdf' && (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickPDFDocument}>
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
          <Gap height={5} />
          <ButtonAction
            title="Simpan"
            onPress={handleUploadFile}
            loading={isUploading}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 0.4,
    borderColor: COLORS.black,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.white,
  },
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
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.softRed,
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
