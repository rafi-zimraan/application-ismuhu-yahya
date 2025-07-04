import {
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../../utils';
import {Gap, ModalCustom, Text, View} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {
  cancelLoanCarApprovalStatus,
  updateLoanCarApprovalStatus,
} from '../services/notificationApiSlice';

export default function CarLoanApprovalListScreen({
  approvalMe = [],
  loanCarNotifications = [],
  loading,
  onAfterApproval = () => {},
}) {
  const {mode} = useSelector(state => state.theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvedLoanIds, setApprovedLoanIds] = useState([]);
  const [approvedStatusMap, setApprovedStatusMap] = useState({});
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false);
  const [cancelData, setCancelData] = useState({loan_id: null, status: null});
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);

  const getUniqueMonths = () => {
    const monthsSet = new Set();
    loanCarNotifications.forEach(item => {
      const foundApproval = approvalMe.find(
        approval =>
          approval.notification_id == item.id && approval.approveable != null,
      );

      const approveable = foundApproval ? foundApproval.approveable : null;

      if (approveable && approveable.use_date) {
        const month = approveable.use_date.slice(0, 7);
        monthsSet.add(month);
      }
    });

    const monthsArray = Array.from(monthsSet).sort((a, b) =>
      b.localeCompare(a),
    );

    return [
      {label: 'Semua', value: 'All'},
      ...monthsArray.map(month => ({
        label: formatMonthLabel(month),
        value: month,
      })),
    ];
  };

  const formatMonthLabel = monthString => {
    const [year, month] = monthString.split('-');
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const monthOptions = getUniqueMonths();

  const filteredNotifications = loanCarNotifications.filter(item => {
    if (selectedMonth === 'All') return true;

    const foundApproval = approvalMe.find(
      approval =>
        approval.notification_id == item.id && approval.approveable != null,
    );

    const approveable = foundApproval ? foundApproval.approveable : null;
    if (!approveable) return false;

    const itemMonth = approveable.use_date?.slice(0, 7);
    return itemMonth === selectedMonth;
  });

  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    icon: 'check-circle-outline',
    color: COLORS.greenConfirm,
  });

  useEffect(() => {
    const initialApprovedMap = {};

    loanCarNotifications.forEach(notif => {
      const notifId = notif.id;

      const foundApproval = approvalMe.find(
        item =>
          item.notification_id == notifId &&
          item.approveable_type.includes('LoanCar') &&
          item.approveable?.status,
      );

      if (foundApproval) {
        const status = foundApproval.approveable.status;
        if (status == 1 || status == 2) {
          initialApprovedMap[notifId] = status;
        }
      }
    });

    setApprovedStatusMap(initialApprovedMap);
    setApprovedLoanIds(Object.keys(initialApprovedMap).map(id => parseInt(id)));
  }, [loanCarNotifications, approvalMe]);

  const confirmCancelAction = async () => {
    const {loan_id, status} = cancelData;
    const loanIdNum = Number(loan_id);
    try {
      await cancelLoanCarApprovalStatus(loan_id, status);
      setApprovedLoanIds(prev => {
        const updatedIds = prev.filter(id => id !== loanIdNum);
        return updatedIds;
      });

      setApprovedStatusMap(prev => {
        const newMap = {...prev};
        delete newMap[loanIdNum];
        return newMap;
      });

      setConfirmCancelVisible(false);
      setModalVisible(true);
      onAfterApproval();
    } catch (error) {
      console.log('❌ Error canceling approval:', error);
      setModalData({
        title: 'Gagal Membatalkan',
        description:
          'Terjadi kesalahan saat membatalkan persetujuan. Silakan coba lagi.',
        icon: 'alert-circle-outline',
        color: COLORS.red,
      });
      setConfirmCancelVisible(false);
      setModalVisible(true);
    }
  };

  const renderItem = ({item}) => {
    let parsedMessage = {};

    try {
      const maybeObject = JSON.parse(item.message);
      if (maybeObject && typeof maybeObject === 'object') {
        parsedMessage = maybeObject;
      } else {
        parsedMessage.text = item.message;
      }
    } catch (error) {
      parsedMessage.text = item.message;
    }

    // Ambil approval yang sesuai dengan notification_id dan tidak null
    const foundApproval = approvalMe.find(
      approval =>
        approval.notification_id == item.id && approval.approveable != null,
    );

    const approveable = foundApproval ? foundApproval.approveable : null;

    const getLoanIdFromNotification = item => {
      try {
        const message = JSON.parse(item.message);
        return message.loan_id || null;
      } catch (err) {
        console.log('Error parsing message:', err);
      }
    };

    const handleApproval = async (item, status) => {
      const notifId = item.id;
      // ✅ Cek apakah sudah pernah approve berdasarkan notifId
      if (approvedLoanIds.includes(notifId)) {
        setModalData({
          title: 'Sudah Diapprove',
          description: 'Data ini sudah pernah kamu approve/tolak sebelumnya.',
          icon: 'information-outline',
          color: COLORS.mediumGrey,
        });
        setModalVisible(true);
        return;
      }

      const loan_id = getLoanIdFromNotification(item);

      if (!loan_id) {
        setModalData({
          title: 'Gagal',
          description: 'Tidak dapat menemukan ID peminjaman mobil.',
          icon: 'alert-circle-outline',
          color: COLORS.red,
        });
        setModalVisible(true);
        return;
      }

      try {
        await updateLoanCarApprovalStatus(loan_id, status);
        setApprovedLoanIds(prev => [...prev, loan_id]);
        setApprovedStatusMap(prev => ({...prev, [loan_id]: status}));

        // ✅ Ubah is_read menjadi '1' secara lokal
        item.is_read = '1';
        onAfterApproval();

        setModalData({
          title: 'Status Diperbarui',
          description:
            status == 1
              ? 'Peminjaman mobil berhasil disetujui.'
              : 'Peminjaman mobil berhasil ditolak.',
          icon: 'check-circle-outline',
          color: COLORS.greenConfirm,
        });
        setModalVisible(true);
      } catch (err) {
        console.log('Error updating approval status:', err);
        setModalVisible(true);
      }
    };

    const handleCancelApproval = (notifId, status) => {
      // Cari approval yang sesuai berdasarkan notification_id
      const foundApproval = approvalMe.find(
        item =>
          item.notification_id == notifId &&
          item.approveable_type.includes('LoanCar'),
      );

      if (!foundApproval) {
        setModalData({
          title: 'Data Tidak Ditemukan',
          description: 'sepertinya data sudah kedaluwarsa',
          icon: 'alert-circle-outline',
          color: COLORS.red,
        });
        setModalVisible(true);
        return;
      }

      // Ambil loan_id yang benar dari approveable_id
      const loan_id = foundApproval.approveable_id;
      setCancelData({loan_id, status: 0});
      setConfirmCancelVisible(true);
    };

    const notifId = item.id;
    const status = approvedStatusMap[notifId];
    const isApproved = status == 1;
    const isRejected = status == 2;

    return (
      <View
        style={[
          styles.card,
          {shadowColor: mode === 'dark' ? COLORS.white : COLORS.black},
        ]}
        section={true}>
        {isApproved && (
          <View
            style={{
              ...styles.viewActiveText,
              backgroundColor: COLORS.greenConfirm,
            }}>
            <Text style={styles.textActive}>Digunakan</Text>
          </View>
        )}
        {isRejected && (
          <View
            style={{
              ...styles.viewActiveText,
              backgroundColor: COLORS.redLight,
            }}>
            <Text style={styles.textActive}>Ditolak</Text>
          </View>
        )}
        <Text style={styles.title}>{parsedMessage?.car_name || '-'}</Text>

        <View style={styles.infoContainer} section={true}>
          <Text style={styles.label}>👤 Peminjam</Text>
          <Text style={styles.value}>{parsedMessage?.user_name || '-'}</Text>

          <View style={styles.dashedLine} />
          <Text style={styles.label}>🏷️ Keperluan</Text>
          <Text style={styles.value}>{approveable?.necessity || '-'}</Text>

          <Text style={styles.label}>⏰ Waktu Penggunaan</Text>
          <View style={styles.ViewClockAndDate} section={true}>
            <View style={styles.ViewClockAndDate} section={true}>
              <Text style={styles.value}>
                {(approveable?.time_use || '-').slice(0, 5)}
              </Text>
              <Gap width={4} />
              <Text style={styles.value}>WIB</Text>
            </View>

            <Gap width={40} />
            <View style={{flexDirection: 'row'}} section={true}>
              <Icon
                name="calendar-blank-outline"
                size={16}
                color={COLORS.black}
              />
              <Gap width={6} />
              <Text style={styles.value}>{approveable?.use_date || '-'}</Text>
            </View>
          </View>

          <View style={styles.dashedLine} />

          <Text style={styles.label}>⏳ Waktu Pengembalian</Text>
          <View style={styles.ViewClockAndDate} section={true}>
            <View style={styles.ViewClockAndDate} section={true}>
              <Text style={styles.value}>
                {(approveable?.time_return || '-').slice(0, 5)}
              </Text>
              <Gap width={4} />
              <Text style={styles.value}>WIB</Text>
            </View>
            <Gap width={40} />
            <View style={{flexDirection: 'row'}} section={true}>
              <Icon
                name="calendar-blank-outline"
                size={16}
                color={COLORS.black}
              />
              <Gap width={6} />
              <Text style={styles.value}>
                {approveable?.return_date || '-'}
              </Text>
            </View>
          </View>

          <View style={styles.dashedLine} />

          <Text style={styles.label}>📝 keterangan</Text>
          <Text style={styles.value}>{approveable?.desc || '-'}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Icon name="clock-outline" size={16} color={COLORS.black} />
          <Gap width={4} />
          <Text style={styles.statusBadgetxt}>Peminjaman Mobil</Text>
        </View>

        <Gap height={5} />
        <View style={styles.actions} section={true}>
          {isApproved || isRejected ? (
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonFullWidth,
                isApproved ? styles.buttonApproved : styles.buttonRejected,
              ]}
              onPress={() => handleCancelApproval(notifId, status)}>
              <Text style={styles.txtBatal}>
                {isApproved ? 'Batal Setuju' : 'Batal Tolak'}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.buttonSuccess]}
                onPress={() => handleApproval(item, 1)}>
                <View style={styles.iconWithText} useBackgroundApproved={true}>
                  <Icon
                    name="check-circle-outline"
                    size={16}
                    color={COLORS.black}
                  />
                  <Gap width={6} />
                  <Text style={styles.txtApproved}>Setujui</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDanger]}
                onPress={() => handleApproval(item, 2)}>
                <View style={styles.iconWithText} useBackgroundReject={true}>
                  <Icon
                    name="close-circle-outline"
                    size={16}
                    color={COLORS.black}
                  />
                  <Gap width={6} />
                  <Text style={styles.txtReject}>Tolak</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={{padding: 16}}>
        <TouchableOpacity
          style={styles.viewButtonFilter}
          onPress={() => setMonthDropdownVisible(!monthDropdownVisible)}>
          <Text>
            {selectedMonth === 'All'
              ? 'Semua Bulan'
              : formatMonthLabel(selectedMonth)}
          </Text>
          <Icon
            name={monthDropdownVisible ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={COLORS.black}
          />
        </TouchableOpacity>

        {monthDropdownVisible && (
          <View style={styles.viewContentFilter}>
            {monthOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.buttonActionFilter}
                onPress={() => {
                  setSelectedMonth(option.value);
                  setMonthDropdownVisible(false);
                }}>
                <Text
                  style={{
                    color:
                      selectedMonth === option.value
                        ? COLORS.goldenOrange
                        : COLORS.black,
                  }}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={filteredNotifications.slice().reverse()}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{padding: 16}}
        renderItem={renderItem}
        extraData={[approvedLoanIds, approvedStatusMap]}
        ListEmptyComponent={
          loading && loanCarNotifications.length == 0 ? (
            <View style={styles.viewLoadingData}>
              <Text style={styles.LoadingText}>Loading data...</Text>
            </View>
          ) : (
            <View style={styles.viewContentNotFound}>
              <Image
                source={ICON_NOTFOUND_DATA}
                style={styles.imgNotFound}
                resizeMethod="resize"
              />
              <Gap height={10} />
              <Text style={styles.textNotFound}>Belum ada approval mobil</Text>
            </View>
          )
        }
      />

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title={modalData.title}
        description={modalData.description}
        iconModalName={modalData.icon}
        ColorIcon={modalData.color}
        buttonTitle="Tutup"
        buttonSubmit={() => setModalVisible(false)}
      />

      <ModalCustom
        visible={confirmCancelVisible}
        onRequestClose={() => setConfirmCancelVisible(false)}
        title="Konfirmasi Pembatalan"
        description="Apakah kamu yakin ingin membatalkan persetujuan ini?"
        iconModalName="alert-circle-outline"
        ColorIcon={COLORS.red}
        buttonTitle="Ya, Batalkan"
        BackgroundButtonAction={COLORS.red}
        TextColorButton={COLORS.white}
        buttonSubmit={confirmCancelAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContentFilter: {
    borderWidth: 1,
    borderColor: COLORS.mediumGrey,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonActionFilter: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.mediumGrey,
  },
  viewButtonFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.goldenOrange,
    borderRadius: 8,
    padding: 12,
  },
  ViewClockAndDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewActiveText: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 15,
    width: '28%',
  },
  textActive: {
    color: COLORS.white,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
  dashedLine: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.mediumGrey,
    marginVertical: 5,
  },
  returned: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtReject: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtApproved: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  statusBadgetxt: {
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
    shadowRadius: 0.22,
    shadowOpacity: 0.37,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: DIMENS.xxxl,
    fontWeight: '800',
    marginBottom: 16,
  },
  infoContainer: {
    gap: 3,
    marginBottom: 2,
  },
  label: {
    fontWeight: '700',
    fontSize: DIMENS.m,
  },
  value: {
    fontSize: DIMENS.s,
    marginBottom: 8,
    fontWeight: '400',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 190, 235)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: COLORS.greenConfirm,
  },
  buttonDanger: {
    backgroundColor: COLORS.red,
  },
  buttonPrimary: {
    backgroundColor: COLORS.goldenOrange,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContentNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgNotFound: {
    width: 150,
    height: 100,
    overflow: 'hidden',
  },
  textNotFound: {
    textAlign: 'center',
    fontSize: DIMENS.s,
    fontWeight: '300 ',
  },
  viewLoadingData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  LoadingText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  buttonFullWidth: {
    backgroundColor: COLORS.mediumGrey,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },

  buttonApproved: {
    backgroundColor: COLORS.greenConfirm,
  },
  buttonRejected: {
    backgroundColor: COLORS.red,
  },
  txtBatal: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: DIMENS.s,
  },
  iconTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
