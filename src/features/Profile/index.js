import CreateCouple from './components/CreateCouple';
import CreateExperience from './components/CreateExperience';
import CreateProfileSpa from './components/CreateProfileSpa';
import CreateTraining from './components/CreateTraining';
import DetailDataCouple from './components/DetailDataCouple';
import DetailDataProfileSpa from './components/DetailDataProfileSpa';
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
  uploadPhotoProfile,
} from './services/ProfileApiSlice';

// component
export {
  CreateProfileSpa,
  DetailDataProfileSpa,
  CreateCouple,
  DetailDataCouple,
  DetailTraining,
  CreateTraining,
  DetailExperience,
  CreateExperience,
  SectionWithData,
};
// slice
export {
  uploadPhotoProfile,
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
