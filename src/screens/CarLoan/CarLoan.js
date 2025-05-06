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
  FrequentCarLoansSection,
  getListCars,
  getMostCarLoans,
  getUserCarLoans,
  LoanTodaySection,
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
  const [mostCarLoans, setMostCarLoans] = useState([]);
  const [userLoanData, setUserLoanData] = useState(null);

  const fetchCars = useCallback(async () => {
    try {
      const response = await FecthMe();
      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }
      const data = await getListCars();
      setCarList(data);

      const mostLoans = await getMostCarLoans();
      setMostCarLoans(mostLoans);

      const userLoans = await getUserCarLoans();
      setUserLoanData(userLoans);
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

        <LoanTodaySection
          loading={loading}
          userLoanData={userLoanData}
          navigation={navigation}
          colors={colors}
          mode={mode}
        />

        <FrequentCarLoansSection
          mostCarLoans={mostCarLoans}
          colors={colors}
          mode={mode}
          loading={loading}
        />
        <Gap height={15} />
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
  ContentView: {
    flex: 1,
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
});
