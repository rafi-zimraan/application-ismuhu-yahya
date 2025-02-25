import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

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
      const today = moment().format('YYYY-MM-DD');
      const todayTasks = action.payload.data.filter(
        task => moment(task.date).format('YYYY-MM-DD') === today,
      );
      const otherTasks = action.payload.data.filter(
        task => moment(task.date).format('YYYY-MM-DD') !== today,
      );
      const orderedTasks = [...todayTasks, ...otherTasks];

      switch (action.payload.type) {
        case 'all':
          state.task_all = orderedTasks;
          break;
        case 'today':
          state.task_today = orderedTasks;

          break;
        case 'addition':
          state.task_addition = orderedTasks;
          break;
        case 'success':
          state.task_success = orderedTasks;
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
