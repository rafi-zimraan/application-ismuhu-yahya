import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

// All Data Perizinan
export const getAllPerizinan = async () => {
  try {
    // take it token from encryptedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }
    // add token to api
    const response = await api.get('lisences', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const getDataHistory = response.data;
    if (getDataHistory) {
      return getDataHistory;
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi Kesalahan');
    } else {
      console.log(error.message);
    }
  }
};

// Delete data perizinan
export const deleteDataPerizinan = async id => {
  try {
    // take it token from encryptedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`lisences/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      const message = response.data?.message;
      console.log(message);
      return true;
    } else {
      throw new Error('Gagal menghapus data');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
    return false;
  }
};

// Patch edit data perizinan
export const patchPerizinan = async (id, data) => {
  try {
    // take it from encrytedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(`lisences/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    console.log('response api', response);

    if (response.data?.status === true) {
      const message = response.data?.message;
      console.log(message);
      return response.data; // Tambahkan return response.data di sini
    } else {
      throw new Error('Gagal edit perizinan');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message, 'error message');
    }
    throw error;
  }
};

// Tambah data perizinan
export const addPerizinan = async data => {
  try {
    // Ambil token dari EncryptedStorage
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post('lisences', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Gagal menambahkan perizinan');
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
