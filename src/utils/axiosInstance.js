import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const api = axios.create({
  baseURL:
    'https://8472-2001-448a-d080-ceb-3f96-59ca-b066-f23a.ngrok-free.app/api',
  // baseURL: 'https://app.simpondok.com/api',

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
