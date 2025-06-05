import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isEnabled: false,
};

const biometricSlice = createSlice({
  name: 'biometric',
  initialState,
  reducers: {
    setBiometricEnabled(state, action) {
      state.isEnabled = action.payload;
    },
  },
});

export const {setBiometricEnabled} = biometricSlice.actions;
export default biometricSlice.reducer;
