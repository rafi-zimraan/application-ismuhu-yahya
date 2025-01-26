import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const fetchGetYaumi = async (id_user, haid = 0) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(
      `micro-yaumis/user/${id_user}?haid=${haid}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    return response.data || {};
  } catch (error) {
    if (error.response?.status === 404) {
      ToastAndroid.show(
        'data tidak ditemukan. Silakan hubungi developer.',
        ToastAndroid.SHORT,
      );
    } else if (error.response?.status === 500) {
      ToastAndroid.show(
        'Kesalahan server. Silakan coba lagi nanti.',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show('Terjadi kesalahan pada amalyaumi', ToastAndroid.LONG);
    }
    throw error;
  }
};

export const addYaumiNotes = async (user_id, datas) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token kedaluwarsa, silakan login terlebih dahulu');

    const response = await api.post(
      'yaumi-notes',
      {
        user_id,
        datas,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    return response.data || {};
  } catch (error) {
    if (error.response?.status === 404) {
      ToastAndroid.show(
        'data tidak ditemukan. Silakan hubungi developer.',
        ToastAndroid.SHORT,
      );
    } else if (error.response?.status === 500) {
      ToastAndroid.show(
        'Kesalahan server. Silakan coba lagi nanti.',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show('Terjadi kesalahan pada amalyaumi', ToastAndroid.LONG);
    }
    throw error;
  }
};

export const fetchMonthlyReportYaumi = async user_id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`mobile/report-yaumis/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || {};
  } catch (error) {
    console.log('error', error.message);
    if (error.response?.status === 404) {
      ToastAndroid.show(
        'Data tidak ditemukan. Silakan hubungi developer.',
        ToastAndroid.SHORT,
      );
    } else if (error.response?.status === 500) {
      ToastAndroid.show(
        'Kesalahan server. Silakan coba lagi nanti.',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show('Terjadi kesalahan pada amalyaumi', ToastAndroid.LONG);
    }
    throw error;
  }
};
