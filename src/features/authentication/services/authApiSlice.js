import NetInfo from '@react-native-community/netinfo';
import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setUserSession} from '..';
import api from '../../../utils/axiosInstance';

// login
export const login = async (data, navigation, dispatch) => {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      ToastAndroid.show('Tidak ada koneksi internet', ToastAndroid.SHORT);
      return;
    }

    // const response = await api.post('/mobile/login', data);
    const response = await api.post('mobile/login', data);
    console.log('RESPONSE login:', response.data);

    if (response.data.status === false) {
      const errorMessage =
        response.data.message?.email[0] || 'Terjadi Kesalahan';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return;
    }

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
      if (responseData.url_photo) {
        await EncryptedStorage.setItem('url_photo', responseData.url_photo);
      } else {
        await EncryptedStorage.removeItem('url_photo');
      }
      ToastAndroid.show(
        `Selamat Datang ${responseData.name}`,
        ToastAndroid.SHORT,
      );
      navigation.replace('Dasboard');
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
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      ToastAndroid.show('Tidak ada koneksi internet', ToastAndroid.SHORT);
      return;
    }

    const response = await api.post('/mobile/logout');
    console.log('RESPONSE logout:', response.data);

    if (response.data.status === true) {
      await EncryptedStorage.removeItem('token');
      await EncryptedStorage.removeItem('user_sesion');

      ToastAndroid.show('Berhasil logout', ToastAndroid.SHORT);
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
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

// Fetch user data (/ME)
export const FecthMe = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    console.log('/ME ERROR:', error);
  }
};
