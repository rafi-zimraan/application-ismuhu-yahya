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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};
