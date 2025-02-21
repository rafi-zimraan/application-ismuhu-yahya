import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  department: null,
  filter: 'all',
  task_all: [],
  task_today: [],
  task_addition: [],
  task_success: [],
  target_leader: [],
};

const TaskSlice = createSlice({
  name: 'task_management',
  initialState,
  reducers: {
    setTargetLeader(state, action) {
      state.target_leader = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setDepartment(state, action) {
      state.department = action.payload;
    },
    setTasksFilter(state, action) {
      switch (action.payload.type) {
        case 'all':
          state.task_all = action.payload.data;
          break;
        case 'today':
          state.task_today = action.payload.data;
          break;
        case 'addition':
          state.task_addition = action.payload.data;
          break;
        case 'success':
          state.task_success = action.payload.data;
          break;
        default:
          break;
      }
    },
  },
});

export const {setTargetLeader, setFilter, setDepartment, setTasksFilter} =
  TaskSlice.actions;

export default TaskSlice.reducer;
