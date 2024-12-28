import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';
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
import {COLORS} from '../../utils';

export default function Dasboard({navigation}) {
  const urlPhotoRedux = useSelector(state => state.auth.url_photo);
  const formatTime = useTime();
  const backgroundImage = useBackgroundImage();
  const welcomeText = useWelcomeMessage();
  const {ayat, loadingAyat} = useFetchAyat();
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const isFocused = useIsFocused();

  const {
    isOffline,
    showModal,
    setShowModal,
    buttonLoading,
    openNetworkSettings,
  } = useNetworkStatus(isFocused);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

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

          <HeaderComponent urlPhoto={urlPhotoRedux} welcomeText={welcomeText} />

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
            totalSantri={0}
            totalSpa={0}
          />

          <Gap height={15} />
          <View style={styles.menu}>
            <ButtonMenu
              title="Perizinan"
              iconName="check-decagram-outline"
              iconSize={36}
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              onPress={() => navigation.navigate('Perizinan')}
            />
            <ButtonMenu
              title="Presensi"
              iconName="line-scan"
              color={COLORS.white}
              backgroundColor={COLORS.goldenOrange}
              iconSize={36}
              onPress={() => navigation.navigate('Presensi')}
            />
          </View>
          <Gap height={15} />
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
  },
  viewLoadingAyat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
});
