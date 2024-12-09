import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {COLORS} from '../../utils';

export default function NotificationFromCategory({route, navigation}) {
  const {category} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);

  // Fungsi untuk menyortir notifikasi berdasarkan waktu (paling baru di atas)
  const sortNotifications = notifications => {
    return notifications.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  };

  // Fetch notifications by category
  const fetchCategoryNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotificationCategory(category);
      console.log('response fetch', response.data);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.data) {
        // Sort the notifications before setting the state
        const sortedData = sortNotifications(response.data);
        setData(sortedData);
      } else {
        console.warn('Data notifikasi tidak valid:', response?.data);
        setData([]);
      }
    } catch (error) {
      console.error('Failed to fetch notifications by category', error);
      setData([]); // Fallback ke array kosong
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNotifications();
  }, [category]);

  // Handle notification deletion
  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;

    setIsDeleting(true);
    try {
      const success = await deleteNotification(selectedNotification);
      if (success) {
        setData(prevData =>
          prevData.filter(item => item.id !== selectedNotification),
        );
        console.log('Notifikasi berhasil dihapus');
      }
    } catch (error) {
      console.error('Failed to delete notification', error);
    } finally {
      setIsDeleting(false);
      setModalVisible(false);
      setSelectedNotification(null);
    }
  };

  // Open confirmation modal
  const openDeleteModal = id => {
    setSelectedNotification(id);
    setModalVisible(true);
  };

  // Refresh notifications
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

  // Navigate to detail notification
  const viewNotificationDetail = async id => {
    setModalLoadingVisible(true);
    try {
      console.log(`Fetching detail for notification ID: ${id}`);
      const detail = await getNotificationDetail(id);

      if (detail?.data) {
        console.log('Detail fetched successfully:', detail.data);
        navigation.navigate('NotificationDetail', {
          notificationDetail: detail.data,
        });
      } else {
        console.error('Detail not found for the provided ID:', id);
      }
    } catch (error) {
      console.error(
        'Failed to fetch notification detail',
        error?.message || error,
      );
    } finally {
      setModalLoadingVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <HeaderTransparent
        title={`Detail Notification (${category})`}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
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
                {/* Title Section */}
                <View style={styles.titleSection}>
                  <Text style={styles.titleText}>{item?.title}</Text>
                  <Text style={styles.dateText}>
                    {new Date(item?.created_at).toLocaleString()}
                  </Text>
                </View>

                {/* Message Section */}
                <View style={styles.messageSection}>
                  <Text style={styles.messageText}>{item?.message}</Text>
                </View>

                {/* Action Buttons */}
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

      {/* Modal Custom untuk Konfirmasi Penghapusan */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        buttonSubmit={handleDeleteNotification}
        buttonTitle="Hapus"
        buttonLoading={isDeleting}
        iconModalName="trash-can-outline"
        title="Hapus Notifikasi"
        description="Apakah Anda yakin ingin menghapus notifikasi ini?"
      />

      {/* Modal untuk Token Expired */}
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

      {/* Modal Loading untuk Fetch Detail */}
      <ModalLoading
        visible={modalLoadingVisible}
        onRequestClose={() => setModalLoadingVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
  },
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.grey,
    marginTop: 10,
    textAlign: 'center',
  },
  newNotificationText: {
    fontSize: 18,
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
    marginBottom: 10,
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  dateText: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.grey,
  },
  messageSection: {
    marginBottom: 10,
    padding: 10,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.black,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: COLORS.redSoft,
    padding: 10,
    borderRadius: 8,
  },
  deleteText: {
    fontSize: 14,
    color: COLORS.red,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.grey,
  },
});
