import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  darkTheme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
    setDarkTheme(state, {payload}) {
      state.darkTheme = payload;
    },
  },
});

export const {toggleTheme, setDarkTheme} = themeSlice.actions;

export default themeSlice.reducer;
