import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {BiometricSvg} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

const {width, height} = Dimensions.get('window');

export default function PresenceEmployee({navigation}) {
  const [waktuSekarang, setWaktuSekarang] = useState(moment());

  useEffect(() => {
    const perbaruiWaktu = setInterval(() => {
      setWaktuSekarang(moment());
    }, 1000); // Update setiap detik

    return () => clearInterval(perbaruiWaktu); // Bersihkan interval saat komponen dilepas
  }, []);

  // Format waktu dan tanggal yang dinamis
  const formatWaktu = waktuSekarang.format('hh:mm A');
  const formatTanggal = waktuSekarang.format('dddd, DD MMMM YYYY');

  return (
    <View style={styles.kontainer}>
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Presensi"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.badan}>
        <Image source={IMG_ISMUHUYAHYA_FUll} style={styles.gambar} />
        <Gap height={55} />

        <View style={styles.isi}>
          {/* Bagian Waktu */}
          <View style={styles.kontainerWaktu}>
            <Text style={styles.teksWaktu}>{formatWaktu}</Text>
            <Gap height={5} />
            <Text style={styles.teksTanggal}>{formatTanggal}</Text>
          </View>

          {/* Bagian Fingerprint */}
          <View style={styles.kontainerFingerprint}>
            <Text style={styles.teksKonfirmasi}>
              Konfirmasi menggunakan sidik jari Anda
            </Text>
            <Gap height={5} />
            <Text style={styles.teksDeskripsi}>
              Anda bisa menggunakan sidik jari untuk {'\n'}konfirmasi kehadiran
              & kedatangan!
            </Text>
            <Gap height={10} />
            <TouchableOpacity activeOpacity={0.7}>
              <BiometricSvg height={100} width={100} />
            </TouchableOpacity>
            <Text>Sentuh sensor sidik jari</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kontainer: {
    flex: 1,
  },
  badan: {
    alignSelf: 'center',
    padding: 15,
  },
  gambar: {
    height: height * 0.21,
    width: width * 0.9,
    resizeMode: 'contain',
  },
  isi: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  kontainerWaktu: {
    alignItems: 'center',
  },
  teksWaktu: {
    fontSize: 35,
    color: 'black',
    fontWeight: '900',
  },
  teksTanggal: {
    fontSize: 17,
    color: 'black',
    fontWeight: '400',
  },
  kontainerFingerprint: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.gold,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    borderRadius: 10,
  },
  teksKonfirmasi: {
    fontSize: 19,
    color: 'black',
    fontWeight: '700',
  },
  teksDeskripsi: {
    fontSize: 13,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
});
