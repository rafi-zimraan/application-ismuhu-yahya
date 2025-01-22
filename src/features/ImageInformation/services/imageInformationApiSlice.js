import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const getAllImageInformation = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, Silahkan login terlebih dahulu');
    }

    const response = await api.get('mobile/image-information/list', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    const data = response?.data?.data;
    if (data) {
      return data;
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (error) {
    // if (error.response) {
    //   console.log(error.response?.data?.message || 'Terjadi Kesalahan');
    // } else {
    //   console.log(error.message);
    // }
    throw error;
  }
};

export const addImageInformation = async (idInformation, imageData) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, Silahkan login terlebih dahulu');
    }

    const response = await api.post(
      `image-information/${idInformation}/add`,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error(
        response.data?.message || 'Gagal menambah data image information',
      );
    }
  } catch (error) {
    // if (error.message) {
    //   console.log(error.response?.data?.message || 'Terjadi kesalahan');
    // } else {
    //   console.log(error.message);
    // }
    throw error;
  }
};

export const getAllDetailInformation = async idInformation => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, Silahkan login terlebih dahulu');
    }

    const response = await api.get(`informations/${idInformation}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    const data = response.data;

    if (data) {
      return data;
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (error) {
    // if (error.response) {
    //   console.log(error.response?.data?.message || 'Terjadi kesalahan');
    // } else {
    //   console.log(error.message);
    // }
    throw error;
  }
};
