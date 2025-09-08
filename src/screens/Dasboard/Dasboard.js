import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../Component';
import {ICON_DASBOARD} from '../../assets';
import {
  AyatComponent,
  ButtonMenu,
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
  useFetchHijriDate,
  useNetworkStatus,
  useTime,
  useWelcomeMessage,
} from '../../features/Dasboard';
import {FecthMe} from '../../features/authentication';
import {COLORS} from '../../utils';
import Toast from 'react-native-toast-message';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function Dasboard({navigation}) {
  const dispatch = useDispatch();
  const {colors, mode} = useSelector(state => state.theme);
  const amountSantri = useSelector(state => state.dasboard.amountSantri);
  const amountSpa = useSelector(state => state.dasboard.amountSpa);
  const userPosition = useSelector(state => state.dasboard.userPosition);
  const formatTime = useTime();
  const backgroundImage = useBackgroundImage();
  const welcomeText = useWelcomeMessage();
  const {hijriDate} = useFetchHijriDate();
  const {ayat, loadingAyat} = useFetchAyat();
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const isFocused = useIsFocused();
  const [photo, setPhoto] = useState(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const {showModal, setShowModal, buttonLoading, openNetworkSettings} =
    useNetworkStatus(isFocused);
  const [listMemberLoan, setListMemberLoan] = useState(null);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

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
          showToast('Amal Yaumi butuh notifikasi. Aktifkan di pengaturan!');
        }
        setPermissionRequested(true);
      }

      if (Platform.OS === 'ios' && !permissionRequested) {
        const result = await PushNotificationIOS.requestPermissions();
        if (result?.alert === true) {
          console.log('Izin notifikasi diberikan (iOS)');
        } else {
          showToast('Amal Yaumi butuh notifikasi. Aktifkan di pengaturan!');
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
      setListMemberLoan(response?.is_member_loan ?? null);
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
    <View style={{flex: 1, backgroundColor: colors[mode].background}}>
      <StatusBar
        barStyle={mode === 'light' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ImageBackground
          source={backgroundImage}
          style={[
            styles.imageContainer,
            {paddingTop: Platform.OS === 'android' ? 30 : 50},
          ]}
          resizeMode="cover">
          <Gap height={15} />

          <HeaderComponent urlPhoto={photo} welcomeText={welcomeText} />
          <Gap height={30} />
          {loadingAyat ? (
            <View style={styles.viewLoadingAyat}>
              <ActivityIndicator size={16} color={COLORS.white} />
            </View>
          ) : (
            <AyatComponent ayat={ayat} />
          )}
          <Gap height={25} />
          <DataSpaComponent
            iconDashboard={ICON_DASBOARD}
            totalSantri={amountSantri}
            totalSpa={amountSpa}
            userPosition={userPosition}
            formatTime={formatTime}
            hijriDate={hijriDate}
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
              colors={colors}
              mode={mode}
            />
            <ButtonMenu
              title="Task"
              iconName="format-list-checks"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('TaskManagement')}
              colors={colors}
              mode={mode}
            />
            {/*             
            <ButtonMenu
              title="Pengaduan Fasilitas"
              iconName="clipboard-alert-outline"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('FacilityComplaint')}
              colors={colors}
              mode={mode}
            /> */}

            {listMemberLoan === 1 && (
              <ButtonMenu
                title="Peminjaman "
                iconName="car-side"
                color={COLORS.white}
                backgroundColor={COLORS.goldenOrange}
                iconSize={33}
                onPress={() => navigation.navigate('CarLoan')}
                colors={colors}
                mode={mode}
              />
            )}
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
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLoadingAyat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
});
