import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDetailTaskManagement} from '..';
import {Background, HeaderTransparent, ModalCustom} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

const screenWidth = Dimensions.get('window').width;
const columnWidth = screenWidth / 2 - 20;

export default function TaskDetailScreen({route, navigation}) {
  const {taskId} = route.params;
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchTaskDetail();
  }, []);

  const validateSession = async () => {
    try {
      const response = await FecthMe();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
    } catch (error) {
      console.log('Gagal melakukan validasi sesi:', error);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const fetchTaskDetail = async () => {
    setRefreshing(true);

    try {
      const response = await getDetailTaskManagement(taskId);
      if (response?.status) {
        setTaskDetail(response?.data);
      } else {
        console.log('Terjadi kesalahan fect data detail management');
      }
    } catch (error) {
      console.log('terjadi kelahan fecth data detail', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const showBrowserOptions = url => {
    setSelectedUrl(url);
    setModalVisible(true);
  };

  const openLink = async url => {
    let formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    await Linking.openURL(formattedUrl);
    setModalVisible(false);
  };

  const showImageModal = imageUrl => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Tugas Harian"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        {taskDetail?.addition_task === 1 && (
          <View style={styles.viewAdditionTask}>
            <Icon name="plus" size={24} color={COLORS.white} />
          </View>
        )}
      </View>

      <View style={{padding: 15}}>
        <View style={styles.detailContainer}>
          <Text style={styles.taskTitle}>{taskDetail?.activity}</Text>
          <Text style={styles.taskDate}>{taskDetail?.date}</Text>
        </View>

        <Text style={styles.sectionTitle}>File Terlampir</Text>
        {taskDetail?.files?.length > 0 ? (
          <FlatList
            data={taskDetail?.files}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchTaskDetail}
              />
            }
            keyExtractor={item => item.id.toString()}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.fileItem}
                onPress={() => showImageModal(item.file)}>
                {item?.file_type === 'image' ? (
                  <Image
                    source={{
                      uri: `https://app.simpondok.com/${item.file}`,
                    }}
                    style={styles.imageFile}
                    resizeMethod="resize"
                  />
                ) : (
                  <Icon name="file-pdf-box" size={40} color={COLORS.red} />
                )}
                <Text style={styles.fileTitle}>{item?.title}</Text>
                <Text style={styles.fileDesc}>{item?.desc}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Image source={ICON_NOTFOUND_DATA} style={styles.notFoundImage} />
            <Text style={styles.noDataText}>Data file belum tersedia</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Link Terkait</Text>
        {taskDetail?.links?.length > 0 ? (
          <FlatList
            data={taskDetail?.links}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.linkItem}
                onPress={() => showBrowserOptions(item?.url)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="link" size={20} color={COLORS.goldenOrange} />
                  <Text style={styles.linkTitle}>{item?.title}</Text>
                </View>
                <Text style={styles.linkTitle}>{item?.desc}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Image source={ICON_NOTFOUND_DATA} style={styles.notFoundImage} />
            <Text style={styles.noDataText}>Data link belum tersedia</Text>
          </View>
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Buka Link</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => openLink(selectedUrl)}>
              <Text style={styles.modalButtonText}>Buka di Browser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  modalButton: {
    width: '100%',
    padding: 13,
    alignItems: 'center',
    backgroundColor: COLORS.goldenOrange,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  modalButtonText: {
    fontSize: DIMENS.l,
    color: COLORS.white,
  },
  modalCancel: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    marginTop: 3,
  },
  modalCancelText: {
    fontSize: DIMENS.l,
    color: COLORS.red,
    fontWeight: 'bold',
  },
  fileDesc: {
    color: COLORS.mediumGrey,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  viewAdditionTask: {
    backgroundColor: COLORS.blueLight,
    borderRadius: 25,
    alignItems: 'center',
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
  detailContainer: {
    marginBottom: 15,
  },
  taskTitle: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  taskDate: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginVertical: 15,
    color: COLORS.black,
  },
  fileItem: {
    width: columnWidth,
    backgroundColor: COLORS.lightGrey,
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  imageFile: {
    width: '100%',
    height: 120,
    borderRadius: 5,
  },
  fileTitle: {
    fontSize: DIMENS.l,
    textAlign: 'left',
    fontWeight: '500',
    color: COLORS.black,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLORS.lightGrey,
    margin: 4,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  linkTitle: {
    fontSize: DIMENS.s,
    marginLeft: 5,
    color: COLORS.black,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  notFoundImage: {
    width: 150,
    height: 150,
  },
  noDataText: {
    fontSize: DIMENS.m,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginTop: 5,
  },
});
