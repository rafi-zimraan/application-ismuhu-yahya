import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  amountSantri: 0,
  amountSpa: 0,
  userPosition: '',
};

const DasboardSlice = createSlice({
  name: 'dasboard',
  initialState,
  reducers: {
    setAmountSpa(state, action) {
      state.amountSpa = action.payload;
    },
    setAmountSantri(state, action) {
      state.amountSantri = action.payload;
    },
    setUserPosition(state, action) {
      state.userPosition = action.payload;
    },
  },
});

export const {setAmountSantri, setAmountSpa, setUserPosition} =
  DasboardSlice.actions;

export default DasboardSlice.reducer;
