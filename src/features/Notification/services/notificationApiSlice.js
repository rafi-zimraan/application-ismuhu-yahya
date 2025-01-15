import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

// List semua data notifikasi
export const getAllNotifications = async () => {
  try {
    // take token from encryptedStorage
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
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
    throw error;
  }
};

// Melihat detail notifikasi
export const getNotificationDetail = async id_notification => {
  try {
    // take token from encryptedStorage
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
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
    throw error;
  }
};

// Hapus notifikasi
export const deleteNotification = async id_notification => {
  try {
    // take token from encryptedStorage
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
      console.log(response.data?.message || 'Notifikasi berhasil dihapus');
      return true;
    } else {
      throw new Error('Gagal menghapus notifikasi');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
    return false;
  }
};

// List notification per category
export const getNotificationCategory = async category => {
  try {
    // take token from EncryptedStorage
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
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.timeLog(error.message);
    }
    throw error;
  }
};

// update status approval
export const updateApprovalStatus = async (id_approval, status) => {
  try {
    // take token from encryptedStorage
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
      console.log(
        'data approval',
        response.data?.message || 'Izin telah diterima',
      );
      return response.data;
    } else {
      throw new Error('Gagal memperbarui status approval');
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response?.data?.message || 'Terjadi kesalahan');
    } else {
      console.log(error.message);
    }
    throw error;
  }
};
