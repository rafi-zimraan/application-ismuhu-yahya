import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {HeaderTransparent} from '../../../Component';
import {COLORS} from '../../../utils';

export default function CameraPresence() {
  const device = useCameraDevice('back');
  const navigation = useNavigation();
  const {hasPermission} = useCameraPermission();
  const [active, setActive] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      setActive(false);
      console.log('QR Codes Scanned:', codes);
      setTimeout(() => setActive(true), 2000);
    },
  });

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

  if (!hasPermission)
    return (
      <View style={{flex: 1}}>
        <Text style={{color: COLORS.black, fontSize: 20}}>
          Izin kamera tidak diberikan.
        </Text>
      </View>
    );

  if (!device) return <Text>Tidak ada kamera yang tersedia.</Text>;

  const translateY = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250], // Bergerak dalam kotak
  });

  return (
    <View style={{flex: 1}}>
      <HeaderTransparent
        title="SCANN-QR-CODE"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
        rightIcon="information-outline"
        onRightPress={() => setShowModal(true)}
      />
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Informasi</Text>
            <Text style={styles.modalText}>
              Fitur ini dirancang untuk membantu karyawan melakukan presensi
              kehadiran dan kepulangan secara cepat dan efisien.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={active}
        codeScanner={codeScanner}
        torch={flashOn ? 'on' : 'off'}
      />
      <View style={styles.overlay}>
        {/* Garis melengkung berbentuk kotak */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  viewFlash: {
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  scannerLineContainer: {
    width: '100%',
    height: 2, // Lebar garis
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  scannerBody: {
    width: '100%',
    height: 4,
    borderRadius: 2,
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
    fontSize: 30,
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
    fontSize: 30,
    color: COLORS.black,
  },
  flashText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
