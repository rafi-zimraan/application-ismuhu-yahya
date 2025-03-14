import React, {useState} from 'react';
import {StatusBar, StyleSheet, ToastAndroid, View} from 'react-native';
import {HeaderTransparent} from '../../Component';
import {
  EmailVerificationInput,
  sendVerificationEmail,
} from '../../features/ForgotPassword';
import {COLORS} from '../../utils';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleSendEmail = async () => {
    if (!email) {
      showToast('Harap masukkan email Anda.');
      return;
    }
    if (!email.includes('@')) {
      showToast('Format email tidak valid. Harap masukkan email yang benar.');
      return;
    }
    try {
      setLoading(true);
      const response = await sendVerificationEmail(email);
      showToast(response?.message);
      navigation.navigate('CheckOtpEmail', {email});
    } catch (error) {
      showToast('Gagal mengirim email. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'default'} />
      <View style={styles.body}>
        <HeaderTransparent
          title="Atur Ulang Email"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <EmailVerificationInput
          onChangeText={text => setEmail(text)}
          loading={loading}
          onPress={handleSendEmail}
          value={email}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    top: 120,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.goldenOrange,
  },
});
