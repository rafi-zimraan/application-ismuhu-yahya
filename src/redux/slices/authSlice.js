import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 0,
    name: '',
    email: '',
    latitude: '',
    longitude: '',
  },
  authorization: {
    token: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, {payload}) {
      state = payload;
    },
  },
});

export const {setUserData} = authSlice.actions;

export default authSlice.reducer;

// import {createSlice} from '@reduxjs/toolkit';
// import {
//   fetchLogin,
//   fetchUserDetail,
// } from '../../features/authentication/services/loginServices';
// import {fetchPasswordRecovery} from '../../features/authentication/services/recoveryServices';

// const initialState = {
//   status: 'idle',
//   status_splash: 'idle',
//   status_recovery: 'idle',
//   token: null,
//   user_data: {data: [], user: null},
//   error: null,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUserData(state, action) {
//       state.user_data = action.payload; // Mengganti data user_data dengan payload
//     },
//     setUserToken(state, action) {
//       state.token = action.payload; // Menyimpan token ke state
//     },
//     SetStatusSplash(state, action) {
//       state.status_splash = action.payload; // Mengubah status splash
//     },
//     SetStatusRecovery(state, action) {
//       state.status_recovery = action.payload; // Mengubah status recovery
//     },
//   },
//   extraReducers: {
//     // Login
//     [fetchLogin.pending]: state => {
//       state.status = 'pending';
//     },
//     [fetchLogin.fulfilled]: (state, action) => {
//       if (action.payload?.token) {
//         state.token = action.payload.token;
//         state.status = 'success';
//       } else {
//         state.status = 'failed';
//       }
//     },
//     [fetchLogin.rejected]: state => {
//       state.status = 'failed';
//     },

//     // Fetch User Detail
//     [fetchUserDetail.pending]: state => {
//       state.status = 'pending';
//     },
//     [fetchUserDetail.fulfilled]: (state, action) => {
//       if (action.payload?.user) {
//         state.status = 'success';
//         state.user_data = action.payload;
//       } else {
//         state.status = 'failed';
//       }
//     },
//     [fetchUserDetail.rejected]: state => {
//       state.status = 'failed';
//     },

//     // Password Recovery
//     [fetchPasswordRecovery.pending]: state => {
//       state.status_recovery = 'pending';
//     },
//     [fetchPasswordRecovery.fulfilled]: (state, action) => {
//       if (action.payload?.message === 'Password berhasil diubah') {
//         state.status_recovery = 'success';
//       } else {
//         state.status_recovery = 'failed';
//       }
//     },
//     [fetchPasswordRecovery.rejected]: state => {
//       state.status_recovery = 'failed';
//     },
//   },
// });

// export const {setUserData, setUserToken, SetStatusSplash, SetStatusRecovery} =
//   authSlice.actions;

// export default authSlice.reducer;
