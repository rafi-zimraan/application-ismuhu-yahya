import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AppVersion, Gap} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {COLORS} from '../../utils';

export default function SplashScreen({navigation}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function statusUserChecking() {
      setLoading(true);
      try {
        const storedCredential = await EncryptedStorage.getItem('token');
        const onboarding = await EncryptedStorage.getItem('is_boarding');
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
        ToastAndroid.show(
          'Terjadi kesalahan saat di Splashscreen',
          ToastAndroid.SHORT,
        );
      }
    }
    statusUserChecking();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View style={styles.container}>
        <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />
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
    resizeMode: 'cover',
  },
});
