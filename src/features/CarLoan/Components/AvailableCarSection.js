import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, Text, View} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {cancelLoanCarApprovalStatus} from '../../Notification';
import Toast from 'react-native-toast-message';

export default function AvailableCarSection({
  carList,
  navigation,
  loading,
  userLoanData = {loan_car: []},
  currentUserId,
  fetchCars,
}) {
  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const getUserLoanByCarId = carId => {
    if (!Array.isArray(userLoanData?.loan_car)) return null;

    return userLoanData.loan_car.find(
      loan =>
        loan.car_id == carId &&
        loan.is_return == 0 && // Masih dipinjam
        loan.user_id == currentUserId, // Dipinjam oleh user saat ini
    );
  };

  return (
    <View>
      <Text style={styles.TextTitleMenuCar}>Mobil Operasional</Text>
      <Gap height={5} />
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 10}}
        showsHorizontalScrollIndicator={false}>
        {loading ? (
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : carList.length == 0 ? (
          <View style={styles.contentNotFound}>
            <Text style={styles.txtNotFound}>
              Mobil Operasional tidak tersedia
            </Text>
            <View style={styles.viewImageNotFound}>
              <Image
                source={ICON_NOTFOUND_DATA}
                resizeMethod="resize"
                style={styles.imgNotFound}
              />
            </View>
          </View>
        ) : (
          carList.map((item, index) => (
            <View section={true} style={styles.viewContentMenuCar} key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.carBody}
                onPress={() =>
                  navigation.navigate('DetailCarLoan', {carId: item.id})
                }>
                <View
                  style={{
                    ...styles.viewActiveText,
                    backgroundColor:
                      item.status == 0 ? COLORS.greenConfirm : COLORS.darkGrey,
                  }}>
                  <Text style={styles.textActive}>
                    {item.status == 0 ? 'Tersedia' : 'Digunakan'}
                  </Text>
                </View>
                <Image
                  source={
                    item.photo
                      ? {uri: `https://app.simpondok.com/${item.photo}`}
                      : ICON_NOTFOUND_DATA
                  }
                  style={styles.carImage}
                  resizeMethod="resize"
                />
                <Gap height={5} />
                <View style={styles.viewTextCar} section={true}>
                  <Text style={styles.textCar}>{item.name}</Text>
                  <Icon
                    name="arrow-right-thin"
                    size={20}
                    color={COLORS.black}
                  />
                </View>
                <Gap height={3} />
                <View section={true}>
                  <Text style={styles.textPlat}>{item.number_plate}</Text>
                </View>

                <Gap height={13} />
                {item?.status == 0 ? (
                  // Kondisi mobil tersedia
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.viewContentRent,
                      {backgroundColor: COLORS.blueLight},
                    ]}
                    onPress={() =>
                      navigation.navigate('CreateCarLoan', {carId: item.id})
                    }>
                    <Text style={[styles.textRent, {color: COLORS.white}]}>
                      Pinjam sekarang
                    </Text>
                  </TouchableOpacity>
                ) : getUserLoanByCarId(item.id) ? (
                  // Kondisi mobil sedang dipinjam oleh user saat ini
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.viewContentRent,
                      {backgroundColor: COLORS.red},
                    ]}
                    onPress={async () => {
                      try {
                        await cancelLoanCarApprovalStatus(
                          getUserLoanByCarId(item.id).id,
                          0,
                        );
                        showToast(
                          '✅ Mobil berhasil dikembalikan. Peminjaman sudah diselesaikan',
                        );
                        await fetchCars();
                      } catch (error) {
                        console.log('Gagal mengembalikan mobil', error);
                      }
                    }}>
                    <Text style={[styles.textRent, {color: COLORS.white}]}>
                      Kembalikan
                    </Text>
                  </TouchableOpacity>
                ) : (
                  // Kondisi mobil sedang dipinjam oleh user lain
                  <View
                    style={[
                      styles.viewContentRent,
                      {backgroundColor: COLORS.darkGrey},
                    ]}>
                    <Text style={[styles.textRent, {color: COLORS.mediumGrey}]}>
                      Sedang Digunakan
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  TextTitleMenuCar: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
  },
  contentNotFound: {
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 80,
    height: '100%',
  },
  txtNotFound: {
    fontSize: DIMENS.s,
    fontStyle: 'italic',
    fontWeight: '300',
    color: COLORS.black,
  },
  viewImageNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    overflow: 'hidden',
  },
  imgNotFound: {
    width: 150,
    height: 100,
    overflow: 'hidden',
  },
  viewContentMenuCar: {
    borderRadius: 15,
    elevation: 3,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.4,
    height: 220,
    marginHorizontal: 10,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  carBody: {
    width: 145,
    padding: 10,
  },
  carImage: {
    width: 140,
    height: 80,
  },
  viewActiveText: {
    borderRadius: 15,
    width: '60%',
  },
  textActive: {
    color: COLORS.white,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
  viewTextCar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCar: {
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
  textPlat: {
    textAlign: 'left',
    fontSize: DIMENS.xs,
  },
  viewContentRent: {
    padding: 5,
    borderRadius: 15,
  },
  textRent: {
    textAlign: 'center',
    fontSize: DIMENS.s,
  },
});
