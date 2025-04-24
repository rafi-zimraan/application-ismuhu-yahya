import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const getListCars = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');

    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('mobile/list-cars');

    if (response.data?.status) {
      return response.data.data;
    } else {
      console.log('Gagal memuat data daftar mobile');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      console.log(errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
    }
  }
};

export const addCar = async carData => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const formData = new FormData();
    formData.append('name', carData.name);
    formData.append('number_plate', carData.number_plate);
    formData.append('color', carData.color);
    formData.append('count_seat', carData.count_seat);
    formData.append('type_transmission', carData.type_transmission);

    if (carData.photo) {
      formData.append('photo', {
        uri: carData.photo.uri,
        name: carData.photo.name,
        type: carData.photo.type,
      });
    }

    const response = await api.post('cars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
    console.log(errorMessage);
    throw error;
  }
};

export const getCarDetail = async id_car => {
  try {
    const token = await EncryptedStorage.getItem('token');

    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }
    const response = await api.get(`cars/${id_car}`);
    if (response.data?.status) {
      return response.data;
    } else {
      throw new Error('Gagal mengambil detail mobil!');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const updateCar = async (id_car, updatedData) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('number_plate', updatedData.number_plate);
    formData.append('color', updatedData.color);
    formData.append('count_seat', updatedData.count_seat);
    formData.append('type_transmission', updatedData.type_transmission);

    if (updatedData.photo) {
      formData.append('photo', {
        uri: updatedData.photo.uri,
        name: updatedData.photo.name,
        type: updatedData.photo.type,
      });
    }

    const response = await api.patch(`cars/${id_car}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
    console.log(errorMessage);
    throw error;
  }
};

export const deteleCar = async id_car => {
  try {
    const token = await EncryptedStorage.getItem('token');

    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`cars/${id_car}`);

    if (response.data?.status) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Gagal menghapus data mobil!');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
    console.log(errorMessage);
    throw error;
  }
};

export const searchCarByName = async searchName => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('mobile/list-cars', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      params: {
        s_name: searchName,
      },
    });

    if (response.data?.status) {
      return response.data.data;
    } else {
      console.log('Gagal memuat data hasil pencarian mobil');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response?.data?.message || 'Terjadi kesalahan saat pencarian';
      console.log(errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
    }
    throw error;
  }
};
