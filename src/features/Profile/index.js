import CreateCouple from './components/CreateCouple';
import CreateExperience from './components/CreateExperience';
import CreateFamily from './components/CreateFamily';
import CreateProfileSpa from './components/CreateProfileSpa';
import CreateTraining from './components/CreateTraining';
import DetailDataCouple from './components/DetailDataCouple';
import DetailDataProfileSpa from './components/DetailDataProfileSpa';
import DetailExperience from './components/DetailExperience';
import DetailFamily from './components/DetailFamily';
import DetailTraining from './components/DetailTraining';
import SectionWithData from './components/SectionWithData';
import {
  addCouple,
  addExperience,
  addFamilyData,
  addTraining,
  deleteCouple,
  deleteExperience,
  deleteFamilyData,
  deleteTraining,
  getCoupleData,
  getExperienceData,
  getFamilyData,
  getFamilyDetails,
  getTrainingData,
  updateCouple,
  updateExperience,
  updateFamilyData,
  updateTraining,
  uploadPhotoProfile,
} from './services/ProfileApiSlice';

// component
export {
  DetailFamily,
  CreateFamily,
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
  getFamilyData,
  getFamilyDetails,
  deleteFamilyData,
  updateFamilyData,
  addFamilyData,
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
