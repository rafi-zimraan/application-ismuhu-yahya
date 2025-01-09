import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'id',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, {payload}) {
      state.currentLanguage = payload;
    },
  },
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
