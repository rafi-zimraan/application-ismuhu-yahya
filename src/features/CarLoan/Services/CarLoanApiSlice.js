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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const getCarLoanHistory = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');

    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('micro-loan/history', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status) {
      return response.data.data;
    } else {
      console.log('Gagal memuat data histori peminjaman');
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

export const addCarLoan = async loanData => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const formData = new FormData();
    formData.append('car_id', loanData.car_id);
    formData.append('loan_date', loanData.loan_date);
    formData.append('use_date', loanData.use_date);
    formData.append('return_date', loanData.return_date);
    formData.append('loaner', loanData.loaner);
    formData.append('current_km', loanData.current_km);
    formData.append('time_use', loanData.time_use);
    formData.append('time_return', loanData.time_return);
    formData.append('necessity', loanData.necessity);

    if (loanData.photo_sim_a) {
      formData.append('photo_sim_a', {
        uri: loanData.photo_sim_a.uri,
        name: loanData.photo_sim_a.name,
        type: loanData.photo_sim_a.type,
      });
    }

    if (loanData.desc) {
      formData.append('desc', loanData.desc);
    }

    const response = await api.post('loan-cars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const getCarLoanDetail = async loanId => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`mobile/loan-cars/${loanId}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status) {
      return response.data.data;
    } else {
      console.log('Failed to load car loan detail');
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

export const getMostCarLoans = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('mobile/micro-loan/loan-count', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data) {
      return Object.values(response.data);
    } else {
      console.log('Failed to load most car loans data');
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

export const getUserCarLoans = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');

    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get('mobile/user-loan', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status) {
      return response.data.data;
    } else {
      console.log('Gagal memuat data peminjaman per user');
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
