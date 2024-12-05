import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../utils/axiosInstance';

// Ambil semua data divisi
export const getAllDivisions = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('divisions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Data tidak ditemukan');
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

// Tambah data divisi
export const addDivision = async name => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      'divisions',
      {name},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal menambahkan divisi');
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

// Ambil detail data divisi
export const getDivisionDetail = async id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`divisions/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Data tidak ditemukan');
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

// Update data divisi
export const updateDivision = async (id, name) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(
      `divisions/${id}`,
      {name},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal mengupdate divisi');
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

// Hapus data divisi
export const deleteDivision = async id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`divisions/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data?.message || 'Data berhasil dihapus';
    } else {
      throw new Error(response.data?.message || 'Gagal menghapus divisi');
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
