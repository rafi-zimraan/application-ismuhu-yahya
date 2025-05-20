import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  ButtonAction,
  Gap,
  ModalCustom,
  Text,
  toastConfig,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {verifyOtpCode} from '../services/ForgotApiSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

export default function OtpForgotPassword({route}) {
  const navigation = useNavigation();
  const {email} = route.params;
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
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

  const handleResendEmail = () => {
    showToast('Nantikan fitur terbarunya yaa 🤗');
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (token) {
      navigation.replace('Dashboard', {token});
    }
  };

  const maskEmail = email => {
    if (!email.includes('@')) return email;

    const [localPart, domain] = email.split('@');
    const visiblePart = localPart.slice(0, 3);
    return `${visiblePart}****@${domain}`;
  };

  return (
    <View style={styles.container} useBackroundHeaderImageSignIn={true}>
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
            <Text style={styles.txtEmail}>Kode Otp</Text>
          </TouchableOpacity>
        </View>

        <Gap height={40} />
        <Text style={styles.title}>Masukkan kode OTP</Text>
        <Gap height={10} />
        <Text style={styles.subtitle}>
          Silakan masukkan kode yang kami kirim ke{' '}
          <Text style={styles.email}>{maskEmail(email)}</Text>
        </Text>
        <Gap height={20} />

        <View style={styles.otpContainer} section={true}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={text => handleChangeText(text, index)}
              onKeyPress={event => handleKeyPress(event, index)}
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
        <View style={styles.resendContainer} section={true}>
          <Text style={styles.resendText}>Tidak menerima otp? </Text>
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
      <Toast config={toastConfig} />
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    position: 'relative',
    top: 120,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: DIMENS.m,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  email: {
    fontWeight: 'bold',
    fontSize: DIMENS.m,
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
    fontSize: DIMENS.xxl,
    color: COLORS.black,
  },
  resendText: {
    fontSize: DIMENS.s,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
