import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
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
import {
  AvailableCarSection,
  CustomSearchInput,
  getListCars,
  searchCarByName,
} from '../../features/CarLoan';
import {FecthMe} from '../../features/authentication';
import {COLORS, DIMENS} from '../../utils';
import {useFocusEffect} from '@react-navigation/native';

export default function CarLoan({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    try {
      const response = await FecthMe();
      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }
      const data = await getListCars();
      setCarList(data);
    } catch (error) {
      console.log('Gagal mengambil data mobil', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCars();
    }, [fetchCars]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCars();
    setRefreshing(false);
  }, [fetchCars]);

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
            onChangeText={async text => {
              if (text.length >= 3) {
                try {
                  const result = await searchCarByName(text);
                  setCarList(result);
                } catch (err) {
                  console.log('Error searching car:', err);
                }
              } else {
                const allCars = await getListCars();
                setCarList(allCars);
              }
            }}
          />
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{padding: 15}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <AvailableCarSection
          carList={carList}
          navigation={navigation}
          loading={loading}
        />

        {/* <Text
          style={[
            styles.titleTextLastUse,
            {color: colors[mode].textSectionTitleSett},
          ]}>
          Terakhir Digunakan
        </Text>
        <Gap height={5} />
        <View style={styles.viewBodyLastUse} section={true}>
          <View section={true}>
            <Text style={styles.txtLastUseNameCar}>Reborn-Car</Text>
            <Text style={styles.txtDateLastUse}>Jan 12, 2024 - 08,40</Text>
          </View>
          <View style={styles.viewTime} section={true}>
            <Text style={[styles.txtDateLastUse]}>Overtime</Text>
          </View>
        </View> */}

        {/* <Gap height={15} />
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
            showsVerticalScrollIndicator={false}
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
            
            <Gap height={20} />
          </ScrollView>
        </View> */}
      </ScrollView>

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
    borderColor: COLORS.goldenOrange,
    borderWidth: 0.3,
  },
  textManual: {
    fontWeight: '400',
    fontSize: DIMENS.m,
  },
  textTitleCar: {
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
