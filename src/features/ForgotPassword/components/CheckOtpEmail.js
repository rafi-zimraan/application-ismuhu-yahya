import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {openInbox} from 'react-native-email-link';
import {ButtonAction, Gap, Text, View} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CheckOtpEmail({route}) {
  const {email} = route.params;
  const navigation = useNavigation();

  const handleOpenInbox = () => {
    openInbox()
      .then(() => {
        navigation.navigate('OtpForgotPassword', {email});
      })
      .catch(err => {
        ToastAndroid.show(
          'Gagal membuka aplikasi email. Silakan buka secara manual.',
          ToastAndroid.SHORT,
        );
      });
  };

  return (
    <View style={styles.container} useBackroundHeaderImageSignIn={true}>
      <StatusBar backgroundColor={'transparent'} barStyle={'default'} />
      <View style={styles.body} section={true}>
        <View style={styles.viewHeader} section={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.viewHeader}>
            <Icon
              name={'arrow-left-circle-outline'}
              size={30}
              color={COLORS.black}
            />
            <Gap width={10} />
            <Text style={styles.txtEmail}>Periksa Email</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content} section={true}>
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
  viewHeader: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  txtEmail: {
    fontSize: DIMENS.xl,
    fontWeight: '400',
  },
  container: {
    flex: 1,
  },
  body: {
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
    fontSize: DIMENS.m,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: DIMENS.s,
    paddingHorizontal: 45,
    fontWeight: '400',
    textAlign: 'center',
  },
});
