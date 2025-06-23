import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {COLORS, DIMENS} from '../../../utils';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
  Text,
  View,
} from '../../../Component';
import {getUserCarLoans, LoanTodayItem} from '../../CarLoan';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {FecthMe} from '../../authentication';
import CarLoanApprovalListScreen from './CarLoanApprovalListScreen';

export default function CarLoanNotificationListScreen({navigation}) {
  const {colors, mode} = useSelector(state => state.theme);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userDataRoles, setUserDataRoles] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(false);

  const fetchLoanData = useCallback(async () => {
    const response = await getUserCarLoans();
    const loanData = response?.loan_car || [];
    setData(loanData.slice().reverse());
  }, []);

  const fecthNotifications = useCallback(async () => {
    const response = await FecthMe();
    if (response?.message === 'Silahkan login terlebih dahulu') {
      setTokenExpired(true);
      return;
    }
    setUserDataRoles(response);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchLoanData(), fecthNotifications()]);
    } catch (err) {
      console.log('Gagal saat refresh:', err.message);
    } finally {
      setRefreshing(false);
    }
  }, [fetchLoanData, fecthNotifications]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await onRefresh();
      setLoading(false);
    };
    loadData();
  }, [onRefresh]);

  return (
    <View style={styles.container}>
      {loading && <ModalLoading visible={loading} />}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View
        style={[
          styles.headerWrapper,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Notifikasi Peminjaman Mobil"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      {userDataRoles?.roles?.includes('admin_peminjaman_mobil') ? (
        <CarLoanApprovalListScreen
          navigation={navigation}
          loanCarNotifications={
            userDataRoles?.data_notifications?.notification?.loan_car || []
          }
          loanCarList={data}
          loading={loading}
          onAfterApproval={onRefresh}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{padding: 16}}
          renderItem={({item}) => (
            <LoanTodayItem
              loaner={item?.loaner}
              carName={item?.car?.name || '-'}
              timeUse={item?.time_use?.substring(0, 5) || '-'}
              status={item.status}
              onPress={() =>
                navigation.navigate('LoanTodayDetail', {id: item.id})
              }
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            loading && data.length === 0 ? (
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
                <Text style={styles.textNotFound}>
                  Belum ada notifikasi mobil harian
                </Text>
              </View>
            )
          }
        />
      )}

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
  viewLoadingData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  LoadingText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '12%',
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
});
