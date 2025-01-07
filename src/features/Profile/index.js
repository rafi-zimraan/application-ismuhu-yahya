import CreateExperience from './components/CreateExperience';
import CreateProfile from './components/CreateProfile';
import CreateTraining from './components/CreateTraining';
import DetailDataPribadi from './components/DetailDataPribadi';
import DetailExperience from './components/DetailExperience';
import DetailTraining from './components/DetailTraining';
import SectionWithData from './components/SectionWithData';
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
export {
  CreateProfile,
  DetailDataPribadi,
  DetailTraining,
  CreateTraining,
  DetailExperience,
  CreateExperience,
  SectionWithData,
};
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
