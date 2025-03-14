import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const apiChangePassword = async (password, passwordConfirmation) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    const idUser = await EncryptedStorage.getItem('idUser');

    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }
    if (!idUser) {
      throw new Error('ID pengguna tidak ditemukan, silahkan login kembali');
    }

    const response = await api.post(
      `mobile/change-password/${JSON.parse(idUser)}`,
      {
        password: password,
        password_confirmation: passwordConfirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Gagal mengubah password');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
    throw error;
  }
};
