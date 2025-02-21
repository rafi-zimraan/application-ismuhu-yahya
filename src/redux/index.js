import {configureStore} from '@reduxjs/toolkit';
import {
  TaskReducer,
  authReducer,
  languageReducer,
  themeReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
    task_management: TaskReducer,
  },
});
