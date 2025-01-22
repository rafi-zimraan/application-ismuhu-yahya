import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {openInbox} from 'react-native-email-link';
import {ButtonAction, Gap, HeaderTransparent} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CheckOtpEmail({route}) {
  const {email} = route.params;
  const navigation = useNavigation();

  const handleOpenInbox = () => {
    openInbox()
      .then(() => {
        navigation.navigate('OtpForgotPassword', {email});
      })
      .catch(err => {
        console.log('Gagal membuka aplikasi email:', err);
        ToastAndroid.show(
          'Gagal membuka aplikasi email. Silakan buka secara manual.',
          ToastAndroid.SHORT,
        );
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'default'} />
      <View style={styles.body}>
        <HeaderTransparent
          title="Periksa Email"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Gap height={55} />
          <Text style={styles.title}>Periksa email Anda.</Text>
          <Gap height={15} />
          <Text style={styles.description}>
            Silakan ketuk tautan tersebut untuk memverifikasi email Anda dan
            masuk ke aplikasi.
          </Text>

          <Gap height={25} />

          <ButtonAction title="Buka email Anda" onPress={handleOpenInbox} />

          <Gap height={20} />
          <Text style={styles.footerText}>
            Kami telah mengirim email verifikasi ke alamat yang Anda masukkan
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.goldenOrange,
  },
  body: {
    backgroundColor: COLORS.white,
    flex: 1,
    position: 'relative',
    top: 120,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xxxxxl,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  description: {
    color: COLORS.grey,
    fontSize: DIMENS.m,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    color: COLORS.grey,
    fontSize: DIMENS.s,
    paddingHorizontal: 45,
    fontWeight: '400',
    textAlign: 'center',
  },
});
