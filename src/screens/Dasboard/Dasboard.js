import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
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
  useBackgroundImage,
  useFetchAyat,
  useNetworkStatus,
  useTime,
  useWelcomeMessage,
} from '../../features/Dasboard';
import {FecthMe} from '../../features/authentication';
import {COLORS} from '../../utils';

export default function Dasboard({navigation}) {
  const formatTime = useTime();
  const backgroundImage = useBackgroundImage();
  const welcomeText = useWelcomeMessage();
  const {ayat, loadingAyat} = useFetchAyat();
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const isFocused = useIsFocused();
  const [photo, setPhoto] = useState(null);
  const [amountSantri, setAmountSantri] = useState('');
  const [amountSpa, setAmountSpa] = useState('');
  const [userPosition, setUserPosition] = useState('');

  const {
    isOffline,
    showModal,
    setShowModal,
    buttonLoading,
    openNetworkSettings,
  } = useNetworkStatus(isFocused);

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

      if (response?.status) {
        const baseUrl = 'https://app.simpondok.com/';
        const photoUrl = response?.url_photo
          ? `${baseUrl}${response.url_photo}`
          : null;

        setPhoto(photoUrl);
        const santriTotal = response?.data_users?.santris?.tot_santri || 0;
        const spaTotal = response?.data_users?.spa?.tot_spa || 0;

        setAmountSantri(santriTotal);
        setAmountSpa(spaTotal);
        setUserPosition(response?.position || '');
      } else {
        console.log('Error fetching user session:', response?.message);
      }
    } catch (e) {
      console.log('error checking session', e);
      setTokenExpired(false);
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
        contentContainerStyle={{flexGrow: 1}}
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
              <ActivityIndicator size="large" color={COLORS.white} />
            </View>
          ) : (
            <AyatComponent ayat={ayat} />
          )}
          <Gap height={25} />
          <ClockDasboard formatTime={formatTime} />

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
          <Gap height={15} />

          <DataSpaComponent
            iconDashboard={ICON_DASBOARD}
            totalSantri={amountSantri}
            totalSpa={amountSpa}
            userPosition={userPosition}
          />

          <Gap height={15} />
          <View style={styles.menu}>
            <ButtonMenu
              title="Amal - yaumi"
              iconName="clipboard-check-multiple"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('AmalYaumi')}
            />

            <ButtonMenu
              title="Task- list"
              iconName="clipboard-list"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={33}
              onPress={() => navigation.navigate('TaskManagement')}
            />
          </View>

          <Gap height={35} />
          <NewsComponent />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {flex: 1, padding: 15},
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
