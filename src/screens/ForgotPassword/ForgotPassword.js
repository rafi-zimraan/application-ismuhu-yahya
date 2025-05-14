import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Gap} from '../../Component';
import {
  EmailVerificationInput,
  sendVerificationEmail,
} from '../../features/ForgotPassword';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, DIMENS} from '../../utils';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../Component';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type, // 'success', 'error', 'info'
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
    // ToastAndroid.show(message, ToastAndroid.SHORT);
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
            <Text style={styles.txtEmail}>Atur Ulang Email</Text>
          </TouchableOpacity>
        </View>

        <EmailVerificationInput
          onChangeText={text => setEmail(text)}
          loading={loading}
          onPress={handleSendEmail}
          value={email}
        />
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
  body: {
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    top: 120,
  },
  container: {
    flex: 1,
  },
});
