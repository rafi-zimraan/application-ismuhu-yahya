import NetInfo from '@react-native-community/netinfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setUserSession} from '..';
import api from '../../../utils/axiosInstance';
import Toast from 'react-native-toast-message';

const showToast = (message, type = 'info') => {
  Toast.show({
    type: type,
    text1: message,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export const login = async (data, navigation, dispatch) => {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      showToast('Tidak ada koneksi internet');
      return;
    }
    const response = await api.post('/mobile/login', data);
    console.log('response login', response);
    const token = response.data?.token;
    const id = response.data?.id;
    const responseData = response.data;
    if (token && id && responseData.name && responseData.email) {
      dispatch(
        setUserSession({
          token: token,
          id: id,
          name: responseData.name,
          email: responseData.email,
          ...responseData,
        }),
      );
      await EncryptedStorage.setItem('token', JSON.stringify(token));
      await EncryptedStorage.setItem('idUser', JSON.stringify(id));
      await EncryptedStorage.setItem(
        'user_sesion',
        JSON.stringify(responseData),
      );
      navigation.replace('Dasboard');
      setTimeout(() => {
        showToast(`Selamat datang ${responseData?.name}`);
      }, 500);
      return responseData;
    } else {
      throw new Error('Token atau user tidak ditemukan');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      showToast(error.response.data.message);
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const passwordRecovery = async email => {
  try {
    const response = await api.post('/password/reset', {email});
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

export const logout = async (navigation, dispatch) => {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      showToast('Tidak ada koneksi internet');
      return;
    }
    const response = await api.post('/mobile/logout');
    if (response?.data?.status === true) {
      await EncryptedStorage.removeItem('token');
      await EncryptedStorage.removeItem('user_sesion');
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } else {
      const errorMessage = response?.data?.message;
      showToast(errorMessage);
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

export const FecthMe = async () => {
  try {
    const response = await api.get('/me');
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
