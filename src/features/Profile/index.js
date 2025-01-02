import CreateProfile from './components/CreateProfile';
import DetailDataPribadi from './components/DetailDataPribadi';
import DetailTraining from './components/DetailTraining';
import {
  addCouple,
  addExperience,
  addTraining,
  deleteCouple,
  deleteExperience,
  deleteTraining,
  getCoupleData,
  getExperienceData,
  getTrainingData,
  updateCouple,
  updateExperience,
  updateTraining,
} from './services/ProfileApiSlice';

// component
export {CreateProfile, DetailDataPribadi, DetailTraining};
// slice
export {
  getCoupleData,
  addCouple,
  updateCouple,
  deleteCouple,
  getTrainingData,
  addTraining,
  updateTraining,
  deleteTraining,
  getExperienceData,
  addExperience,
  updateExperience,
  deleteExperience,
};
