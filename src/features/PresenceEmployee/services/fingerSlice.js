import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  message: '',
  user: {
    id: null,
    finger: '',
    uuid: '',
    name: '',
    email: '',
    status: '',
    email_verified_at: null,
    deleted_at: null,
    created_at: null,
    update_at: null,
  },
};

const fingerSlice = createSlice({
  name: 'fingerData',
  initialState,
  reducers: {
    setFingerData(state, {payload}) {
      state.status = payload.status;
      state.message = payload.message;
      state.user = payload.user;
    },
    clearFingerData(state) {
      state.status = false;
      state.message = '';
      state.user = {
        id: null,
        finger: '',
        uuid: '',
        name: '',
        email: '',
        status: '',
        email_verified_at: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
      };
    },
  },
});

export const {setFingerData, clearFingerData} = fingerSlice.actions;
export default fingerSlice.reducer;
