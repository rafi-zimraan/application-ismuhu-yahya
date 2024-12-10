import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../utils/axiosInstance';

// get all data departments
export const getAllDepartment = async () => {
  try {
    // get token
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terbaru');
    }

    const response = await api.get('departments', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (err) {
    if (response.err) {
      console.log(err.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(err.message);
    }
  }
};

// add data departmants
export const addDepartmant = async (name, divisionId) => {
  try {
    // get token
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terbaru');
    }

    const response = await api.post(
      'departments',
      {name, division_id: divisionId},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal menambahkan departments');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
  }
};

// get data detail departments
export const getDepartmentDetail = async id => {
  try {
    // get token
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terbaru');
    }

    const response = await api.get(`departments/${id}`, {
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
  }
};

// update data departments
export const updateDepartment = async (id, data) => {
  try {
    // get token
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terbaru');
    }

    const response = await api.patch(`departments/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal mengupdate departemen');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
  }
};

// delete data department
export const deleteDepartment = async id => {
  try {
    // get token
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terbaru');
    }

    const response = await api.delete(`departments/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return response.data?.message || 'Data berhasil dihapus';
    } else {
      throw new Error(response.data?.message || 'Gagal menghapus departemen');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
  }
};
