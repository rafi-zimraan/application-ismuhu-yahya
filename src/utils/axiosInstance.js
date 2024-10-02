import axios from 'axios';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

const api = axios.create({
  baseURL: 'https://todo-api-omega.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await EncryptedStorage.getItem('token');
      if (token) config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      return config;
    } catch (error) {
      console.log('INTERCEPTORS ERROR:', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
