import {configureStore} from '@reduxjs/toolkit';
import {authReducer, fingerReducer} from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finger: fingerReducer,
  },
});
