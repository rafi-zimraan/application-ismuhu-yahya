import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {ButtonAction, Gap, HeaderTransparent} from '../../Component';
import {sendVerificationEmail} from '../../features/ForgotPassword';
import {COLORS, DIMENS} from '../../utils';

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

      if (response?.status) {
        showToast(response?.message);
        navigation.navigate('CheckOtpEmail', {email});
      } else {
        showToast('Gagal mengirim email. Silakan coba lagi.');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log('Error from server', error.response.data.message);
      } else {
        console.log('Err code', error.message);
      }
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
        <View style={styles.contentEmail}>
          <Gap height={55} />
          <Text style={styles.title}>Konfirmasi Identitas Anda</Text>
          <Gap height={15} />
          <Text style={styles.description}>
            Harap verifikasi email Anda untuk melanjutkan
          </Text>

          <Gap height={15} />

          <Text style={[styles.emailTxt, {alignSelf: 'flex-start'}]}>
            Email
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="email@gmail.com"
              placeholderTextColor={COLORS.grey}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Gap height={5} />

          <ButtonAction
            title={loading ? 'Sedang Memuat...' : 'Kirim'}
            onPress={handleSendEmail}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emailTxt: {
    fontSize: DIMENS.l,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    color: COLORS.black,
    borderRadius: 8,
    padding: 10,
    fontSize: DIMENS.l,
  },
  contentEmail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xxxxl,
    fontWeight: 'bold',
  },
  description: {
    color: COLORS.grey,
    fontSize: DIMENS.xl,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
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
