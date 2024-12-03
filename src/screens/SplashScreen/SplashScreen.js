import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
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
            console.log('tokenlogin', storedCredential);
            navigation.replace('Dasboard');
          } else if (!onboarding) {
            console.log('onboarding', onboarding);
            navigation.replace('Onboarding');
          } else {
            console.log('No token, but onboarding completed');
            navigation.replace('SignIn');
          }
        }, 2000);
      } catch (error) {
        console.log('error masbro', error);
      }
    }
    statusUserChecking();
  }, [navigation]);

  return (
    // <ImageBackground
    //   source={IMG_YELLOWWISH_FRIST}
    //   style={styles.background}
    //   resizeMode="cover">
    // </ImageBackground>

    <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.background}>
      <View style={styles.container}>
        <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />
        <Gap height={25} />
        <ActivityIndicator
          size={'large'}
          animating={loading}
          color={COLORS.gold}
        />
      </View>
      <AppVersion />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 380,
    height: 260,
  },
});
