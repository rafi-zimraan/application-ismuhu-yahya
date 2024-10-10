import {Alert, ToastAndroid} from 'react-native';
import {postPasswordRecovery} from '../../../utils/@APIs';
import {SetStatusRecovery} from './authSlice';

const showToast = (message, duration = 'SHORT') => {
  ToastAndroid.show(message, ToastAndroid[duration]);
};

export const fetchPasswordRecovery = formData => async dispatch => {
  try {
    const {data} = await postPasswordRecovery(formData);

    if (data?.message === 'Password berhasil diubah') {
      // Tampilkan alert ketika kata sandi berhasil diperbarui
      Alert.alert(
        'Kata Sandi Diperbarui',
        'Kembali ke halaman login untuk masuk.',
      );
      // Update status recovery di Redux
      dispatch(SetStatusRecovery('success'));
    } else if (data?.message === 'Email yang Anda masukkan belum terdaftar') {
      // Tampilkan pesan Toast jika email tidak terdaftar
      showToast('Email tidak terdaftar');
      dispatch(SetStatusRecovery('failed'));
    } else {
      // Tampilkan pesan Toast jika terjadi kesalahan lainnya
      showToast(`Terjadi kesalahan: ${data?.message}`);
      dispatch(SetStatusRecovery('failed'));
    }
  } catch (error) {
    console.log('auth/fetchPasswordRecovery', error?.message);
    // Tampilkan pesan Toast jika terjadi kesalahan jaringan atau lainnya
    showToast(`Terjadi kesalahan: ${error?.message}`, 'LONG');
    dispatch(SetStatusRecovery('failed'));
  }
};
