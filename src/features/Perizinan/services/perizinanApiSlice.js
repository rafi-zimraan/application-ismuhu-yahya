import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

// All Data Perizinan
export const getAllPerizinan = async () => {
  try {
    // take it token from encryptedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token tidak ada, silahkan login terlebih dahulu');
    }
    // add token to api
    const response = await api.get('/lisences', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const getDataHistory = response.data;
    // console.log('response :', getDataHistory);
    if (getDataHistory) {
      return getDataHistory;
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (error) {
    if (error.response) {
      ToastAndroid.show(
        error.response?.data?.message || 'Terjadi Kesalahan',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};
