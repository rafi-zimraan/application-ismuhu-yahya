import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

// Couple APIs
export const getCoupleData = async id_user => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`mobile/couple/user/${id_user}/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || [];
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const addCouple = async (id_user, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.post(`mobile/couple/user/${id_user}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateCouple = async (id_couple, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.patch(`mobile/couple/${id_couple}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteCouple = async id_couple => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.delete(`mobile/couple/${id_couple}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      console.log(response.data?.message || 'Data pasangan berhasil dihapus');
      return true;
    } else {
      throw new Error('Gagal menghapus notifikasi');
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

// Training APIs
export const getTrainingData = async id_user => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`mobile/training/user/${id_user}/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || [];
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const addTraining = async (id_user, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.post(`mobile/training/user/${id_user}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateTraining = async (id_training, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.patch(`mobile/training/${id_training}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteTraining = async id_training => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.delete(`mobile/training/${id_training}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      console.log(response.data?.message || 'Data training telah dihapus');
      return true;
    } else {
      throw new Error('Gagal menghapus notifikasi');
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

// Experience APIs
export const getExperienceData = async id_user => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`mobile/experience/user/${id_user}/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || [];
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const addExperience = async (id_user, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.post(`mobile/experience/user/${id_user}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateExperience = async (id_experience, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.patch(
      `mobile/experience/${id_experience}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteExperience = async id_experience => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.delete(`mobile/experience/${id_experience}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      console.log(response.data?.message || 'Data pengalaman telah dihapu');
      return true;
    } else {
      throw new Error('Gagal menghapus notifikasi');
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};

// Upload Photo API
export const uploadPhotoProfile = async (id_user, photo) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const formData = new FormData();
    formData.append('photo', {
      uri: photo.uri,
      name: photo.name || 'profile.jpg',
      type: photo.type || 'image/jpeg',
    });

    const response = await api.post(
      `mobile/upload-photo/user/${id_user}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    throw error;
  }
};
