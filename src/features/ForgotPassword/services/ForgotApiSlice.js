import api from '../../../utils/axiosInstance';

export const sendVerificationEmail = async email => {
  try {
    const response = await api.post('mobile/forgot-password/send-email', {
      email,
    });

    if (response.data?.status) {
      return response.data;
    } else {
      throw new Error(
        response.data?.message || 'Gagal mengirim email verifikasi!',
      );
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      console.log(errorMessage);
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

    if (response.data?.status) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Kode OTP tidak valid!');
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
    } else {
      console.log('ERROR CODE:', error.message);
    }
    throw error;
  }
};
