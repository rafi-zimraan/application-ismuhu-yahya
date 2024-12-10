import NetInfo from '@react-native-community/netinfo';
import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setUserSession} from '..';
import api from '../../../utils/axiosInstance';

// login
export const login = async (data, navigation, dispatch) => {
  try {
    // Cek koneksi internet
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      ToastAndroid.show('Tidak ada koneksi internet', ToastAndroid.SHORT);
      return;
    }

    console.log('DATA YANG DIKIRIM:', data);
    const response = await api.post('/mobile/login', data);
    console.log('RESPONSE login:', response.data);

    // if response failed
    if (response.data.status === false) {
      const errorMessage =
        response.data.message?.email[0] || 'Terjadi Kesalahan';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return;
    }

    const token = response.data?.token;
    const responseData = response.data;
    // console.log('Data login user', responseData);

    if (token && responseData.name && responseData.email) {
      dispatch(
        setUserSession({
          token: token,
          name: responseData.name,
          email: responseData.email,
          ...responseData, // save all data to state
        }),
      );

      // Save data to EncryptedStorage
      await EncryptedStorage.setItem('token', JSON.stringify(token));
      await EncryptedStorage.setItem(
        'user_sesion',
        JSON.stringify(responseData),
      );

      // successfuly load data
      ToastAndroid.show(
        `Selamat Datang ${responseData.name}`,
        ToastAndroid.SHORT,
      );
      navigation.navigate('Dasboard');
    } else {
      throw new Error('Token atau user tidak ditemukan');
    }
  } catch (error) {
    console.log('error:', error.message);
    ToastAndroid.show(
      'Terjadi Kesalahan, silahkan coba lagi',
      ToastAndroid.SHORT,
    );
  }
};

// register
export const register = async data => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    console.log('REGISTER ERROR:', error);
    ToastAndroid.show(error?.message, ToastAndroid.SHORT);
  }
};

// divisions
export const getDivisions = async () => {
  try {
    const response = await api.get('/getAllDivision');
    return response.data;
  } catch (error) {
    console.log('DIVISIONS ERROR:', error);
  }
};

// department berdasarkan divisionId
export const getDepartment = async divisionId => {
  try {
    const response = await api.get(`/getDepartment/${divisionId}`);
    return response.data;
  } catch (error) {
    console.log('DEPARTMENT ERROR:', error);
  }
};

// branch
export const getBranches = async () => {
  try {
    const response = await api.get('/branches');
    return response.data;
  } catch (error) {
    console.log('BRANCHES ERROR', error);
  }
};

// recovery password
export const passwordRecovery = async email => {
  try {
    const response = await api.post('/password/reset', {email});
    return response.data;
  } catch (error) {
    console.log('RECOVERY ERROR', error);
  }
};

// logout
export const logout = async (navigation, dispatch) => {
  try {
    // Cek koneksi internet
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      ToastAndroid.show('Tidak ada koneksi internet', ToastAndroid.SHORT);
      return;
    }

    // Kirim request logout
    const response = await api.post('/mobile/logout');
    console.log('RESPONSE logout:', response.data);

    // Cek jika logout berhasil
    if (response.data.status === true) {
      // Hapus data dari EncryptedStorage
      await EncryptedStorage.removeItem('token');
      await EncryptedStorage.removeItem('user_sesion');

      // Reset state user session
      dispatch(
        setUserSession({
          token: null,
          name: null,
          email: null,
        }),
      );

      ToastAndroid.show('Berhasil logout', ToastAndroid.SHORT);
      navigation.navigate('SignIn'); // Navigasi ke halaman login
    } else {
      const errorMessage =
        response.data.message || 'Gagal logout, silakan coba lagi';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log('LOGOUT ERROR:', error.message);
    ToastAndroid.show(
      'Terjadi Kesalahan, silahkan coba lagi',
      ToastAndroid.SHORT,
    );
  }
};
