import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {verifyOtpCode} from '../services/ForgotApiSlice';

export default function OtpForgotPassword({route}) {
  const navigation = useNavigation();
  const {email} = route.params;
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      const nextInput = `otp-${index + 1}`;
      const nextField = global[nextInput];
      if (nextField) {
        nextField.focus();
      }
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      showToast('Harap masukkan kode OTP yang lengkap.');
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOtpCode(email, otpCode);

      if (response?.used) {
        showToast('Kode OTP telah digunakan. Silakan minta kode baru.');
        return;
      }

      if (response?.token) {
        await EncryptedStorage.setItem('token', JSON.stringify(response.token));
        setToken(response.token);
        setModalVisible(true);
      }
    } catch (error) {
      const statusCode = error.response?.status;
      if (statusCode === 404) {
        showToast('Terdapat kesalahan dari server.');
      } else if (statusCode === 500) {
        showToast('Harap hubungi developer untuk bantuan lebi lanjut.');
      } else {
        showToast(error.message || 'Verifikasi OTP gagal.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = () => {
    ToastAndroid.show('Nantinkan fitur terbarunya yaa 🤗', ToastAndroid.SHORT);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (token) {
      navigation.replace('Dasboard', {token});
    }
  };

  return (
    <View style={styles.container}>
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onOutContentPress={() => setModalVisible(false)}
        title="Berhasil Verifikasi!"
        description="Kode OTP Anda valid. Anda sekarang dapat melanjutkan ke proses masuk."
        iconModalName="check-circle-outline"
        ColorIcon={COLORS.greenBoy}
        buttonTitle="Oke"
        buttonSubmit={handleModalClose}
      />
      <View style={styles.body}>
        <HeaderTransparent
          title="Periksa Email"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <Gap height={40} />
        <Text style={styles.title}>Masukkan kode OTP</Text>
        <Gap height={10} />
        <Text style={styles.subtitle}>
          Silakan masukkan kode yang kami kirim ke{' '}
          <Text style={styles.email}>{email}</Text>
        </Text>
        <Gap height={20} />

        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={input => (global[`otp-${index}`] = input)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={text => handleChangeText(text, index)}
            />
          ))}
        </View>

        <Gap height={30} />
        <ButtonAction
          title={loading ? 'Memverifikasi...' : 'Verifikasi'}
          onPress={handleVerifyOtp}
          disabled={loading}
        />

        <Gap height={15} />
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Tidak menerima? </Text>
          <TouchableOpacity onPress={handleResendEmail}>
            <Text
              style={[
                styles.resendText,
                {textDecorationLine: 'underline', color: COLORS.goldenOrange},
              ]}>
              Kirim ulang email baru
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  container: {
    flex: 1,
    backgroundColor: COLORS.goldenOrange,
  },
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.grey,
    fontSize: DIMENS.m,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  email: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  otpInput: {
    width: 40,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.goldenOrange,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
  },
  resendText: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
