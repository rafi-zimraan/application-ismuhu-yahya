import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../Component';
import {IMG_CAR_REBORN} from '../../assets';
import {
  AvailableCarSection,
  CustomSearchInput,
  getListCars,
} from '../../features/CarLoan';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';

export default function CarLoan({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [modalSop, setModalSop] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthCars = async () => {
      try {
        // check tokenExpired
        const response = await FecthMe();
        if (response.message === 'Silahkan login terlebih dahulu') {
          setTokenExpired(true);
          return; // jangan lanjut fecth carlist
        }
        // Kalau token valid, fetch carList
        const data = await getListCars();
        console.log('data car', data);
        setCarList(data);
      } catch (error) {
        console.log('Gagal mengambil data mobile', error.message);
      } finally {
        setLoading(false);
      }
    };
    fecthCars();
  }, []);

  return (
    <View style={styles.ContentView}>
      {loading && <ModalLoading visible={loading} withSpinner={true} />}
      <LinearGradient
        colors={colors[mode].linearGardenProfile}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}>
        <HeaderTransparent
          title="Peminjaman mobil"
          icon="arrow-left-circle-outline"
          linearGardenProfile={true}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.viewNavbar} useBackgroundTransparent={true}>
          <Text style={styles.title}>
            Mobil apa yang {'\n'}anda pinjam hari ini?
          </Text>
          <Gap height={10} />
          <CustomSearchInput
            placeholderTextColor={COLORS.grey}
            borderRadius={12}
          />
        </View>
      </LinearGradient>

      <View style={{padding: 15, flex: 1}}>
        <AvailableCarSection
          carList={carList}
          navigation={navigation}
          modalSop={modalSop}
          loading={loading}
          setModalSop={setModalSop}
        />

        <Text
          style={[
            styles.titleTextLastUse,
            {color: colors[mode].textSectionTitleSett},
          ]}>
          Terakhir Digunakan
        </Text>
        <Gap height={5} />
        <View style={styles.viewBodyLastUse}>
          <View>
            <Text style={styles.txtLastUseNameCar}>Reborn-Car</Text>
            <Text style={styles.txtDateLastUse}>Jan 12, 2024 - 08,40</Text>
          </View>
          <View style={styles.viewTime}>
            <Text style={[styles.txtDateLastUse, {color: COLORS.white}]}>
              Overtime
            </Text>
          </View>
        </View>

        <Gap height={15} />
        <View style={styles.viewFavorite}>
          <Text
            style={[
              styles.titleTextLastUse,
              {color: colors[mode].textSectionTitleSett},
            ]}>
            Sering Digunakan
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SeeAllCars')}>
            <Text style={styles.titleTextSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>Reborn-Car</Text>
                <Text style={styles.textManual}>4 seat-manual</Text>
              </View>
              <Image
                source={IMG_CAR_REBORN}
                style={{height: 80, width: 160}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <Gap height={10} />
            <View style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>Reborn-Car</Text>
                <Text style={styles.textManual}>4 seat-manual</Text>
              </View>
              <Image
                source={IMG_CAR_REBORN}
                style={{height: 80, width: 160}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <Gap height={10} />
            <View style={styles.viewBodyFavorite} section={true}>
              <View style={styles.ViewFavoriteText} section={true}>
                <Text style={styles.textTitleCar}>Reborn-Car</Text>
                <Text style={styles.textManual}>4 seat-manual</Text>
              </View>
              <Image
                source={IMG_CAR_REBORN}
                style={{height: 80, width: 160}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <Gap height={20} />
          </ScrollView>
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  ViewFavoriteText: {
    marginHorizontal: 10,
  },
  ContentView: {
    flex: 1,
  },
  viewBodyFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.3,
  },
  textManual: {
    color: COLORS.textPrimary,
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  textTitleCar: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  titleTextSeeAll: {
    color: COLORS.goldenOrange,
    fontSize: DIMENS.m,
    fontWeight: '500',
  },
  viewFavorite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTime: {
    backgroundColor: COLORS.greenBoy,
    padding: 6,
    borderRadius: 6,
  },
  txtDateLastUse: {
    color: COLORS.mediumGrey,
    fontWeight: '400',
    fontSize: DIMENS.s,
  },
  txtLastUseNameCar: {
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  viewBodyLastUse: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.4,
    height: 60,
    elevation: 2,
    borderColor: COLORS.goldenOrange,
  },
  titleTextLastUse: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
    color: COLORS.black,
  },
  viewNavbar: {
    padding: 15,
  },
  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: DIMENS.xxxl,
    fontWeight: '800',
    textAlign: 'justify',
  },
  container: {
    padding: 15,
  },
});
