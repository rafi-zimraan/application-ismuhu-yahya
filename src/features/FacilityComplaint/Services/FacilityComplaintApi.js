import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const getAllSuggestions = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('suggestions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response?.data) {
      return response.data;
    } else {
      throw new Error('Data saran dan pengaduan tidak ditemukan');
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

// Add Suggestion
export const addSuggestion = async data => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post('suggestions', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal menambahkan saran dan pengaduan');
    }
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Get Suggestion Detail
export const getSuggestionDetail = async id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`suggestions/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Detail saran dan pengaduan tidak ditemukan');
    }
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Update Suggestion
export const updateSuggestion = async (id, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(`suggestions/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal memperbarui saran dan pengaduan');
    }
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete Suggestion
export const deleteSuggestion = async id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`suggestions/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal menghapus saran dan pengaduan');
    }
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};
