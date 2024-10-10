import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AppVersion, Gap} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT, IMG_YELLOWWISH_FRIST} from '../../assets';
import {COLORS} from '../../utils';

export default function SplashScreen({navigation}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function statusUserChecking() {
      setLoading(true);

      try {
        const storedCredential = await EncryptedStorage.getItem('Credential');

        setTimeout(() => {
          if (storedCredential) {
            const credential = JSON.parse(storedCredential);
            if (credential.isFirstLogin) {
              navigation.replace('Dasboard');
            } else {
              navigation.replace('SignIn');
            }
          } else {
            navigation.replace('SignIn');
          }
        }, 3000);
      } catch (error) {
        console.log('error masbro', error);
      }
    }
    statusUserChecking();
  }, [navigation]);

  return (
    <ImageBackground
      source={IMG_YELLOWWISH_FRIST}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />
        <Gap height={25} />
        <ActivityIndicator
          size={'large'}
          animating={loading}
          color={COLORS.gold}
        />
      </View>
      <AppVersion />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 390,
    height: 290,
  },
});
