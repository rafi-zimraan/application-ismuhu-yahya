import {ToastAndroid} from 'react-native';
import api from '../../../utils/axiosInstance';

// Presence Fingerprint
export const fingerPresence = async finger => {
  try {
    const response = await api.post('/presence', {finger: finger});

    console.log('RESPONSE FINGER:', response.data);

    if (response.data?.status) {
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
    } else if (
      response.data?.message.includes('Data Anda Telah Berhasil Tersimpan')
    ) {
      // Menampilkan pesan spesifik untuk presensi sebelumnya
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
    } else {
      throw new Error(response.data?.message || 'Error fingerprint!');
    }
  } catch (error) {
    if (error.response) {
      // Menampilkan pesan error spesifik dari API
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      console.log('ERROR MESSAGE:', errorMessage);
    } else {
      // Menampilkan pesan kesalahan umum
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};

export const createFinger = async (finger, user_id) => {
  try {
    const response = await api.post('/create-finger', {
      finger: finger,
      user_id: user_id,
    });

    if (response.status === 503) {
      throw new Error(
        'server sedang dalam perawatan atau sibuk. silahkan coba lagi nanti.',
      );
    }
    console.log('RESPONSE CREATE FINGER:', response.data);

    const name = response.data?.user?.name;
    const saveFinger = response.data?.user?.finger;

    if (response?.data?.message === 'Data Anda Telah Berhasil Tersimpan') {
      ToastAndroid.show(response.data?.message, ToastAndroid.SHORT);
      return {success: true, saveFinger, name}; // Mengembalikan finger jika berhasil
    } else if (response?.data?.message === 'Anda Sudah Mendaftar Sebelumnya') {
      ToastAndroid.show('Fingerprint sudah terdaftar', ToastAndroid.SHORT);
      return {success: false}; // Indikasi bahwa fingerprint sudah terdaftar
    } else {
      throw new Error(response.data?.message || 'Error saat menyimpan data');
    }
  } catch (error) {
    if (error.response && error.response.status === 503) {
      // Khusus untuk error 503
      console.log('ERROR API RESPONSE CREATE: 503 Service Unavailable');
      ToastAndroid.show(
        'Server sedang dalam perawatan atau sibuk. Silakan coba lagi nanti.',
        ToastAndroid.LONG,
      );
    } else if (error.response) {
      // VALIDASI ERROR RESPONSE API
      console.log('ERROR API RESPONSE CREATE:', error.response?.data?.message);
      ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
    } else {
      // VALIDASI ERROR DEVELOPER
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
    return {success: false};
  }
};

// Get user data based on division and department
export const getUserFromDepartment = async (id_division, id_department) => {
  try {
    const response = await api.get(
      `/user/division/${id_division}/department/${id_department}`,
    );
    // console.log('USER DATA:', response.data.data);
    return response.data?.data;
  } catch (error) {
    if (error.response) {
      // VALIDASI ERROR RESPONSE API
      console.log('ERROR API RESPONSE:', error.response.data);
      ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
    } else {
      // VALIDASI ERROR DEVELOPER
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};

// Data Divisi
export const getAllDivision = async () => {
  try {
    const response = await api.get('/data-division');
    // console.log('response data divisi', response.data?.data);
    const division = response.data?.data;
    if (division) {
      return division;
    } else {
      throw new Error('Data division tidak ditemukan');
    }
  } catch (error) {
    if (error.response) {
      // VALIDASI ERROR RESPONSE API
      console.log('ERROR API RESPONSE:', error.response.data);
      ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
    } else {
      // VALIDASI ERROR DEVELOPER
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};

// Get data department by id_division
export const getDepartmentByDivision = async id_division => {
  try {
    const response = await api.get(`/data-department/${id_division}`);
    // console.log('response data department', response.data?.data);
    const departement = response.data?.data;

    if (departement) {
      return departement;
    } else {
      throw new Error('Data Department tidak ditemukan');
    }
  } catch (error) {
    if (error.response) {
      // VALIDASI ERROR RESPONSE API
      console.log('ERROR RESPONSE API:', error.response.data);
      ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
    } else {
      // VALIDASI ERROR DEVELOPER
      console.log('ERROR CODE:', error.message);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }
};
