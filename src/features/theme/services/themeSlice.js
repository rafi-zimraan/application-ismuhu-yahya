import {createSlice} from '@reduxjs/toolkit';
import {COLORS} from '../../../utils';

const initialState = {
  mode: 'light',
  colors: {
    light: {
      text: COLORS.black,
      background: COLORS.white,
      background_header: COLORS.goldenOrange,
      section: COLORS.white,
      modal: COLORS.white,
      textInput: COLORS.white,
      textSectionTitleSett: COLORS.textPrimary,
      textSectionDescSett: COLORS.textSecondary,
      buttonLogout: COLORS.redLight,
      sectionLogout: COLORS.redLight,
      linearGardenProfile: ['#FFD700', '#FFB200'],
      textLabel: COLORS.mediumGrey,
      placeholderTextColor: COLORS.softGray,
      buttonShare: COLORS.goldenOrange,
      buttonAuthor: COLORS.blueLight,
      iconPicker: COLORS.black,
    },
    dark: {
      text: COLORS.white,
      background: COLORS.black,
      background_header: COLORS.darkGrey,
      section: COLORS.mediumGrey,
      modal: COLORS.mediumGrey,
      textInput: COLORS.softGray,
      textSectionTitleSett: COLORS.white,
      textSectionDescSett: COLORS.softGray,
      buttonLogout: COLORS.textPrimary,
      sectionLogout: COLORS.textPrimary,
      linearGardenProfile: ['#000000', '#444444'],
      textLabel: COLORS.softGrey,
      placeholderTextColor: COLORS.grey,
      transparent: 'transparent',
      buttonShare: '#E69C00',
      buttonAuthor: '#4A90E2',
      iconPicker: COLORS.softGrey,
    },
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode == 'light' ? 'dark' : 'light';
    },
    setTheme(state, action) {
      state.mode = action.payload;
    },
  },
});

export const {toggleTheme, setTheme} = themeSlice.actions;

export default themeSlice.reducer;
