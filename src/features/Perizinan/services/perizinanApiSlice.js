import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const getAllCuti = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('mobile/cutis', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const data = response.data;

    if (data) {
      return data;
    } else {
      throw new Error('Data cuti tidak ditemukan');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
  }
};

export const deleteCuti = async id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`mobile/cutis/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal menghapus data cuti');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    return false;
  }
};

export const patchCuti = async (id, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(`mobile/cutis/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal edit data cuti');
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

export const addCuti = async data => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post('mobile/cutis', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Gagal menambahkan data cuti');
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

export const getAllPerizinanKeluar = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('lisences', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const dataAll = response.data;

    if (dataAll) {
      return dataAll;
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
  }
};

export const deletePerizinanKeluar = async id => {
  try {
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
      return response.data;
    } else {
      throw new Error('Gagal menghapus data');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    return false;
  }
};

export const patchPerizinanKeluar = async (id, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(`lisences/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal edit perizinan keluar');
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

export const addPerizinanKeluar = async data => {
  try {
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
      throw new Error(
        response.data?.message || 'Gagal menambahkan perizinan keluar',
      );
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
