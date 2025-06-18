import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {updateApprovalStatus} from '..';
import {
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function PermissionDetailScreen({route, navigation}) {
  const {notificationDetail: initialDetail} = route.params;
  const {mode, colors} = useSelector(state => state.theme);
  const [notificationDetail, setNotificationDetail] = useState(initialDetail);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [errorModalVisible, setErrorModalVisible] = useState(!initialDetail);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const fetchNotificationDetail = async () => {
    try {
      setLoading(true);
      const updatedDetail = initialDetail;
      setNotificationDetail(updatedDetail);
    } catch (error) {
      console.log('Failed to fetch notification detail:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotificationDetail();
    }, []),
  );

  const handleApproval = status => {
    setModalData({
      title:
        status === 'approve'
          ? 'Konfirmasi Persetujuan'
          : 'Konfirmasi Penolakan',
      description: `Apakah Anda yakin ingin ${
        status === 'approve' ? 'mengizinkan' : 'menolak'
      } perizinan ini?`,
      status,
    });
    setModalVisible(true);
  };

  const confirmApproval = async status => {
    try {
      setModalVisible(false);
      setLoadingModalVisible(true);
      const approvalStatus = status === 'approve' ? 1 : 0;

      const response = await updateApprovalStatus(
        notificationDetail.approval.id,
        approvalStatus,
      );

      setNotificationDetail(prevDetail => ({
        ...prevDetail,
        approval: {
          ...prevDetail.approval,
          is_approve: approvalStatus.toString(),
        },
      }));

      setSuccessModalVisible(true);
    } catch (error) {
      setModalData({
        title: 'Error',
        description:
          error.message ||
          'Terjadi kesalahan saat memperbarui status approval.',
      });
      setModalVisible(true);
    } finally {
      setLoadingModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Memuat Detail...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={mode == 'light' ? 'dark-content' : 'default'}
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Detail Notifikasi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      {notificationDetail ? (
        <View style={{flex: 1}} showImageBackground={true}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchNotificationDetail();
                }}
              />
            }>
            <View style={styles.detailCard} section={true}>
              <Text style={styles.title}>{notificationDetail?.title}</Text>
              <Text
                style={[
                  styles.date,
                  {color: colors[mode].textSectionDescSett},
                ]}>
                {new Date(notificationDetail.created_at).toLocaleString()}
              </Text>

              <View style={styles.section} section={true}>
                <Text style={styles.sectionHeader}>Pesan</Text>
                <Text style={styles.text}>{notificationDetail?.message}</Text>
              </View>

              {notificationDetail?.approval?.is_approve === '1' && (
                <View style={styles.viewApproval}>
                  <TouchableOpacity style={styles.approvedButton}>
                    <Text style={styles.approvedText}>Approved</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      ) : null}

      {notificationDetail?.approval?.is_approve === null && (
        <View style={styles.bottomContainer} section={true}>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleApproval('reject')}>
            <Text style={styles.buttonText}>Tolak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleApproval('approve')}>
            <Text style={styles.buttonText}>Diterima</Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title={modalData.title}
        description={modalData.description}
        buttonSubmit={() => confirmApproval(modalData.status)}
        buttonTitle="Konfirmasi"
      />

      <ModalCustom
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
        iconModalName="check-circle-outline"
        title="Sukses"
        description="Status approval berhasil diperbarui."
        buttonSubmit={() => {
          setSuccessModalVisible(false);
        }}
        buttonTitle="Ok"
      />

      <ModalCustom
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(false);
          navigation.goBack();
        }}
        iconModalName="alert-circle-outline"
        title="Data Tidak Ditemukan"
        description="Detail notifikasi tidak tersedia. Silakan kembali dan coba lagi."
        buttonSubmit={() => {
          setErrorModalVisible(false);
          navigation.goBack();
        }}
        buttonTitle="Kembali"
      />

      <ModalLoading
        visible={loadingModalVisible}
        onRequestClose={() => setLoadingModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  detailCard: {
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: DIMENS.m,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  viewApproval: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: COLORS.red,
  },
  approveButton: {
    backgroundColor: COLORS.greenSoft,
  },
  approvedButton: {
    backgroundColor: COLORS.greenBoy,
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  approvedText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: DIMENS.m,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: DIMENS.l,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingText: {
    marginTop: 10,
    fontSize: DIMENS.l,
    color: COLORS.grey,
  },
});
