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
    const response = await api.post('/login', data);
    console.log('RESPONSE login:', response.data);

    const token = response.data?.token;
    const user = response.data?.user[0];
    if (token && user) {
      // Simpan ke Redux
      dispatch(
        setUserSession({
          token: token,
          user: {
            IDUser: user.IDUser,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        }),
      );

      // Simpan ke EncryptedStorage
      await EncryptedStorage.setItem('token', JSON.stringify(token));
      await EncryptedStorage.setItem('user', JSON.stringify(user));

      navigation.replace('Dasboard');
    } else {
      throw new Error('Token atau user tidak ditemukan');
    }
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = error.message;

    if (errorData.error === 'invalid_credentials') {
      ToastAndroid.show('Akun tidak ditemukan', ToastAndroid.SHORT);
    } else {
      console.log(errorMessage);
    }
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
