import {configureStore} from '@reduxjs/toolkit';
import {
  authReducer,
  fingerReducer,
  languageReducer,
  themeReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finger: fingerReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
