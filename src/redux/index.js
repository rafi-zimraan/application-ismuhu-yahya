import {configureStore} from '@reduxjs/toolkit';
import {
  DasboardReducer,
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
    dasboard: DasboardReducer,
  },
});
