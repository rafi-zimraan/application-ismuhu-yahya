import {ToastAndroid} from 'react-native';
import api from '../../../utils/axiosInstance';

// login
export const login = async (data, navigation) => {
  try {
    console.log('DATA YANG DIKIRIM:', data);
    const response = await api.post('/login', data);
    console.log('RESPONSE:', response.data);

    const token = response.data?.token;
    if (token) {
      console.log('TOKEN:', token);
      return {token, user: response.data?.user};
    } else {
      throw new Error('Token tidak ditemukan');
    }
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = error.message;

    if (errorData.error == 'invalid_credentials') {
      ToastAndroid.show('Akun tidak ditemukan', ToastAndroid.SHORT);
    }

    if (error.message?.status === 500) {
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Silahkan Consultasi ke developer', ToastAndroid.SHORT);
    }

    console.log('ERROR', errorData || errorMessage); // response server
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
