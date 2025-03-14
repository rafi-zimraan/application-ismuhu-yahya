import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../Component';
import {ICON_DASBOARD} from '../../assets';
import {
  AyatComponent,
  ButtonMenu,
  ClockDasboard,
  DataSpaComponent,
  HeaderComponent,
  NetworkModal,
  NewsComponent,
  TokenExpiredModal,
  setAmountSantri,
  setAmountSpa,
  setUserPosition,
  useBackgroundImage,
  useFetchAyat,
  useNetworkStatus,
  useTime,
  useWelcomeMessage,
} from '../../features/Dasboard';
import {FecthMe} from '../../features/authentication';
import {COLORS} from '../../utils';

export default function Dasboard({navigation}) {
  const dispatch = useDispatch();
  const amountSantri = useSelector(state => state.dasboard.amountSantri);
  const amountSpa = useSelector(state => state.dasboard.amountSpa);
  const userPosition = useSelector(state => state.dasboard.userPosition);
  const formatTime = useTime();
  const backgroundImage = useBackgroundImage();
  const welcomeText = useWelcomeMessage();
  const {ayat, loadingAyat} = useFetchAyat();
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const isFocused = useIsFocused();
  const [photo, setPhoto] = useState(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const {showModal, setShowModal, buttonLoading, openNetworkSettings} =
    useNetworkStatus(isFocused);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (
        Platform.OS === 'android' &&
        Platform.Version >= 33 &&
        !permissionRequested
      ) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Izin notifikasi diberikan');
        } else {
          ToastAndroid.show(
            'Amal Yaumi butuh notifikasi. Aktifkan di pengaturan!',
            ToastAndroid.LONG,
          );
        }
        setPermissionRequested(true);
      }
    };

    requestNotificationPermission();
  }, [permissionRequested]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserSession();
    setRefreshing(false);
  };

  const fetchUserSession = useCallback(async () => {
    try {
      const response = await FecthMe();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
      const baseUrl = 'https://app.simpondok.com/';
      const photoUrl = response?.url_photo
        ? `${baseUrl}${response.url_photo}`
        : null;
      setPhoto(photoUrl);
      dispatch(setAmountSantri(response?.data_users?.santris?.tot_santri || 0));
      dispatch(setAmountSpa(response?.data_users?.spa?.tot_spa || 0));
      dispatch(setUserPosition(response?.position || ''));
    } catch (e) {
      console.log('Terjadi kesalahan checking session', e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserSession();
    }, [fetchUserSession]),
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageContainer}
          resizeMode="cover">
          <Gap height={18} />
          <HeaderComponent urlPhoto={photo} welcomeText={welcomeText} />
          {loadingAyat ? (
            <View style={styles.viewLoadingAyat}>
              <ActivityIndicator size={16} color={COLORS.white} />
            </View>
          ) : (
            <AyatComponent ayat={ayat} />
          )}
          <Gap height={25} />
          <ClockDasboard formatTime={formatTime} />
          <Gap height={25} />
          <DataSpaComponent
            iconDashboard={ICON_DASBOARD}
            totalSantri={amountSantri}
            totalSpa={amountSpa}
            userPosition={userPosition}
          />
          <Gap height={25} />
          <View style={styles.menu}>
            <ButtonMenu
              title="Amal yaumi"
              iconName="calendar-check"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('AmalYaumi')}
            />
            <ButtonMenu
              title="Task"
              iconName="format-list-checks"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('TaskManagement')}
            />
            <ButtonMenu
              title="Peminjaman "
              iconName="car-side"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('CarLoan')}
            />
            <ButtonMenu
              title="Pengaduan"
              iconName="hammer-wrench"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('FacilityComplaint')}
            />
          </View>
          <Gap height={25} />
          <NewsComponent />
        </ImageBackground>

        <TokenExpiredModal
          visible={tokenExpired}
          setTokenExpired={setTokenExpired}
          navigation={navigation}
        />
        <NetworkModal
          visible={showModal}
          setShowModal={setShowModal}
          openNetworkSettings={openNetworkSettings}
          buttonLoading={buttonLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
    padding: 15,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewLoadingAyat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
});
