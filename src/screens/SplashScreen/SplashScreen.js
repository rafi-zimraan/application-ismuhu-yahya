import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppVersion, Gap} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {setTheme} from '../../features/theme';
import {COLORS} from '../../utils';
import {setBiometricEnabled} from '../../features/Profile';
import {View, Text} from '../../Component';

export default function SplashScreen({navigation}) {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.theme);
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
