import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../utils/axiosInstance';

export const getAllTaskManagement = async (filter = 'all') => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`mobile/todos?filter=${filter}`, {
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

export const addTaskManagement = async (
  activity,
  date,
  addition_task,
  category,
) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      'mobile/todos',
      {activity, date, addition_task, category},
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

export const getDetailTaskManagement = async id_todos => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`mobile/micro-todo/${id_todos}/detail`, {
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

export const updateDataTaskManagement = async (
  id_todos,
  activity,
  division_id = null,
  date,
  category,
  addition_task,
) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(
      `mobile/todos/${id_todos}`,
      {activity, division_id, date, category, addition_task},
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

export const deleteTaskManagement = async id_todos => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`mobile/todos/${id_todos}`, {
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

export const updateStatusRencanaTask = async id_todo => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(`mobile/todo/update-status/${id_todo}`, {
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

export const getDetailLinkTaskManagement = async id_todo => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`mobile/todo/detail-link/${id_todo}`, {
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

export const addLinkTaskManagement = async (id_todo, title, url, desc = '') => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.post(
      `mobile/todo/${id_todo}/add-link`,
      {title, url, desc},
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

export const updateLinkTaskManagement = async (
  id_link,
  id_todo,
  title,
  url,
  desc = '',
) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.patch(
      `mobile/todo/update-link/${id_link}`,
      {id_todo, title, url, desc},
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

export const deleteLinkTaskManagement = async id_link => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`mobile/todo/delete-link/${id_link}`, {
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

export const getFilesTaskManagement = async id_todo => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.get(`mobile/todo/${id_todo}/files`, {
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

export const addFileTaskManagement = async (
  id_todo,
  title,
  file_type,
  file,
  desc = '',
) => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file_type', file_type);
    formData.append('file', file);
    if (desc) formData.append('desc', desc);

    const response = await api.post(
      `mobile/todo/${id_todo}/upload-file`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
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

export const deleteFileTaskManagement = async id_file => {
  try {
    const token = await EncryptedStorage.getItem('token');
    if (!token) {
      throw new Error('Token expired, silahkan login terlebih dahulu');
    }

    const response = await api.delete(`mobile/todo/delete-file/${id_file}`, {
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
