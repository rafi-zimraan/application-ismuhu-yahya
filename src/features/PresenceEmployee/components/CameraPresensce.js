import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {ModalCustom} from '../../../Component';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';
import {qrCodePresence} from '../services/presenceApiSlice';

export default function CameraPresence() {
  const navigation = useNavigation();
  const route = useRoute();
  const device = useCameraDevice('back');
  const {userLongitude, userLatitude, status} = route.params || {};
  console.log('longitude', userLongitude);
  console.log('longitude', userLatitude);
  const [active, setActive] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(lineAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [lineAnimation]);

  const validateQrCode = async scannedData => {
    try {
      const scannedDate = scannedData.value;

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const date = String(today.getDate()).padStart(2, '0');
      const todayString = `${year}-${month}-${date}`;

      if (scannedDate !== todayString) {
        setActive(false); // Nonaktifkan kamera
        ToastAndroid.show('QR Code sudah kadaluwarsa.', ToastAndroid.LONG);
        return false;
      }

      return true;
    } catch (error) {
      console.log('Error:', error);
      ToastAndroid.show('Terjadi kesalahan validasi.', ToastAndroid.LONG);
      return false;
    }
  };

  const handleQrCodeScan = async codes => {
    setActive(false);
    try {
      if (!codes || codes.length === 0) {
        ToastAndroid.show('QR Code tidak valid.', ToastAndroid.SHORT);
        setActive(false);
        return;
      }

      const scannedData = codes[0];
      console.log('QR Code Scanned:', scannedData);

      const isValid = await validateQrCode(scannedData);
      if (!isValid) {
        return;
      }

      const idUser = await EncryptedStorage.getItem('idUser');

      const response = await qrCodePresence(
        JSON.parse(idUser),
        scannedData.value,
        userLongitude,
        userLatitude,
        status,
      );
      console.log('Response API:', response);

      if (response?.status && response?.message === 'Data telah diperbaharui') {
        setShowModal(true);
      } else {
        ToastAndroid.show(
          response?.message || 'Presensi gagal.',
          ToastAndroid.LONG,
        );
        setTimeout(() => setActive(true), 2000);
      }
    } catch (error) {
      console.log('Error Presensi:', error);
      if (error?.response?.data?.message) {
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(
          'Terjadi kesalahan saat presensi.',
          ToastAndroid.LONG,
        );
      }
    } finally {
      setTimeout(() => setActive(true), 2000);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: handleQrCodeScan,
  });

  const translateY = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <View style={{flex: 1}}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={active}
        codeScanner={codeScanner}
        torch={flashOn ? 'on' : 'off'}
      />
      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          <Animated.View
            style={[styles.scannerLineContainer, {transform: [{translateY}]}]}>
            <LinearGradient
              colors={['#FFA500', '#FFD700', 'transparent']}
              style={styles.scannerBody}
            />
          </Animated.View>
          <View style={styles.cornerTopLeft}></View>
          <View style={styles.cornerTopRight}></View>
          <View style={styles.cornerBottomLeft}></View>
          <View style={styles.cornerBottomRight}></View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.viewFlash}
          activeOpacity={0.8}
          onPress={() => setFlashOn(!flashOn)}>
          <View style={styles.flashButton}>
            <Text style={styles.flashIcon}>⚡</Text>
          </View>
          <Text style={styles.flashText}>
            {flashOn ? 'Matikan Flash' : 'Nyalakan Flash'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewFlash}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <View style={styles.closeButton}>
            <Text style={styles.closeIcon}>✖️</Text>
          </View>
          <Text style={styles.flashText}>Keluar</Text>
        </TouchableOpacity>
      </View>
      <ModalCustom
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        iconModalName="check-circle-outline"
        title="Terima Kasih"
        description={`Presensi ${
          status === 'Pulang' ? 'Pulang' : 'Hadir'
        } berhasil.`}
        buttonSubmit={() => {
          setShowModal(false);
          navigation.goBack();
        }}
        buttonTitle="Tutup"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  scanBox: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scannerLineContainer: {
    width: '100%',
    height: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  scannerBody: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: '#00FF00',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: '#00FF00',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#00FF00',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#00FF00',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: -2},
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flashButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  flashIcon: {
    fontSize: DIMENS.xxxxxl,
    color: 'black',
  },
  closeButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  closeIcon: {
    fontSize: DIMENS.xxxxxl,
    color: COLORS.black,
  },
  flashText: {
    marginTop: 10,
    fontSize: DIMENS.l,
    color: '#666',
    textAlign: 'center',
  },
});
