import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {
    IDUser: '',
    email: '',
    name: '',
    role: '',
  },
  divisions: [],
  departement: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserSession(state, {payload}) {
      state.token = payload.token;
      state.user = payload.user;
    },
    ClearUserSession(state) {
      state.token = '';
      state.user = {email: '', name: ''};
    },
    setToken(state, {payload}) {
      state.token = payload;
    },
    setDivisions(state, {payload}) {
      state.divisions = payload;
    },
    setDepartments(state, {payload}) {
      state.departement = payload;
    },
  },
});

export const {
  setUserSession,
  ClearUserSession,
  setToken,
  setDivisions,
  setDepartments,
} = authSlice.actions;

export default authSlice.reducer;
