import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const sendVerificationEmail = async email => {
  try {
    // Ambil token dari EncryptedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      '/api/mobile/forgot-password/send-email',
      {email},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    console.log('RESPONSE SEND EMAIL:', response.data);

    if (response.data?.status) {
      console.log(response.data?.message);
      return response.data;
    } else {
      throw new Error(
        response.data?.message || 'Gagal mengirim email verifikasi!',
      );
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      console.log('ERROR MESSAGE SEND EMAIL:', errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
    }
    throw error;
  }
};

// Verifikasi Kode OTP
export const verifyOtpCode = async (email, code) => {
  try {
    // Ambil token dari EncryptedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      '/api/mobile/forgot-password/verify-otp',
      {
        email,
        code,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    console.log('RESPONSE VERIFY OTP:', response.data);

    if (response.data?.status) {
      console.log(response.data?.message);
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Kode OTP tidak valid!');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      console.log('ERROR MESSAGE VERIFY OTP:', errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
    }
    throw error;
  }
};
