import React, {useEffect, useState} from 'react';
import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../Component';
import {
  deleteNotification,
  getNotificationCategory,
  getNotificationDetail,
} from '../../features/Notification';
import {COLORS, DIMENS} from '../../utils';

export default function NotificationFromCategory({route, navigation}) {
  const {category} = route.params;
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
        const sortedData = response.data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setOriginalData(sortedData);
        setData(sortedData);
      } else {
        console.warn('Data notifikasi tidak valid:', response?.data);
        setData([]);
      }
    } catch (error) {
      console.log('Failed to fetch notifications by category', error);
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
      console.error('Failed to delete notification', error);
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
      console.error('response api', error?.message || error);
    } finally {
      setRefreshing(false);
    }
  };

  const viewNotificationDetail = async id => {
    setIsLoadingFilter(true);
    try {
      const detail = await getNotificationDetail(id);

      if (detail?.data) {
        navigation.navigate('NotificationDetail', {
          notificationDetail: detail.data,
        });
      } else {
        console.error('Detail not found for the provided ID:', id);
      }
    } catch (error) {
      console.error('Failed to fetch notification detail', error);
    } finally {
      setIsLoadingFilter(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={'Detail Notification'}
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
              style={styles.dropdownItem}
              onPress={() => handleFilterSelect(option.value)}>
              <Text style={styles.dropdownText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <Text style={styles.loadingText}>Sedang memuat data...</Text>
        ) : data?.length > 0 ? (
          <>
            <Text style={styles.newNotificationText}>Notification Terbaru</Text>
            {data?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.notificationCard}
                onPress={() => viewNotificationDetail(item?.id)}>
                <View style={styles.titleSection}>
                  <Text style={styles.titleText}>{item?.title}</Text>
                  <Text style={styles.dateText}>
                    {new Date(item?.created_at).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.messageSection}>
                  <Text style={styles.messageText}>{item?.message}</Text>
                </View>
                <View style={styles.actionsSection}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => openDeleteModal(item?.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text style={styles.emptyText}>
            Tidak ada notifikasi untuk kategori ini.
          </Text>
        )}
      </ScrollView>

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
    position: 'absolute',
    top: 48,
    right: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.black,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
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
    color: COLORS.black,
    marginBottom: 10,
  },
  notificationCard: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 4,
    padding: 15,
  },
  titleSection: {
    marginBottom: 3,
  },
  titleText: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  dateText: {
    fontSize: DIMENS.s,
    color: COLORS.grey,
  },
  messageSection: {
    marginBottom: 2,
    marginTop: 3,
  },
  messageText: {
    fontSize: DIMENS.m,
    color: COLORS.black,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: COLORS.redSoft,
    top: 10,
    padding: 4,
    borderRadius: 8,
  },
  deleteText: {
    fontSize: DIMENS.m,
    color: COLORS.red,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: DIMENS.l,
    color: COLORS.grey,
  },
});
