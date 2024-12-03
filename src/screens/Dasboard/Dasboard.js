import {BlurView} from '@react-native-community/blur';
import NetInfo from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../../Component';
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
            onPress={() => navigation.navigate('Perizinan')}
          />
          {/* <ButtonMenu
            title="Presensi"
            iconName="line-scan"
            color={COLORS.white}
            backgroundColor={COLORS.goldenOrange}
            iconSize={36}
            onPress={() => navigation.navigate('Presensi')}
          />
          <ButtonMenu
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tidak ada koneksi internet. Silakan periksa koneksi Anda dan
              hidupkan kembali koneksi internet.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
