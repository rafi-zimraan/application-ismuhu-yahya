import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {setTheme} from '../../features/theme';
import {COLORS} from '../../utils';
import {setBiometricEnabled} from '../../features/Profile';
import {View} from '../../Component';

export default function SplashScreen({navigation}) {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.theme);
  const [loading, setLoading] = useState(false);
  // const [showUpdate, setShowUpdate] = useState(false);

  // const latestVersion = '1.6-simpondok'; // <- kamu tetapkan manual
  // const currentVersion = version.appVersion;

  // const isOutdated = (current, latest) => {
  //   const parse = v => v.split('-')[0].split('.').map(Number);
  //   const [cMaj, cMin, cPatch] = parse(current);
  //   const [lMaj, lMin, lPatch] = parse(latest);

  //   if (cMaj < lMaj) return true;
  //   if (cMaj === lMaj && cMin < lMin) return true;
  //   if (cMaj === lMaj && cMin === lMin && cPatch < lPatch) return true;
  //   return false;
  // };

  // const statusUserChecking = async () => {
  //   setLoading(true);
  //   try {
  //     const [storedCredential, onboarding, theme, biometric] =
  //       await Promise.all([
  //         EncryptedStorage.getItem('token'),
  //         EncryptedStorage.getItem('is_boarding'),
  //         EncryptedStorage.getItem('theme_mode'),
  //         EncryptedStorage.getItem('biometric_enabled'),
  //       ]);

  //     if (theme) dispatch(setTheme(theme));
  //     dispatch(setBiometricEnabled(biometric === 'true'));

  //     setTimeout(() => {
  //       if (storedCredential) {
  //         navigation.replace('Dasboard');
  //       } else if (!onboarding) {
  //         navigation.replace('Onboarding');
  //       } else {
  //         navigation.replace('SignIn');
  //       }
  //     }, 2000);
  //   } catch (error) {
  //     console.log('err splash', error);
  //   }
  // };

  // useEffect(() => {
  //   if (isOutdated(currentVersion, latestVersion)) {
  //     setShowUpdate(true);
  //   } else {
  //     statusUserChecking();
  //   }
  // }, []);

  useEffect(() => {
    async function statusUserChecking() {
      setLoading(true);
      try {
        const [storedCredential, onboarding, theme, biometric] =
          await Promise.all([
            EncryptedStorage.getItem('token'),
            EncryptedStorage.getItem('is_boarding'),
            EncryptedStorage.getItem('theme_mode'),
            EncryptedStorage.getItem('biometric_enabled'),
          ]);

        if (theme) {
          dispatch(setTheme(theme));
        }
        dispatch(setBiometricEnabled(biometric === 'true'));

        setTimeout(() => {
          if (storedCredential) {
            navigation.replace('Dasboard');
          } else if (!onboarding) {
            navigation.replace('Onboarding');
          } else {
            navigation.replace('SignIn');
          }
        }, 2000);
      } catch (error) {
        console.log('err splash', error);
      }
    }
    statusUserChecking();
  }, [navigation]);

  return (
    <View style={styles.background} section={true}>
      <StatusBar
        barStyle={mode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={'transparent'}
      />
      <View style={styles.container} section={true}>
        <Image
          source={IMG_ISMUHUYAHYA_POTRAIT}
          style={styles.img}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <Gap height={15} />
        {loading && (
          <ActivityIndicator
            size={'large'}
            animating={true}
            color={COLORS.goldenOrange}
          />
        )}
      </View>

      {/* MODAL UPDATE */}
      {/* <BottomSheetUpdate
        isVisible={showUpdate}
        onClose={() => {
          setShowUpdate(false);
          statusUserChecking();
        }}
        onUpdate={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.ismuhuyahyadev&hl=id',
          );
        }}
        updatedAt="29 Juli 2025"
      /> */}

      {/* <ModalCustom
        visible={showUpdate}
        iconModalName="update" // atau icon lain sesuai selera
        title="Update Tersedia!"
        description="Silakan perbarui aplikasi ke versi terbaru di Play Store untuk melanjutkan."
        buttonTitle="Perbarui Sekarang"
        buttonSubmit={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.ismuhuyahyadev&hl=id',
          );
        }}
        onRequestClose={() => {
          setShowUpdate(false);
          statusUserChecking(); // lanjut jika user menutup modal
        }}
        onOutContentPress={() => {
          setShowUpdate(false);
          statusUserChecking(); // lanjutkan juga jika tap di luar modal
        }}
        ColorIcon={COLORS.warning}
        BackgroundButtonAction={COLORS.goldenOrange}
        TextColorButton={'white'}
        TextDescription={COLORS.black}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 320,
    height: 230,
  },
});
