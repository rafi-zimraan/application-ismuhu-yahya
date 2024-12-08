import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, HeaderTransparent, ModalCustom} from '../../Component';
import {COLORS} from '../../utils';

export default function NotificationRead({route, navigation}) {
  const {notificationDetail} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  if (!notificationDetail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Data notifikasi tidak ditemukan.</Text>
      </View>
    );
  }

  const handleApproval = status => {
    setModalData({
      title:
        status === 'approve'
          ? 'Konfirmasi Persetujuan'
          : 'Konfirmasi Penolakan',
      description: `Apakah Anda yakin ingin ${
        status === 'approve' ? 'mengizinkan' : 'menolak'
      } notifikasi ini?`,
      status,
    });
    setModalVisible(true);
  };

  const confirmApproval = status => {
    setModalVisible(false);
    navigation.navigate('DetailNotification', {
      approvalStatus: status === 'approve' ? 'disetujui' : 'ditolak',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <HeaderTransparent
        title="Detail Notifikasi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.detailCard}>
          {/* Title */}
          <Text style={styles.title}>{notificationDetail?.title}</Text>
          <Text style={styles.date}>
            {new Date(notificationDetail.created_at).toLocaleString()}
          </Text>

          {/* Message */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Pesan</Text>
            <Text style={styles.text}>{notificationDetail?.message}</Text>
          </View>

          {/* Approval Buttons */}
          {notificationDetail?.approval !== null && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Persetujuan</Text>
              <View style={styles.buttonContainer}>
                <ButtonAction
                  text="Tolak"
                  onPress={() => handleApproval('reject')}
                  style={styles.rejectButton}
                />
                <ButtonAction
                  text="Izinkan"
                  onPress={() => handleApproval('approve')}
                  style={styles.approveButton}
                />
              </View>
            </View>
          )}

          {/* File Attachment */}
          {notificationDetail?.file_type && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Lampiran</Text>
              <TouchableOpacity>
                <Text style={styles.link}>Download File</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title={modalData.title}
        description={modalData.description}
        buttonSubmit={() => confirmApproval(modalData.status)}
        buttonTitle="Konfirmasi"
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
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: COLORS.black,
  },
  link: {
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rejectButton: {
    backgroundColor: COLORS.red,
  },
  approveButton: {
    backgroundColor: COLORS.green,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.red,
    textAlign: 'center',
    marginTop: 50,
  },
});
