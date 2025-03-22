import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent} from '../../../Component';
import {IMG_NAME_CARD_REBORN, IMG_REBORN_CAR_ESCAPE} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailCarLoan({navigation}) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [IMG_REBORN_CAR_ESCAPE, IMG_REBORN_CAR_ESCAPE];
  const handleScroll = event => {
    const position = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentScreen(position);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          icon="arrow-left-circle-outline"
          title="Detail Pinjam Mobil"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{paddingBottom: 20}}
        style={styles.scrollViewContainer}>
        <View style={styles.bodyDetail}>
          <Text style={styles.txtCategoryCar}>Kategori - Ambulance Car</Text>
          <Gap height={1} />
          <Text style={styles.txtNameCar}>Reborn GT-R NISMO 2019</Text>
          <Gap height={15} />
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            style={styles.scrollView}>
            {screens.map((image, index) => (
              <View key={index} style={styles.viewCar}>
                <Image
                  source={image}
                  style={styles.imgCarLoan}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.viewPagination}>
            <View style={styles.paginationWrapper}>
              {screens.map((_, index) => (
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
          <Gap height={10} />
          <Text style={styles.title}>Detail Mobil</Text>
          <Gap height={5} />
          <View style={styles.contentCar}>
            <Image
              source={IMG_NAME_CARD_REBORN}
              style={styles.img}
              resizeMethod="resize"
              resizeMode="cover"
            />
            <Gap width={15} />
            <View>
              <Text style={styles.txtTitleCar}>Mobil Reborn</Text>
              <Text style={styles.txtColorCar}>
                Hitam Pekat dengan perpaduan description
              </Text>
              <View style={styles.viewPlatAndDesc}>
                <View style={styles.row}>
                  <Icon name="seat" size={16} color={COLORS.redLight} />
                  <Text style={styles.txtDescCar}>2 seat - Manual</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="car-info" size={16} color={COLORS.blueLight} />
                  <Text style={styles.txtPlatCar}>KB - 1212 - BJH</Text>
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
      <View style={styles.footer}>
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
  imgCarLoan: {
    height: 120,
    width: 300,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 7,
    alignSelf: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
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
    backgroundColor: COLORS.white,
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
    color: COLORS.grey,
  },
  buttonAction: {
    backgroundColor: COLORS.goldenOrange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: DIMENS.m,
    color: COLORS.white,
    fontWeight: '600',
  },
  title: {
    fontSize: DIMENS.xl,
    color: COLORS.black,
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
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  txtTitleCar: {
    fontSize: DIMENS.m,
    color: COLORS.black,
    fontWeight: '600',
  },
  contentCar: {
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: '#D3D3D3',
  },
  scrollView: {
    width: '100%',
    height: 140,
  },
  scrollViewContainer: {
    flex: 1,
  },
  viewCar: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  txtDescCar: {
    fontSize: DIMENS.s,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  txtNameCar: {
    fontSize: DIMENS.xxxl,
    color: COLORS.black,
    fontWeight: '500',
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
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
