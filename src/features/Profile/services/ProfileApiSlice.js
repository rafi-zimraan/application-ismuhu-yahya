import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    throw error;
  }
};

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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    throw error;
  }
};

export const uploadTrainingFile = async (file_type, file, idFileTraining) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const formData = new FormData();
    formData.append('file_type', file_type);
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });

    const response = await api.post(
      `training/upload-file/${idFileTraining} `,
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const deleteTrainingFile = async id_file_training => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.delete(
      `training/delete-file/${id_file_training}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      },
    );

    if (response.data?.status === true) {
      return true;
    } else {
      throw new Error('Gagal menghapus file training');
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

export const getTrainingFileList = async id_file_training => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`training/list-file/${id_file_training}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || [];
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
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
    throw error;
  }
};

export const uploadPhotoProfile = async (id_user, photo) => {
  try {
    const token = await EncryptedStorage.getItem('token');

    console.log('ini token', token);
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
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const addFamilyData = async (id_user, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.post(`mobile/family/user/${id_user}/add`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const updateFamilyData = async (id_family, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.patch(`mobile/family/${id_family}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const deleteFamilyData = async id_family => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.delete(`mobile/family/${id_family}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (response.data?.status === true) {
      return true;
    } else {
      throw new Error('Gagal menghapus data keluarga');
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

export const getFamilyData = async (id_user, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`mobile/family/user/${id_user}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data || [];
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const getAllDataSpa = async id_user => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`spas/${id_user}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || {};
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const updateSpaData = async (id_user, data) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.patch(`spas/${id_user}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const getProvinces = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get('provinces', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || [];
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};

export const getCitiesByProvince = async province_id => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token)
      throw new Error('Token expired, silahkan login terlebih dahulu');

    const response = await api.get(`city-province/${province_id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response.data || [];
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Error from server', error.response.data.message);
    } else {
      console.log('Err code', error.message);
    }
    throw error;
  }
};
