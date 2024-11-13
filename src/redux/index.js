import {configureStore} from '@reduxjs/toolkit';
import {authReducer, fingerReducer, notificationReducer} from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finger: fingerReducer,
    notification: notificationReducer,
  },
});
