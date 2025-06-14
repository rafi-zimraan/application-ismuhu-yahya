import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCarDetail, getCarLoanHistory} from '..';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

export default function DetailCarLoan({navigation}) {
  const route = useRoute();
  const {carId} = route.params;
  const [mobilDetail, setMobilDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [loanHistory, setLoanHistory] = useState([]);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [modalUnavailableVisible, setModalUnavailableVisible] = useState(false);

  const handleScroll = event => {
    const position = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentScreen(position);
  };

  useEffect(() => {
    const fetchMobilDetail = async carId => {
      try {
        const response = await FecthMe();
        if (response.message === 'Silahkan login terlebih dahulu') {
          setTokenExpired(true);
          return;
        }
        const fecthData = await getCarDetail(carId);
        setMobilDetail(fecthData.data);
      } catch (error) {
        console.error('Error fetching mobil detail:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLoanHistory = async () => {
      try {
        setLoadingHistory(true);
        const history = await getCarLoanHistory();
        // Kalau history object kosong, set jadi array kosong
        if (history && Array.isArray(history)) {
          setLoanHistory(history);
        } else {
          setLoanHistory([]);
        }
      } catch (error) {
        console.log('err fecth loan history', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchMobilDetail(carId);
    fetchLoanHistory();
  }, [carId]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <ModalLoading visible={loading} withSpinner={true} />

      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Detail Pinjam Mobil"
        onPress={() => navigation.goBack()}
      />

      {mobilDetail && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 25}}
          style={styles.scrollViewContainer}>
          <View style={styles.bodyDetail}>
            <Gap height={10} />
            <Text style={styles.txtNameCar}>{mobilDetail?.name}</Text>
            <Gap height={10} />
            <View style={styles.viewCar}>
              <Image
                source={
                  mobilDetail?.photo
                    ? {
                        uri: `https://app.simpondok.com/${mobilDetail?.photo}`,
                      }
                    : ICON_NOTFOUND_DATA
                }
                style={styles.imgCarLoan}
                resizeMethod="resize"
              />
            </View>
            <View style={styles.viewPagination} useBackgroundTransparent={true}>
              <View
                style={styles.paginationWrapper}
                useBackgroundTransparent={true}>
                {[mobilDetail?.photo].map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      currentScreen === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.title}>Detail Mobil</Text>
            <Gap height={10} />
            <View style={styles.contentCar}>
              <View style={styles.containerDetailCar} section={true}>
                <Text style={styles.txtTitleCar}>{mobilDetail?.name}</Text>
                <Gap height={5} />
                <View style={styles.viewPlatAndDesc} section={true}>
                  <View style={styles.row} section={true}>
                    <Icon name="seat" size={16} color={COLORS.redLight} />
                    <Text style={styles.txtDescCar}>
                      {mobilDetail?.count_seat} seat -{' '}
                      {mobilDetail?.type_transmission}
                    </Text>
                  </View>
                  <View style={styles.row} section={true}>
                    <Icon name="car-info" size={16} color={COLORS.blueLight} />
                    <Text style={styles.txtPlatCar}>
                      {mobilDetail?.number_plate}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Gap height={5} />
            <Text style={styles.title}>History Peminjaman</Text>
            <Gap height={5} />

            {loadingHistory && (
              <Text style={styles.loadingText}>Loading History</Text>
            )}

            {!loadingHistory && loanHistory?.length === 0 && (
              <View style={styles.contentNotFound}>
                <Text style={styles.txtNotFound}>
                  History peminjaman belum tersedia
                </Text>
                <View style={styles.viewImageNotFound}>
                  <Image
                    source={ICON_NOTFOUND_DATA}
                    resizeMethod="resize"
                    style={styles.imgNotFound}
                  />
                </View>
              </View>
            )}

            {!loadingHistory &&
              loanHistory?.map((item, index) => (
                <View key={index} style={styles.contentHistoryCar}>
                  <Icon
                    name="account-circle"
                    size={50}
                    color={COLORS.goldenOrange}
                  />
                  <Gap width={15} />
                  <View>
                    <Text style={styles.txtTitleCar}>
                      {item?.borrower_name || 'Nama tidak tersedia'}
                    </Text>
                    <Text style={styles.txtColorCar}>
                      {item?.borrow_date || 'Tanggal tidak tersedia'}
                    </Text>
                  </View>
                  <Gap height={20} />
                </View>
              ))}
            <Gap height={15} />
          </View>
        </ScrollView>
      )}
      <View style={styles.footer} section={true}>
        <Text style={styles.footerText}>
          Segera pinjam {'\n'}kendaraan pilihan Anda!
        </Text>
        <TouchableOpacity
          style={[
            styles.buttonAction,
            {
              backgroundColor:
                mobilDetail?.status === '0'
                  ? COLORS.goldenOrange
                  : COLORS.lightGrey2,
            },
          ]}
          activeOpacity={mobilDetail?.status === '0' ? 0.8 : 1}
          onPress={() => {
            if (mobilDetail?.status !== '0') {
              setModalUnavailableVisible(true);
              return;
            } else {
              navigation.navigate('CreateCarLoan', {carId});
            }
          }}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  mobilDetail?.status === '0'
                    ? COLORS.white
                    : COLORS.mediumGrey,
              },
            ]}>
            Pinjam
          </Text>
        </TouchableOpacity>
      </View>

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

      <ModalCustom
        visible={modalUnavailableVisible}
        onRequestClose={() => setModalUnavailableVisible(false)}
        onOutContentPress={() => setModalUnavailableVisible(false)}
        iconModalName="alert-circle-outline"
        title="Mobil Tidak Tersedia"
        description="Maaf, mobil ini sedang digunakan. Silakan pilih mobil lain atau coba lagi nanti."
        buttonTitle="Mengerti"
        buttonSubmit={() => setModalUnavailableVisible(false)}
        BackgroundButtonAction={COLORS.goldenOrange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  contentNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtNotFound: {
    fontSize: DIMENS.s,
    fontStyle: 'italic',
    fontWeight: '300',
  },
  loadingText: {
    fontStyle: 'italic',
    marginTop: 10,
  },
  containerDetailCar: {
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 0.3,
    borderColor: COLORS.goldenOrange,
    alignItems: 'center',
  },
  imgCarLoan: {
    height: 135,
    width: 250,
  },
  contentHistoryCar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 0.2,
    borderColor: COLORS.grey,
  },
  footerText: {
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  buttonAction: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: DIMENS.m,
    fontWeight: '600',
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewPlatAndDesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '89%',
  },
  txtColorCar: {
    fontSize: DIMENS.s,
    fontWeight: '400',
  },
  txtPlatCar: {
    fontSize: DIMENS.s,
    fontWeight: '400',
  },
  txtTitleCar: {
    fontSize: DIMENS.m,
    fontWeight: '600',
  },
  contentCar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  viewPagination: {
    marginTop: 10,
    alignItems: 'center',
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.goldenOrange,
  },
  inactiveDot: {
    backgroundColor: COLORS.lightGrey2,
  },
  scrollViewContainer: {
    flex: 1,
  },
  viewCar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.4,
    backgroundColor: '#e7b1b14f',
  },
  txtDescCar: {
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  txtNameCar: {
    fontSize: DIMENS.xxl,
    fontWeight: '900',
  },

  bodyDetail: {
    padding: 15,
  },
  container: {
    flex: 1,
  },
});
