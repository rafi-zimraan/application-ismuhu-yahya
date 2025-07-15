import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, DIMENS} from '../../../utils';
import {Gap, Text, View} from '../../../Component';
import {returnLoanCar} from '../../Notification';
import Toast from 'react-native-toast-message';

export default function LoanTodayItem({
  loaner,
  status,
  carName,
  timeUse,
  returnTime,
  onPress,
  isReturn,
  id,
  onReturned,
}) {
  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleReturnCar = async () => {
    try {
      const response = await returnLoanCar(id);
      if (response?.status == true && response?.message) {
        showToast('Mobil dikembalikan. Sampai jumpa di peminjaman berikutnya!');
        if (onReturned) onReturned();
      } else {
        showToast('Gagal mengembalikan mobil.', 'error');
      }
    } catch (error) {
      console.log('❌ Gagal mengembalikan mobil:', error.message);
    }
  };

  const getStatusText = () => {
    switch (Number(status)) {
      case 0:
        return 'Menunggu';
      case 1:
        return 'Disetujui';
      case 2:
        return 'Ditolak';
      default:
        return 'Menunggu';
    }
  };

  const getStatusColor = status => {
    switch (Number(status)) {
      case 0:
        return '#007AFF';
      case 1:
        return COLORS.greenBoy;
      case 2:
        return COLORS.red;
      default:
        return COLORS.black;
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.container} section={true}>
          <View style={styles.leftSection} section={true}>
            <Text style={styles.carName}>{carName}</Text>
            <View style={styles.viewLoaner} section={true}>
              <Text style={styles.loaner}>Peminjam: </Text>
              <Text style={styles.loaner}>{loaner}</Text>
            </View>

            <View style={{flexDirection: 'row'}} section={true}>
              <Text style={styles.timeUse}>Jam: {timeUse}</Text>
              <Gap width={10} />
              <Text style={styles.timeUse}>Jam Kembali: {returnTime}</Text>
            </View>
          </View>
          <View style={styles.rightSection} section={true}>
            <Text style={[styles.status, {color: getStatusColor(status)}]}>
              {getStatusText(status)}
            </Text>
            <Gap height={5} />
            {isReturn == '0' && status == '1' && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleReturnCar}
                style={styles.buttonReturn}>
                <Text style={styles.textButtonReturn}>Kembalikan</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  buttonReturn: {
    backgroundColor: '#FF8C00',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  textButtonReturn: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: DIMENS.s,
  },
  viewLoaner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLoan: {
    fontWeight: '300',
    fontSize: DIMENS.s,
  },
  container: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.7,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'center',
    marginLeft: 10,
  },
  loaner: {
    fontWeight: '500',
    fontSize: DIMENS.s,
  },
  carName: {
    fontWeight: 'bold',
    fontSize: DIMENS.xl,
  },
  timeUse: {
    fontWeight: '300',
    fontSize: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
