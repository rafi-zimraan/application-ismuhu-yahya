import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getUserDetail, postLogin} from '../../../utils/@APIs';
import {setUserData, setUserToken} from './authSlice';

const showToast = (message, duration = 'SHORT') => {
  ToastAndroid.show(message, ToastAndroid[duration]);
};

export const fetchLogin = params => async dispatch => {
  const {email, password, navigation} = params;
  console.log('check email password', {password, email});

  try {
    const {data} = await postLogin({email, password});
    console.log('response from postlogin', data);

    if (data?.status === 'OK') {
      await EncryptedStorage.setItem(
        'user_login',
        JSON.stringify({email, password}),
      );
      dispatch(setUserToken(data.token));
      dispatch(fetchUserDetail({token: data.token, navigation}));
    } else {
      showToast(`Terjadi kesalahan: ${data?.message}`);
    }
  } catch (error) {
    console.log('err', error);
    console.log(`fetchLogin: ${error?.code}`);

    if (error.code === 'ERR_BAD_REQUEST') {
      showToast('Data tidak ditemukan');
    } else {
      showToast(`Terjadi kesalahan: ${error.message}`, 'LONG');
    }
  }
};

export const fetchUserDetail =
  ({token, navigation}) =>
  async dispatch => {
    try {
      const {data} = await getUserDetail(token);

      if (data.status === 'OK') {
        navigation.replace('Dashboard', {role: data.user.role});
        dispatch(setUserData(data));
      } else {
        showToast(`Terjadi kesalahan: ${data?.message}`);
      }
    } catch (error) {
      console.log(`auth/fetchUserDetail: ${error.message}`);
      showToast(`Terjadi kesalahan: ${error?.message}`, 'LONG');
    }
  };
