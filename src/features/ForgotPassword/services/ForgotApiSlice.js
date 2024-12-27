import api from '../../../utils/axiosInstance';

export const sendVerificationEmail = async email => {
  try {
    const response = await api.post('mobile/forgot-password/send-email', {
      email,
    });

    console.log('RESPONSE SEND EMAIL:', response.data);

    if (response.data?.status) {
      console.log(response.data?.message);
      return response.data;
    } else {
      throw new Error(
        response.data?.message || 'Gagal mengirim email verifikasi!',
      );
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      console.log('ERROR MESSAGE SEND EMAIL:', errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
    }
    throw error;
  }
};

// Verifikasi Kode OTP
export const verifyOtpCode = async (email, code) => {
  try {
    const response = await api.post('mobile/forgot-password/verify-otp', {
      email,
      code,
    });

    console.log('RESPONSE VERIFY OTP:', response.data);

    if (response.data?.status) {
      console.log(response.data?.message);
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Kode OTP tidak valid!');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      console.log('ERROR MESSAGE VERIFY OTP:', errorMessage);
    } else {
      console.log('ERROR CODE:', error.message);
    }
    throw error;
  }
};
