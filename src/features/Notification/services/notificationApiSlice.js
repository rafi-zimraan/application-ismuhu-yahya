import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const getAllNotifications = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }
    const response = await api.get('notifications', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    if (response?.data) {
      return response.data;
    } else {
      throw new Error('Data tidak ditemukan');
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

export const getNotificationDetail = async id_notification => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }
    const response = await api.get(`notifications/seen/${id_notification}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    if (response?.data?.data) {
      return response.data;
    } else {
      throw new Error('Notifikasi tidak ditemukan');
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

export const deleteNotification = async id_notification => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }
    const response = await api.delete(
      `notifications/delete/${id_notification}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );
    if (response.data?.status === true) {
      return true;
    } else {
      throw new Error('Gagal menghapus notifikasi');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    return false;
  }
};

export const getNotificationCategory = async category => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, Silahkan login terlebih dahulu');
    }
    const response = await api.get(
      'notifications/category/lisences',
      {category},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );
    if (response?.data) {
      return response.data;
    } else {
      throw new Error('Data tidak ditemukan');
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

export const updateApprovalStatus = async (id_approval, status) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }
    const response = await api.patch(
      `approval/update-status/${id_approval}?status=${status}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );
    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error('Gagal memperbarui status approval');
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

export const updateLoanCarApprovalStatus = async (loan_id, status) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      `mobile/loan-cars/${loan_id}/update-approval/${status}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error(
        response.data?.message ||
          'Gagal memperbarui status approval peminjaman mobil',
      );
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

export const cancelLoanCarApprovalStatus = async (loan_id, status) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      `mobile/loan-cars/${loan_id}/update-approval/${status}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return response.data;
    } else {
      throw new Error(
        response.data?.message ||
          'Gagal membatalkan status approval peminjaman mobil',
      );
    }
  } catch (error) {
    if (error.response?.data?.message) {
      console.log('❌ Error from server:', error.response.data.message);
    } else {
      console.log('❌ Error cancelLoanCarApprovalStatus:', error.message);
    }
    throw error;
  }
};
