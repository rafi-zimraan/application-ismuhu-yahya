import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteFileTaskManagement, getFilesTaskManagement} from '..';
import {
  Background,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

const screenWidth = Dimensions.get('window').width;
const columnWidth = screenWidth / 2 - 20;

export default function FilesScreen({route, navigation}) {
  const {taskId} = route.params;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const showImageModal = imageUrl => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  const fetchData = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await FecthMe();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }
      const fileResponse = await getFilesTaskManagement(taskId);
      if (fileResponse?.status && fileResponse?.data?.files) {
        setFiles(fileResponse.data.files);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.log('Gagal mengambil data file !', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [taskId]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const confirmDelete = fileId => {
    setSelectedFileId(fileId);
    setDeleteModalVisible(true);
  };

  const handleDeleteTask = async () => {
    if (!selectedFileId) return;
    setIsDeleting(true);
    try {
      const response = await deleteFileTaskManagement(selectedFileId);

      if (response) {
        setFiles(files.filter(file => file.id !== selectedFileId));
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
    }
  };

  const openPDF = async file => {
    try {
      let fileUri;

      if (file?.uri && file.uri.startsWith('content://')) {
        fileUri = file.uri;
      } else if (file?.file) {
        fileUri = `https://app.simpondok.com/${file.file}`;
      } else {
        throw new Error('File tidak memiliki url yang valid');
      }

      const supported = await Linking.openURL(fileUri);
      if (supported) {
        await Linking.openURL(fileUri);
      } else {
        ToastAndroid.show(
          'Tidak ada aplikasi untuk membuka PDF',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show('Terjadi kesalahan membuka PDF', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={'Data File'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 10, flex: 1}}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.goldenOrange} />
        ) : files.length === 0 ? (
          <View style={styles.contentNotFound}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={{height: 250, width: 230}}
            />
          </View>
        ) : (
          <FlatList
            data={files}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
            renderItem={({item}) => (
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => confirmDelete(item.id)}>
                  <Icon name="close-circle" size={24} color="red" />
                </TouchableOpacity>

                {item?.file_type === 'image' ? (
                  <TouchableOpacity onPress={() => showImageModal(item?.file)}>
                    <Image
                      source={
                        item.file
                          ? {
                              uri: `https://app.simpondok.com/${item.file}`,
                            }
                          : ICON_NOTFOUND_DATA
                      }
                      resizeMethod="resize"
                      style={styles.image}
                    />
                  </TouchableOpacity>
                ) : item?.file_type === 'pdf' ? (
                  <View style={styles.pdfWrapper}>
                    <View style={styles.pdfContainer}>
                      <Text style={styles.pdfText}>📄 PDF: {item.title}</Text>
                      <Gap height={10} />
                      <TouchableOpacity
                        style={styles.openPdfButton}
                        onPress={() => openPDF(item)}>
                        <Text style={styles.openPdfButtonText}>Buka PDF</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.unknownFileText}>
                    Format file tidak dikenal
                  </Text>
                )}
              </View>
            )}
          />
        )}
      </View>

      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        title="Hapus Rencana Harian"
        description="Apakah Anda yakin ingin menghapus rencana ini?"
        iconModalName="delete-outline"
        ColorIcon={COLORS.red}
        BackgroundButtonAction={COLORS.red}
        buttonTitle="Hapus"
        TextColorButton={COLORS.white}
        buttonSubmit={handleDeleteTask}
        buttonDisable={false}
        buttonLoading={isDeleting}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />

      <Modal visible={imageModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setImageModalVisible(false)}>
            <Icon name="close-circle" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullscreenImageContainer}
            onPress={() => setImageModalVisible(false)}>
            <Image
              source={{
                uri: `https://app.simpondok.com/${selectedImage}`,
              }}
              style={styles.fullscreenImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteIcon: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 2,
    backgroundColor: 'rgba(173, 216, 230, 0.6)',
    borderRadius: 50,
    padding: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  fullscreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  openPdfButton: {
    backgroundColor: COLORS.blue,
    padding: 3,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 3,
    alignItems: 'center',
  },
  openPdfButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  contentNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  },
  card: {
    width: columnWidth,
    backgroundColor: COLORS.lightGrey,
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 4,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  fileTitle: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'left',
    marginTop: 5,
    maxWidth: 140,
  },
  pdfWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  pdfContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    width: columnWidth - 10,
  },
  pdfText: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  unknownFileText: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
});
