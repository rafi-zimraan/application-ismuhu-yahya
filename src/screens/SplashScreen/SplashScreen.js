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
import {AppVersion} from '../../Component';
import {ICON_SPLASS} from '../../assets';
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
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View style={styles.container}>
        <Image source={ICON_SPLASS} style={styles.img} />
        <View style={{bottom: 100}}>
          <ActivityIndicator
            size={'large'}
            animating={true}
            color={COLORS.gold}
          />
        </View>
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
    top: 60,
    width: '100%',
    height: '56%',
  },
});
