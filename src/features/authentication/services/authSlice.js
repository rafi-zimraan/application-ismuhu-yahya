import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  id: '',
  name: '',
  email: '',
  category: '',
  roles: [],
  permissions: [],
  url_photo: '',
  data_notifications: {
    notification: [],
    approvals: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserSession(state, {payload}) {
      state.token = payload.token;
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.category = payload.category;
      state.roles = payload.roles;
      state.permissions = payload.permissions;
      state.url_photo = payload.url_photo;
      state.data_notifications = payload.data_notifications;
    },
    ClearUserSession(state) {
      state.token = '';
      state.name = '';
      state.email = '';
      state.category = '';
      state.roles = [];
      state.permissions = [];
      state.url_photo = '';
      state.data_notifications = {notification: [], approvals: []};
    },
    setToken(state, {payload}) {
      state.token = payload;
    },
  },
});

export const {setUserSession, ClearUserSession, setToken} = authSlice.actions;

export default authSlice.reducer;
