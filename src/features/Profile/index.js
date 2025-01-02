import CreateProfile from './components/CreateProfile';
import DetailDataPribadi from './components/DetailDataPribadi';
import {
  addCouple,
  deleteCouple,
  getCoupleData,
  updateCouple,
} from './services/ProfileApiSlice';

// component
export {CreateProfile, DetailDataPribadi};
// slice
export {getCoupleData, addCouple, updateCouple, deleteCouple};
