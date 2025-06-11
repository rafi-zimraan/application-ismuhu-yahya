import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {AppVersion, Gap} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {setTheme} from '../../features/theme';
import {COLORS} from '../../utils';
import {setBiometricEnabled} from '../../features/Profile';

export default function SplashScreen({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View style={styles.container}>
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
      <AppVersion />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.white,
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
