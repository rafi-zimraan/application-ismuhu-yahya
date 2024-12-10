import {ToastAndroid} from 'react-native';
import api from '../../../utils/axiosInstance';

// Presence Fingerprint
export const fingerPresence = async finger => {
  try {
    const response = await api.post('/presence', {finger: finger});

    console.log('RESPONSE FINGER:', response.data);

    if (response.data?.status) {
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
    } else if (
      response.data?.message.includes('Data Anda Telah Berhasil Tersimpan')
    ) {
      // Menampilkan pesan spesifik untuk presensi sebelumnya
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
    } else {
      throw new Error(response.data?.message || 'Error fingerprint!');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      console.log('ERROR MESSAGE:', errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};

export const createFinger = async (finger, user_id) => {
  try {
    const response = await api.post('/create-finger', {
      finger: finger,
      user_id: user_id,
    });

    if (response.status === 503) {
      throw new Error(
        'server sedang dalam perawatan atau sibuk. silahkan coba lagi nanti.',
      );
    }
    console.log('RESPONSE CREATE FINGER:', response.data);

    const name = response.data?.user?.name;
    const saveFinger = response.data?.user?.finger;

    if (response?.data?.message === 'Data Anda Telah Berhasil Tersimpan') {
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
      return {success: true, saveFinger, name};
    } else if (response?.data?.message === 'Anda Sudah Mendaftar Sebelumnya') {
      ToastAndroid.show('Fingerprint sudah terdaftar', ToastAndroid.SHORT);
      return {success: false};
    } else {
      throw new Error(response.data?.message || 'Error saat menyimpan data');
    }
  } catch (error) {
    if (error.response && error.response.status === 503) {
      ToastAndroid.show(
        'Server sedang dalam perawatan atau sibuk. Silakan coba lagi nanti.',
        ToastAndroid.LONG,
      );
    } else if (error.response) {
      console.log('ERROR API RESPONSE CREATE:', error.response?.data?.message);
      ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
    } else {
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
    return {success: false};
  }
};

// Fungsi untuk menangani presensi dengan QR Code
export const qrCodePresence = async (id_user, qrCodeValue) => {
  try {
    const response = await api.post(`/api/presences/qrcode/${id_user}`, {
      qr_code: qrCodeValue,
    });

    console.log('RESPONSE QR CODE:', response.data);

    if (response.data?.status) {
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
    } else if (
      response.data?.message.includes('Data Anda Telah Berhasil Tersimpan')
    ) {
      // Menampilkan pesan spesifik untuk presensi sebelumnya
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
    } else {
      throw new Error(response.data?.message || 'Error QR Code Presence!');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      console.log('ERROR MESSAGE:', errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};
