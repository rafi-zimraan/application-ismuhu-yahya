import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteTraining,
  deleteTrainingFile,
  getTrainingFileList,
  updateTraining,
  uploadTrainingFile,
} from '..';
import {
  Background,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailTraining({route, navigation}) {
  const {data} = route.params;
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalDeleteFile, setModalDeleteFile] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [file, setFile] = useState(null);
  const [existingFiles, setExistingFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const [editedData, setEditedData] = useState({
    title: data.title,
    date: data.date,
    category: data.category,
    desc: data.desc,
    cost: data.cost,
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchExistingFiles = async () => {
        setIsModalLoading(true);
        try {
          const response = await getTrainingFileList(data.id);
          setExistingFiles(response.data || []);
        } catch (error) {
          console.log('Error fetching files:', error.message);
          setExistingFiles([]);
        } finally {
          setIsModalLoading(false);
        }
      };

      fetchExistingFiles();
    }, []),
  );

  const handleUpdate = async () => {
    try {
      const response = await updateTraining(data.id, editedData);

      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        ToastAndroid.show('Data berhasil diperbarui!', ToastAndroid.SHORT);
        setEditModalVisible(false);
      }
    } catch (error) {
      console.log('Error updating training:', error.message);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTraining(data.id);

      setIsDeleted(true);
      setDeleteModalVisible(false);
    } catch (error) {
      console.log('Error deleting training:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadData = async () => {
    setRefreshing(true);
    try {
      console.log('Data refreshed');
    } catch (error) {
      console.log('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleImageResponse = async response => {
    if (!response.didCancel && response.assets && response.assets[0]) {
      const {uri, fileName, type} = response.assets[0];

      if (uri && fileName && type) {
        setFile({uri, name: fileName, type});
        setFileType('image');
      } else {
        ToastAndroid.show('Data gambar tidak valid', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Gambar tidak dipilih', ToastAndroid.SHORT);
    }
  };

  const handleImagePicker = () => {
    const options = {quality: 0.5, mediaType: 'photo'};
    launchImageLibrary(options, handleImageResponse);
  };

  const openFileTypeModal = () => {
    Alert.alert(
      'Pilih Jenis File',
      '',
      [{text: 'Gambar', onPress: handleImagePicker}],
      {cancelable: true},
    );
  };

  useEffect(() => {
    if (file && fileType) {
      handleFileUpload();
    }
  }, [file, fileType]);

  const handleFileUpload = async () => {
    if (!file || !fileType) {
      ToastAndroid.show(
        'File atau tipe file belum tersedia',
        ToastAndroid.SHORT,
      );
      return;
    }
    setIsModalLoading(true);

    try {
      const idFileTraining = data.id;
      const response = await uploadTrainingFile(fileType, file, idFileTraining);

      if (response.message) {
        ToastAndroid.show('File berhasil diunggah!', ToastAndroid.SHORT);
        setExistingFiles(prevFiles => [
          ...prevFiles,
          {id: response.id, file: response.file},
        ]);
        setFile(null);
        setFileType(null);
        navigation.goBack();
      } else {
        ToastAndroid.show('Gagal upload file!', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Gagal mengunggah file!', ToastAndroid.SHORT);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    setIsModalLoading(true);
    try {
      await deleteTrainingFile(selectedFileId);
      setExistingFiles(prevFiles =>
        prevFiles.filter(file => file.id !== selectedFileId),
      );
      ToastAndroid.show('File berhasil dihapus!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Gagal menghapus file!', ToastAndroid.SHORT);
    } finally {
      setIsModalLoading(false);
      setModalDeleteFile(false);
      setSelectedFileId(null);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <ModalLoading visible={isModalLoading} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Pelatihan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadData}
            colors={['#ffd700']}
          />
        }
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {!isDeleted ? (
            <>
              <View style={styles.content}>
                <Text style={styles.title}>Detail Training</Text>
                <View style={styles.section}>
                  <Icon name="book" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Title</Text>
                    <Text style={styles.label}>{editedData.title || '-'}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="calendar" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Date</Text>
                    <Text style={styles.label}>{editedData.date || '-'}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon name="tag" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Category</Text>
                    <Text style={styles.label}>
                      {editedData.category || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="information-outline"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Description</Text>
                    <Text style={styles.label}>{editedData.desc || '-'}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="currency-usd"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Harga Pelatihan</Text>
                    <Text style={styles.label}>
                      {editedData.cost ? `Rp ${editedData.cost}` : '-'}
                    </Text>
                  </View>
                </View>
              </View>

              <Gap height={10} />
              {existingFiles?.map((file, index) => (
                <View key={index} style={styles.inputFieldContainerUploadFile}>
                  <Image
                    source={{uri: `https://app.simpondok.com/${file.file}`}}
                    style={{width: '100%', height: 150, borderRadius: 10}}
                    resizeMethod="resize"
                  />
                  <TouchableOpacity
                    style={styles.deleteIconWrapper}
                    onPress={() => {
                      setModalDeleteFile(true);
                      setSelectedFileId(file.id);
                    }}>
                    <Icon name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}

              <Gap height={10} />
              {file && fileType === 'image' && (
                <View style={styles.inputFieldContainerUploadFile}>
                  <Image
                    source={{uri: file.uri}}
                    style={{width: '100%', height: 150, borderRadius: 10}}
                    resizeMethod="resize"
                  />
                </View>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditModalVisible(true)}>
                  <Icon name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => setDeleteModalVisible(true)}>
                  <Icon name="delete" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={openFileTypeModal}>
                  <Icon name="upload" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <Image source={ICON_NOTFOUND_DATA} style={styles.notFoundImage} />
            </View>
          )}
        </View>
      </ScrollView>

      <ModalCustom
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        title="Edit Training"
        description="Silakan ubah data di bawah ini:"
        buttonSubmit={handleUpdate}
        buttonDisable={isLoading}
        buttonLoading={isLoading}
        buttonTitle="Simpan"
        ColorIcon={COLORS.goldenOrange}
        iconModalName="content-save-edit"
        BackgroundButtonAction={COLORS.goldenOrange}
        TextColorButton={COLORS.white}>
        <View>
          <Text style={styles.inputLabel}>Title</Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.title}
            placeholder="Title"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, title: text})}
          />
          <Text style={styles.inputLabel}>Date</Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.date}
            placeholder="Date"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, date: text})}
          />
          <Text style={styles.inputLabel}>Category</Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.category}
            placeholder="Category"
            placeholderTextColor={COLORS.grey}
            onChangeText={text =>
              setEditedData({...editedData, category: text})
            }
          />
          <Text style={styles.inputLabel}>Description</Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.desc}
            placeholder="Description"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, desc: text})}
          />
          <Text style={styles.inputLabel}>Harga Pelatihan</Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.cost?.toString()}
            keyboardType="numeric"
            placeholder="Harga Pelatihan"
            placeholderTextColor={COLORS.grey}
            onChangeText={text =>
              setEditedData({...editedData, cost: parseFloat(text) || 0})
            }
          />
        </View>
      </ModalCustom>

      {/* Modal Delete Data */}
      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Hapus Training"
        description="Apakah Anda yakin ingin menghapus data ini?"
        buttonSubmit={handleDelete}
        buttonDisable={isLoading}
        buttonLoading={isLoading}
        buttonTitle="Hapus"
        ColorIcon={COLORS.red}
        BackgroundButtonAction={COLORS.red}
        TextColorButton={COLORS.white}
      />

      {/* Modal Token kadaluarsa  */}
      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />

      {/* Modal Delete File */}
      <ModalCustom
        visible={modalDeleteFile}
        onRequestClose={() => setDeleteModalVisible(false)}
        title="Hapus File"
        description="Apakah Anda yakin ingin menghapus file ini?"
        iconModalName="alert-circle-outline"
        buttonSubmit={handleDeleteFile}
        buttonTitle="Hapus"
        BackgroundButtonAction={COLORS.red}
        TextColorButton={COLORS.white}
        ColorIcon={COLORS.red}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.red,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  inputFieldContainerUploadFile: {
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    alignItems: 'center',
    width: '100%',
    padding: 4,
    borderRadius: 15,
    elevation: 3,
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  content: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
    marginTop: 5,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 2,
  },
  viewContentText: {
    marginLeft: 15,
  },
  textTitle: {
    fontSize: DIMENS.m,
    color: '#999',
  },
  label: {
    fontSize: DIMENS.l,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  inputLabel: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
    marginTop: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    padding: 10,
    fontSize: DIMENS.m,
    marginBottom: 2,
    color: COLORS.black,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundImage: {
    width: 250,
    height: 250,
  },
});
