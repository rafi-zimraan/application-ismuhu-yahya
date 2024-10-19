import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {
  BiometricSvg,
  createFinger,
  fingerPresence,
} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

const {width, height} = Dimensions.get('window');

export default function PresenceEmployee({navigation}) {
  // const finger = useSelector(state => state.fingerData.user.finger);
  const [newTime, setNewTime] = useState(moment());
  const formatWaktu = newTime.format('hh:mm A');
  const formatTanggal = newTime.format('dddd, DD MMMM YYYY');

  useEffect(() => {
    const changeClock = setInterval(() => {
      setNewTime(moment());
    }, 1000);

    return () => clearInterval(changeClock);
  }, []);

  const handleFingerprint = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Sentuh sensor sidik jari',
      });

      if (success) {
        // Authentikasi sidik jari berhasil, ambil data finger dari createfinger
        const saveFinger = await createFinger();
        if (saveFinger) {
          await fingerPresence(saveFinger);
        } else {
          ToastAndroid.show('Gagal memuat Fingerprint');
        }
      } else {
        console.log('cancel', 'fingerprint authentication anda batalkan');
      }
    } catch (error) {
      console.log('Error during fingerprint authentication:', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.kontainer}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Presensi"
        onPress={() => navigation.goBack()}
      />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View style={styles.badan}>
          <Image source={IMG_ISMUHUYAHYA_FUll} style={styles.gambar} />
          <Gap height={55} />

          <View style={styles.isi}>
            {/* clock */}
            <View style={styles.kontainerWaktu}>
              <Text style={styles.teksWaktu}>{formatWaktu}</Text>
              <Gap height={5} />
              <Text style={styles.teksTanggal}>{formatTanggal}</Text>
            </View>

            {/* Fingerprint */}
            <View style={styles.kontainerFingerprint}>
              <Text style={styles.teksKonfirmasi}>
                Konfirmasi menggunakan sidik jari Anda
              </Text>
              <Gap height={5} />
              <Text style={styles.teksDeskripsi}>
                Anda bisa menggunakan sidik jari untuk {'\n'}konfirmasi
                kedatangan & kepulangan!
              </Text>
              <Gap height={10} />
              <TouchableOpacity
                activeOpacity={0.13}
                onPress={handleFingerprint}>
                <BiometricSvg height={100} width={100} />
              </TouchableOpacity>
              <Text>Sentuh sensor sidik jari</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
