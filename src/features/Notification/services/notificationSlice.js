import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUnreadCount(state, actions) {
      state.unreadCount = actions.payload;
    },
  },
});

export const {setUnreadCount} = notificationSlice.actions;
export default notificationSlice.reducer;

// Di notificationSlice.js

// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   unreadCount: 0,
//   messages: [
//     {
//       id: 1,
//       sender: 'Fulan bin fulanah',
//       message: 'Izin cuti ya bro!',
//       time: '07.00',
//       count: 3,
//       status: 'read',
//     },
//     {
//       id: 2,
//       sender: 'fulanah bin fulan',
//       message: 'Izin melahirkan ya bro!',
//       time: '17.30',
//       count: 2,
//       status: 'delivered',
//     },
//     {
//       id: 3,
//       sender: 'Fulan bin fulan',
//       message: 'Izin makan ya bro!',
//       time: '13.00',
//       count: 1,
//       status: 'delivered',
//     },
//   ],
// };

// const notificationSlice = createSlice({
//   name: 'notification',
//   initialState,
//   reducers: {
//     setUnreadCount: state => {
//       state.unreadCount = state.messages
//         .filter(msg => msg.status === 'delivered')
//         .reduce((acc, curr) => acc + curr.count, 0);
//     },
//     // Tambah reducers lain jika diperlukan
//   },
// });

// export const {setUnreadCount} = notificationSlice.actions;
// export default notificationSlice.reducer;
