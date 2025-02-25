import DasboardReducer from '../features/Dasboard/services/DasboardSlice';
import languageReducer from '../features/Language/services/languageSlice';
import TaskReducer from '../features/TaskManagement/Services/TaskSlice';
import authReducer from '../features/authentication/services/authSlice';
import themeReducer from '../features/theme/services/themeSlice';

// slice
export {
  authReducer,
  themeReducer,
  languageReducer,
  TaskReducer,
  DasboardReducer,
};
