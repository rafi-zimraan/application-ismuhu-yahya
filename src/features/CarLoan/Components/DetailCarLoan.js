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
import {getCarDetail} from '..';
import {
  Gap,
  HeaderTransparent,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailCarLoan({navigation}) {
  const route = useRoute();
  const {carId} = route.params;
  const [mobilDetail, setMobilDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);

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
        setLoading(true);
        const response = await getCarDetail(carId);
        console.log('response', response);
        setMobilDetail(response.data);
      } catch (error) {
        console.error('Error fetching mobil detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMobilDetail(carId);
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
            {/* <Text style={styles.txtCategoryCar}>Kategori - Ambulance Car</Text> */}
            <Gap height={10} />
            <Text style={styles.txtNameCar}>{mobilDetail.name}</Text>
            <Gap height={10} />
            <View style={styles.viewCar}>
              <Image
                source={
                  mobilDetail.photo
                    ? {
                        uri: `https://app.simpondok.com/${mobilDetail.photo}`,
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
                {[mobilDetail.photo].map((_, index) => (
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
                <Text style={styles.txtTitleCar}>{mobilDetail.name}</Text>
                <Gap height={5} />
                <View style={styles.viewPlatAndDesc} section={true}>
                  <View style={styles.row} section={true}>
                    <Icon name="seat" size={16} color={COLORS.redLight} />
                    <Text style={styles.txtDescCar}>
                      {mobilDetail.count_seat} seat -{' '}
                      {mobilDetail.type_transmission}
                    </Text>
                  </View>
                  <View style={styles.row} section={true}>
                    <Icon name="car-info" size={16} color={COLORS.blueLight} />
                    <Text style={styles.txtPlatCar}>
                      {mobilDetail.number_plate}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Gap height={5} />
            <Text style={styles.title}>History Peminjaman</Text>
            <Gap height={5} />
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <View key={index} style={styles.contentHistoryCar}>
                  <Icon
                    name="account-circle"
                    size={50}
                    color={COLORS.goldenOrange}
                  />
                  <Gap width={15} />
                  <View>
                    <Text style={styles.txtTitleCar}>Fulan bin fulanah</Text>
                    <Text style={styles.txtColorCar}>Des, 22, 2025</Text>
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
          style={styles.buttonAction}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('CreateCarLoan')}>
          <Text style={styles.buttonText}>Pinjam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.goldenOrange,
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
    color: COLORS.mediumGrey,
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
  txtCategoryCar: {
    fontSize: DIMENS.s,
    color: COLORS.softBlue,
    fontWeight: '500',
  },
  bodyDetail: {
    padding: 15,
  },
  container: {
    flex: 1,
  },
});
