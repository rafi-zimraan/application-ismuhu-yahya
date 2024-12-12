import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ICON_ILUSTRATION_SCAAN_QR_CODE} from '../../../assets';

export default function ItemPerizinanAdmin() {
  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={ICON_ILUSTRATION_SCAAN_QR_CODE}
          style={styles.profileImage}
        />
        <Text style={styles.profileDescription}>
          Selamat datang! Untuk melakukan absensi, silakan pilih tombol di bawah
          ini dan lakukan scan QR Code atau daftar wajah Anda.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 300,
    height: '80%',
    marginBottom: 10,
  },
  profileDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
