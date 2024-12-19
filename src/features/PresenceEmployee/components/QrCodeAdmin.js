import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {HeaderTransparent} from '../../../Component';
import {DIMENS} from '../../../utils/dimens';

export default function QrCodeAdmin({navigation}) {
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const generateQrData = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan
      const day = String(today.getDate()).padStart(2, '0'); // Tanggal
      const dateString = `${year}-${month}-${day}`; // Format YYYY-MM-DD

      console.log('Generated QR Code Data:', dateString);
      setQrData(dateString); // Hanya tanggal yang disimpan dalam QR Code
    };

    generateQrData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderTransparent
        title="Absensi Qr-code"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>QR-Code Presensi</Text>
        <View style={styles.qrContainer}>
          {qrData ? (
            <QRCode value={qrData} size={200} />
          ) : (
            <Text>Memuat Kode QR...</Text>
          )}
        </View>
        <Text style={styles.instructionText}>
          Pindai kode ini menggunakan ponsel Anda untuk melakukan presensi
          kerja.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    position: 'absolute',
    top: 220,
    left: 40,
    right: 40,
  },
  title: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  qrContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  instructionText: {
    fontSize: DIMENS.l,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});
