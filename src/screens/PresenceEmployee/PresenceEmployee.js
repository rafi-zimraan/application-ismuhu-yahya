import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
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
import EncryptedStorage from 'react-native-encrypted-storage';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_FUll} from '../../assets';
import {BiometricSvg, fingerPresence} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

const {width, height} = Dimensions.get('window');

export default function PresenceEmployee({navigation}) {
  const {watch} = useForm();
  const [newTime, setNewTime] = useState(moment());
  const formatWaktu = newTime.format('hh:mm A');
  const formatTanggal = newTime.format('dddd, DD MMMM YYYY');
  // const selecteduser = watch('username');
  // // console.log('user_id', selecteduser);

  useEffect(() => {
    const changeClock = setInterval(() => {
      setNewTime(moment());
    }, 1000);

    return () => clearInterval(changeClock);
  }, []);

  const verifyUserFingerprint = async (user, signature, payload) => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const {success} = await rnBiometrics.verifySignature({
      publicKey: user.saveFinger,
      signature,
      payload,
    });
    return success;
  };

  const handleFinger = async () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });

    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (!available || !biometryType) {
        return ToastAndroid.show('Biometric not available', ToastAndroid.SHORT);
      }

      const storedData = JSON.parse(
        (await EncryptedStorage.getItem('fingerprintData')) || '[]',
      );
      console.log('data--->', storedData);
      // const payload = selecteduser;
      const {signature, success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Verifikasi Sidik Jari Anda',
        payload: payload,
      });

      if (success) {
        const matchingFinger = storedData.find(async user => {
          try {
            return await verifyUserFingerprint(user, signature, payload);
          } catch (error) {
            console.log('vefify failed for user', user.name);
          }
        });

        if (matchingFinger) {
          try {
            await fingerPresence(matchingFinger.saveFinger);
            console.log(`Finger ${matchingFinger} berhasil divalidasi`);
          } catch (error) {
            console.log(`Error validasi finger ${matchingFinger}:`, error);
          }
        } else {
          ToastAndroid.show('Fingerprint tidak sesuai', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Fingerprint validation failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error validating fingerprint:', error);
      ToastAndroid.show('Error validating fingerprint', ToastAndroid.SHORT);
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
                Sentuh gambar fingerprint di layar
              </Text>
              <Gap height={5} />
              <Text style={styles.teksDeskripsi}>
                Anda bisa menggunakan sidik jari untuk {'\n'}konfirmasi
                kedatangan & kepulangan!
              </Text>
              <Gap height={10} />
              <TouchableOpacity activeOpacity={0.13} onPress={handleFinger}>
                <BiometricSvg height={100} width={100} />
              </TouchableOpacity>
              <Text style={styles.txtFinger}>Sentuh sensor sidik jari</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  txtFinger: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: '400',
  },
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
