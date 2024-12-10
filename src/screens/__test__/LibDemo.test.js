// ! SCREEN BANTUAN & DUKUNGAN-BANTUAN
// import React from 'react';
// import {ScrollView, StyleSheet, Text} from 'react-native';
// import {Gap} from '../../Component';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <ScrollView style={styles.container}>
//       <Gap height={20} />
//       <Text style={styles.header}>Bantuan</Text>
//       <Text style={styles.description}>
//         Temukan jawaban untuk pertanyaan Anda atau hubungi dukungan kami.
//       </Text>
//       <Gap height={20} />
//       <Text style={styles.question}>Bagaimana cara mengganti profil?</Text>
//       <Text style={styles.answer}>
//         Anda dapat mengganti profil Anda di menu "Profil Karyawan".
//       </Text>
//       <Text style={styles.question}>
//         Bagaimana cara mengubah pengaturan bahasa?
//       </Text>
//       <Text style={styles.answer}>
//         Anda dapat mengubah bahasa aplikasi melalui menu "Bahasa".
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   description: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginTop: 15,
//   },
//   answer: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginTop: 5,
//   },
// });

// ! BANTUAN & DUKUNGAN - TENTANG APLIKASI
// import React from 'react';
// import {ScrollView, StyleSheet, Text} from 'react-native';
// import {Gap} from '../../Component';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <ScrollView style={styles.container}>
//       <Gap height={20} />
//       <Text style={styles.header}>Tentang Aplikasi</Text>
//       <Text style={styles.description}>
//         Aplikasi ini dirancang untuk membantu pengelolaan pengaturan pengguna
//         secara efisien.
//       </Text>
//       <Text style={styles.detail}>
//         Versi: 1.0.0{'\n'}
//         Developer: Nama Developer{'\n'}
//         Hak Cipta: © 2024 Nama Perusahaan.
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   description: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   detail: {
//     fontSize: 16,
//     color: COLORS.darkGray,
//     lineHeight: 24,
//   },
// });

import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function CameraPresence() {
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();
  const [active, setActive] = useState(true);
  const [flashOn, setFlashOn] = useState(false); // Status flash
  const lineAnimation = useRef(new Animated.Value(0)).current; // Animasi garis scanner

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
  if (!hasPermission) return <Text>Izin kamera tidak diberikan.</Text>;

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
