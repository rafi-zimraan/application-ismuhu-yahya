import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {COLORS} from '../../../utils';

export default function CameraPresence() {
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();
  const [active, setActive] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      setActive(false);
      console.log('QR Codes Scanned:', codes);
      setTimeout(() => setActive(true), 2000);
    },
  });

  // Animasi garis scanner
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineAnimation, {
          toValue: 1,
          duration: 1500, // Waktu garis bergerak dari atas ke bawah
          useNativeDriver: true,
        }),
        Animated.timing(lineAnimation, {
          toValue: 0,
          duration: 1500, // Waktu garis kembali ke atas
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [lineAnimation]);

  // Jika tidak ada izin kamera
  if (!hasPermission)
    return (
      <View style={{flex: 1}}>
        <Text style={{color: COLORS.black, fontSize: 20}}>
          Izin kamera tidak diberikan.
        </Text>
      </View>
    );

  // Jika tidak ada perangkat kamera
  if (!device) return <Text>Tidak ada kamera yang tersedia.</Text>;

  // Posisi garis scanner
  const translateY = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 600], // Gerakan garis dari atas ke bawah (sesuai layar)
  });

  // Posisi bayangan (berubah berdasarkan arah gerakan)
  const shadowTranslateY = lineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 15], // Bayangan berpindah posisi (atas ke bawah)
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
      {/* Overlay untuk garis scanner */}
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.scannerLineContainer, {transform: [{translateY}]}]}>
          <LinearGradient
            colors={['#FFA500', '#FFD700', 'transparent']} // Gradien oranye cerah ke transparan
            style={styles.scannerBody}
          />
          <Animated.View
            style={[
              styles.scannerWings,
              {transform: [{translateY: shadowTranslateY}]}, // Bayangan bergerak dinamis
            ]}>
            <LinearGradient
              colors={['rgba(255, 165, 0, 0.5)', 'transparent']} // Efek bayangan
              style={styles.scannerShadow}
            />
          </Animated.View>
        </Animated.View>
      </View>
      {/* Tombol flash di bawah */}
      <View style={styles.flashContainer}>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setFlashOn(!flashOn)}>
          <Text style={styles.flashIcon}>⚡</Text>
        </TouchableOpacity>
        <Text style={styles.flashText}>
          {flashOn ? 'Matikan Flash' : 'Nyalakan Flash'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  scannerLineContainer: {
    width: '100%',
    height: 40, // Ukuran tinggi keseluruhan area scanner
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBody: {
    width: '100%',
    height: 8, // Garis lebih tipis
    borderRadius: 50, // Membuat bentuk seperti awan
    opacity: 0.95,
  },
  scannerWings: {
    position: 'absolute',
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerShadow: {
    width: '100%',
    height: 30, // Tinggi bayangan lebih besar dari garis
    borderRadius: 15,
    opacity: 0.4,
  },
  flashContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
    left: 40,
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
  flashText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
});
