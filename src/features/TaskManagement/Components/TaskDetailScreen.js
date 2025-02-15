import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  RefreshControl,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDetailTaskManagement} from '..';
import {
  Background,
  Gap,
  HeaderTransparent,
  ModalLoading,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

const screenWidth = Dimensions.get('window').width;

export default function TaskDetailScreen({route, navigation}) {
  const {taskId} = route.params;
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const showImageModal = imageUrl => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  useEffect(() => {
    fetchTaskDetail();
  }, []);

  const fetchTaskDetail = async () => {
    setRefreshing(true);
    try {
      const response = await getDetailTaskManagement(taskId);
      console.log('response detail ', response.data);
      if (response?.status) {
        setTaskDetail(response?.data);
      }
    } catch (error) {
      console.log('Error fetching task details:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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

  const openLink = async (url, browser) => {
    let formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      if (browser === 'default') {
        await Linking.openURL(formattedUrl);
      } else if (browser === 'chrome') {
        await Linking.openURL(
          `googlechrome://${formattedUrl.replace('https://', '')}`,
        );
      }
    } catch (err) {
      console.log('Gagal membuka link:', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Rencana Harian"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ModalLoading visible={loading} />

      <FlatList
        data={[]}
        keyExtractor={() => 'dummy'}
        ListHeaderComponent={
          <View style={styles.content}>
            <View style={styles.viewContentTitleAndDate}>
              <View style={styles.row}>
                <Icon
                  name={
                    taskDetail?.addition_task === '1'
                      ? 'calendar-plus-outline'
                      : 'calendar-check-outline'
                  }
                  size={20}
                  color={COLORS.goldenOrange}
                />
                <Text style={styles.sectionTitle}>Rencana</Text>
              </View>
              <Text style={styles.taskTitle}>
                {taskDetail?.addition_task === '1'
                  ? 'Rencana Tambahan'
                  : 'Bukan Rencana Tambahan'}
              </Text>

              <Gap height={3} />

              <View style={styles.row}>
                <Icon
                  name="clipboard-text-outline"
                  size={20}
                  color={COLORS.goldenOrange}
                />
                <Text style={styles.sectionTitle}>Aktivitas</Text>
              </View>
              <Text style={styles.taskTitle}>{taskDetail?.activity}</Text>

              <Gap height={3} />
              <View style={styles.row}>
                <Icon
                  name="shape-outline"
                  size={20}
                  color={COLORS.goldenOrange}
                />
                <Text style={styles.sectionTitle}>Kategori</Text>
              </View>
              <Text style={styles.taskCategory}>
                {taskDetail?.category === 'planned'
                  ? 'Terencana'
                  : 'Tidak Terencana'}
              </Text>

              <Gap height={3} />
              <View style={styles.row}>
                <Icon
                  name="calendar-month-outline"
                  size={20}
                  color={COLORS.goldenOrange}
                />
                <Text style={styles.sectionTitle}>Tanggal</Text>
              </View>
              <Text style={styles.taskDate}>{taskDetail?.date}</Text>
            </View>

            <Gap height={15} />
            <View style={styles.filesContainer}>
              <View style={styles.attachmentsTitleWrapper}>
                <Text style={styles.sectionTitle}>Media Visual</Text>
              </View>

              <Gap height={5} />
              {taskDetail?.files?.some(file => file.file_type === 'image') ? (
                <FlatList
                  data={taskDetail?.files.filter(
                    file => file.file_type === 'image',
                  )}
                  horizontal
                  nestedScrollEnabled={true}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.fileItem}
                      onPress={() => showImageModal(item.file)}>
                      <Image
                        source={{uri: `https://app.simpondok.com/${item.file}`}}
                        style={styles.imageFile}
                        resizeMethod="resize"
                      />
                      <Text style={styles.fileTitle}>
                        {item?.title || 'Tanpa Judul'}
                      </Text>
                      <Text style={styles.fileDesc}>
                        {item?.desc || 'Tidak ada deskripsi'}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Image
                    source={ICON_NOTFOUND_DATA}
                    style={styles.notFoundImage}
                  />
                  <Text style={styles.noDataText}>
                    Tidak ada media visual tersedia
                  </Text>
                </View>
              )}
            </View>

            <Gap height={15} />
            <View style={styles.filesContainer}>
              <View style={styles.attachmentsTitleWrapper}>
                <Text style={styles.sectionTitle}>Dokumen PDF</Text>
              </View>
              <Gap height={5} />
              {taskDetail?.files?.some(file => file.file_type === 'pdf') ? (
                <FlatList
                  data={taskDetail?.files.filter(
                    file => file.file_type === 'pdf',
                  )}
                  horizontal
                  nestedScrollEnabled={true}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.fileItem}
                      onPress={() => openPDF(item)}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name="file-pdf-box"
                          size={40}
                          color={COLORS.red}
                        />
                        <Text style={styles.fileTitle}>
                          {item?.title || 'Tanpa Judul'}
                        </Text>
                      </View>
                      <Text style={styles.fileDesc}>
                        {item?.desc || 'Tidak ada deskripsi'}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Image
                    source={ICON_NOTFOUND_DATA}
                    style={styles.notFoundImage}
                  />
                  <Text style={styles.noDataText}>
                    Tidak ada dokumen PDF tersedia
                  </Text>
                </View>
              )}
            </View>

            <Gap height={15} />
            <View style={styles.attachmentsContainer}>
              <View style={styles.attachmentsTitleWrapper}>
                <Text style={styles.sectionTitle}>Lampiran</Text>
              </View>
              <Gap height={5} />
              {taskDetail?.links?.length > 0 ? (
                <FlatList
                  data={taskDetail?.links}
                  keyExtractor={item => item.id.toString()}
                  nestedScrollEnabled={true}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.attachmentItem}
                      onPress={() => openLink(item.url, 'default')}>
                      <Icon
                        name={'link'}
                        size={30}
                        color={COLORS.goldenOrange}
                      />
                      <View style={{marginLeft: 5}}>
                        <Text style={styles.fileTitle}>
                          {item?.title || 'Tanpa Judul'}
                        </Text>
                        <Text style={styles.fileDesc}>
                          {item?.desc || 'Tidak ada deskripsi'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Image
                    source={ICON_NOTFOUND_DATA}
                    style={styles.notFoundImage}
                  />
                  <Text style={styles.noDataText}>
                    Tidak ada tautan tersedia
                  </Text>
                </View>
              )}
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTaskDetail} />
        }
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

const styles = {
  LoadingText: {
    color: COLORS.black,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  viewLoadingData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 2,
  },
  fullscreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  fullscreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  attachmentsContainer: {
    backgroundColor: COLORS.white,
    elevation: 3,
    borderColor: COLORS.black,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 15,
  },
  attachmentsTitleWrapper: {
    backgroundColor: COLORS.paleGrey,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 0.4,
  },
  filesContainer: {
    backgroundColor: COLORS.white,
    elevation: 3,
    borderColor: COLORS.black,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 15,
  },
  noDataContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  notFoundImage: {
    width: 150,
    height: 150,
  },
  noDataText: {
    fontSize: DIMENS.m,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginTop: -25,
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
  content: {
    padding: 10,
  },
  viewContentTitleAndDate: {
    backgroundColor: COLORS.white,
    elevation: 3,
    borderColor: COLORS.black,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: DIMENS.m,
    fontWeight: 'bold',
    color: COLORS.mediumGrey,
  },
  taskDate: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.mediumGrey,
  },
  fileItem: {
    width: screenWidth / 2 - 15,
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 5,
    margin: 5,
    elevation: 1,
    borderColor: COLORS.black,
    borderWidth: 0.2,
  },
  imageFile: {
    width: '100%',
    height: 180,
    borderRadius: 5,
    borderColor: COLORS.black,
    borderWidth: 0.3,
  },
  fileTitle: {
    fontSize: DIMENS.l,
    color: COLORS.black,
    textAlign: 'left',
  },
  fileDesc: {
    fontSize: DIMENS.xs,
    color: COLORS.mediumGrey,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'left',
  },
  taskCategory: {
    fontSize: DIMENS.m,
    color: COLORS.mediumGrey,
    fontWeight: '500',
  },
};
