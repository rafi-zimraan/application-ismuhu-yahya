import NetInfo from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  NativeModules,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {Gap, ModalCustom} from '../../Component';
import {
  ButtonMenu,
  ClockDasboard,
  HeaderComponent,
  NewsComponent,
} from '../../features/Dasboard';
import {COLORS} from '../../utils';

export default function Dashboard({navigation}) {
  const [allTime, setAllTime] = useState(moment().utcOffset(7)); // set offset ke wib (UTC + 7)
  const formatTime = allTime.format('HH:mm:ss') + ' WIB'; // hh:mm A
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();
  const [buttonLoading, setButtonLoading] = useState(false);
  const {InternetSettings} = NativeModules;

  useEffect(() => {
    const Time = setInterval(() => {
      setAllTime(moment().utcOffset(7));
    }, 1000);
    return () => clearInterval(Time);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
      if (!state.isConnected) {
        setShowModal(true);
      }
    });
    return () => unsubscribe();
  }, [isFocused]);

  const onRefresh = async () => {
    setRefreshing(true);
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      // Simulate network request
      setTimeout(() => {
        setRefreshing(false);
        ToastAndroid.show('Data refreshed successfully', ToastAndroid.SHORT);
      }, 1000);
    } else {
      setRefreshing(false);
      setShowModal(true);
    }
  };

  // Fungsi untuk membuka pengaturan jaringan
  const openNetworkSettings = async () => {
    setButtonLoading(true);
    try {
      if (InternetSettings && InternetSettings.open) {
        InternetSettings.open();
        ToastAndroid.show('Opening network settings...', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Unable to open network settings',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show('Error opening network settings', ToastAndroid.SHORT);
    } finally {
      setButtonLoading(false);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderComponent navigation={navigation} />
        <ClockDasboard formatTime={formatTime} />
        <Gap height={40} />
        <View style={styles.menu}>
          <ButtonMenu
            title="Perizinan"
            iconName="check-decagram-outline"
            iconSize={36}
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            onPress={() => navigation.navigate('PerizinanByCategory')}
          />
          <ButtonMenu
            title="Presensi"
            iconName="line-scan"
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            iconSize={36}
            onPress={() => navigation.navigate('Presensi')}
          />
          {/* <ButtonMenu
            title="Aktivitas"
            iconName="format-list-checkbox"
            iconSize={36}
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
          />  
          <ButtonMenu
            title="Mobil"
            iconName="car"
            iconSize={36}
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
          /> */}
        </View>
        <NewsComponent />
      </ScrollView>

      {/* Modal tidak ada internet */}
      <ModalCustom
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        iconModalName="wifi-off"
        title="Tidak Ada Koneksi Internet"
        description="Tidak ada koneksi internet. Silakan periksa koneksi Anda dan hidupkan kembali koneksi internet."
        buttonSubmit={openNetworkSettings}
        buttonTitle="Buka pengaturan"
        buttonLoading={buttonLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.black,
  },
  closeButton: {
    backgroundColor: COLORS.goldenOrange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
