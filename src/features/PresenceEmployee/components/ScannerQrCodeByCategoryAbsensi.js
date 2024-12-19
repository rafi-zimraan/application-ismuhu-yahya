import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {
  AlertPopUp,
  Gap,
  HeaderTransparent,
  ModalLoading,
} from '../../../Component';
import {ICON_SCANNER} from '../../../assets';
import {COLORS} from '../../../utils';
import AbsenceForm from './AbsenceForm';

const {width} = Dimensions.get('window');

const locations = [
  [-0.091558, 109.379999], // Masjid Ismuhu Yahya
  [-0.089215, 109.383345], // Kantor Pondok Digital
  [-0.089178, 109.383257], // Kantor Pondok Digital (koordinat baru)
  [-0.089542, 109.382759], // Area Parkir Utama
  [-0.090329, 109.381515], // Gedung Serbaguna
  [-0.09013, 109.381481], // Taman Belajar
  [-0.089915, 109.381929], // Kafetaria
  [-0.089197, 109.383303], // Kantor HC
  [-0.089292, 109.383122], // Pos Satpam
  [-0.089584, 109.382563], // Talenta
  [-0.089612, 109.382528], // Media Center
  [-0.089429, 109.383021], // Rumah Bang Ican (koordinat kedua)
];

export default function ScannerQrCodeByCategoryAbsensi({navigation}) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [userLongitude, setUserLongitude] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const requestCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return requestGPS();
    }
    ToastAndroid.show('Izin kamera diperlukan.', ToastAndroid.LONG);
  };

  const requestGPS = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return getUserLocation();
    }
    ToastAndroid.show('Izin lokasi diperlukan.', ToastAndroid.LONG);
  };

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // radius of the Earth in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // result in meters
  };

  const getUserLocation = useCallback(async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });

      const {longitude, latitude} = position.coords;
      setUserLongitude(longitude);
      setUserLatitude(latitude);
      console.log('longitude', longitude);
      console.log('latitude', latitude);

      let inRange = false;
      for (const [index, loc] of locations.entries()) {
        const distance = haversine(latitude, longitude, loc[0], loc[1]);
        if (distance <= 50) {
          onrange(latitude, longitude, '');
          inRange = true;
          break;
        }
      }

      if (!inRange) offrange();
    } catch (error) {
      console.log('Error getting location:', error.message);
      ToastAndroid.show('Gagal mendapatkan lokasi.', ToastAndroid.LONG);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onrange = () => {
    ToastAndroid.show(
      'Anda berada dalam kawasan Masjid Ismuhu Yahya.',
      ToastAndroid.LONG,
    );
  };

  const offrange = () => {
    ToastAndroid.show(
      'Anda diluar kawasan komplek masjid ismuhuyahya.',
      ToastAndroid.LONG,
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestCamera();
  }, []);

  useEffect(() => {
    requestCamera();
  }, []);

  const handleSubmit = () => {
    if (!selectedStatus) {
      setShowAlert(true);
      return;
    }
    if (!userLongitude || !userLatitude) {
      ToastAndroid.show('Lokasi pengguna tidak ditemukan.', ToastAndroid.LONG);
      return;
    }
    navigation.navigate('QrCodePresense', {
      userLongitude,
      userLatitude,
      status: selectedStatus,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ModalLoading visible={loading} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Kategori Presensi"
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Image
            source={ICON_SCANNER}
            style={{width: width - 10, height: width - 50}}
            resizeMode="contain"
          />
        </View>
        <Gap height={30} />
        <AbsenceForm
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onSubmit={handleSubmit}
        />
        <AlertPopUp
          show={showAlert}
          message="Harap pilih status absensi terlebih dahulu!"
          onClose={() => setShowAlert(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    elevation: 3,
  },
  container: {
    padding: 15,
    alignItems: 'center',
  },
});
