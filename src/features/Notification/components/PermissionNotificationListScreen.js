import React, {useEffect, useState} from 'react';
import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  deleteNotification,
  getNotificationCategory,
  getNotificationDetail,
} from '..';
import {
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import Toast from 'react-native-toast-message';

export default function PermissionNotificationListScreen({route, navigation}) {
  const {category} = route.params;
  const {mode, colors} = useSelector(state => state.theme);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterOption, setFilterOption] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const filterOptions = [
    {label: 'Today', value: 'today'},
    {label: 'This Week', value: 'this_week'},
    {label: 'This Month', value: 'this_month'},
  ];

  const handleFilterSelect = value => {
    setIsLoadingFilter(true);
    setFilterOption(value);
    setDropdownVisible(false);
  };

  const filterNotificationsByOption = () => {
    setIsLoadingFilter(true);
    const filteredData = originalData.filter(item => {
      const notificationDate = new Date(item.created_at);
      if (filterOption === 'today') {
        const today = new Date();
        return notificationDate.toDateString() === today.toDateString();
      } else if (filterOption === 'this_week') {
        const today = new Date();
        const startOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay()),
        );
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        return notificationDate >= startOfWeek && notificationDate <= endOfWeek;
      } else if (filterOption === 'this_month') {
        const today = new Date();
        return (
          notificationDate.getMonth() === today.getMonth() &&
          notificationDate.getFullYear() === today.getFullYear()
        );
      }
      return true;
    });
    setData(filteredData);
    setTimeout(() => setIsLoadingFilter(false), 500);
  };

  const fetchCategoryNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotificationCategory(category);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.data) {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setOriginalData(sortedData);
        setData(sortedData);
      } else {
        setData([]);
      }
    } catch (error) {
      setOriginalData([]);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNotifications();
  }, [category]);

  useEffect(() => {
    if (filterOption) {
      filterNotificationsByOption();
    }
  }, [filterOption]);

  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;

    setIsDeleting(true);
    try {
      const success = await deleteNotification(selectedNotification);
      if (success) {
        setData(prevData =>
          prevData.filter(item => item.id !== selectedNotification),
        );
      }
    } catch (error) {
      console.log('Failed to delete notification', error);
    } finally {
      setIsDeleting(false);
      setModalVisible(false);
      setSelectedNotification(null);
    }
  };

  const openDeleteModal = id => {
    setSelectedNotification(id);
    setModalVisible(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchCategoryNotifications();
    } catch (error) {
      console.log('response api', error?.message || error);
    } finally {
      setRefreshing(false);
    }
  };

  const viewNotificationDetail = async id => {
    setIsLoadingFilter(true);
    try {
      const detail = await getNotificationDetail(id);
      navigation.navigate('PermissionDetailScreen', {
        notificationDetail: detail.data,
      });
    } catch (error) {
      showToast('Terjadi kesalahan saat memuat detail notification');
    } finally {
      setIsLoadingFilter(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={mode == 'light' ? 'default' : 'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.headerWrapper,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title={'Notifikasi Perizinan'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          style={styles.viewIconFilter}>
          <Icon name="dots-vertical" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        />
        <View style={styles.dropdownMenu}>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleFilterSelect(option.value)}>
              <Text style={styles.dropdownText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {loading ? (
            <View section={true} useBackgroundTransparent={true}>
              <Text style={styles.loadingText}>Sedang memuat data...</Text>
            </View>
          ) : data?.length > 0 ? (
            <>
              <Text style={styles.newNotificationText}>
                Notification Terbaru
              </Text>
              {data?.map((item, index) => (
                <View key={index} section={true} style={styles.viewCard}>
                  <TouchableOpacity
                    style={styles.notificationCard}
                    onPress={() => viewNotificationDetail(item?.id)}>
                    <View style={styles.titleSection} section={true}>
                      <Text style={styles.titleText}>{item?.title}</Text>
                      <Text
                        style={[
                          styles.dateText,
                          {color: colors[mode].textSectionDescSett},
                        ]}>
                        {new Date(item?.created_at).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.messageSection} section={true}>
                      <Text style={styles.messageText}>{item?.message}</Text>
                    </View>
                    <View style={styles.actionsSection} section={true}>
                      <View
                        style={styles.deleteButton}
                        useBackgroundDelete={true}>
                        <TouchableOpacity
                          onPress={() => openDeleteModal(item?.id)}>
                          <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.emptyText}>
              Tidak ada notifikasi untuk kategori ini.
            </Text>
          )}
        </ScrollView>
      </View>
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        buttonSubmit={handleDeleteNotification}
        buttonTitle="Hapus"
        buttonLoading={isDeleting}
        iconModalName="trash-can-outline"
        title="Hapus Notifikasi"
        description="Apakah Anda yakin ingin menghapus notifikasi ini?"
        ColorIcon={COLORS.red}
        TextDescription={COLORS.red}
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

      <ModalLoading
        visible={isLoadingFilter}
        onRequestClose={() => setIsLoadingFilter(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewIconFilter: {
    top: Platform.OS === 'ios' ? 0 : 26,
    right: 10,
  },
  dropdownMenu: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'android' ? 45 : 90,
    padding: 8,
  },
  dropdownText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    margin: 2,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  contentContainer: {
    padding: 15,
  },
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.grey,
    marginTop: 10,
    textAlign: 'center',
  },
  newNotificationText: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewCard: {
    borderRadius: 10,
    elevation: 4,
    padding: 15,
    margin: 5,
    shadowColor: COLORS.black,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 2},
  },
  notificationCard: {
    marginBottom: 5,
  },
  titleSection: {
    marginBottom: 3,
  },
  titleText: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: DIMENS.s,
    fontWeight: '400',
  },
  messageSection: {
    marginBottom: 2,
    marginTop: 3,
  },
  messageText: {
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    top: 10,
    paddingHorizontal: 9,
    borderRadius: 4,
    borderWidth: 1,
    padding: 2,
    borderColor: COLORS.softRed,
  },
  deleteText: {
    fontSize: DIMENS.s,
    color: COLORS.white,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: DIMENS.l,
  },
});
