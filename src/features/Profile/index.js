import AllDataCouple from './components/AllDataCouple';
import AllDataExperience from './components/AllDataExperience';
import AllDataTraining from './components/AllDataTraining';
import CreateCouple from './components/CreateCouple';
import CreateExperience from './components/CreateExperience';
import CreateFamily from './components/CreateFamily';
import CreateTraining from './components/CreateTraining';
import DetailDataCouple from './components/DetailDataCouple';
import DetailDataSpa from './components/DetailDataSpa';
import DetailExperience from './components/DetailExperience';
import DetailFamily from './components/DetailFamily';
import DetailTraining from './components/DetailTraining';
import SectionWithData from './components/SectionWithData';
import UpdateDataSpa from './components/UpdateDataSpa';

import {
  addCouple,
  addExperience,
  addFamilyData,
  addTraining,
  deleteCouple,
  deleteExperience,
  deleteFamilyData,
  deleteTraining,
  deleteTrainingFile,
  getAllDataSpa,
  getCitiesByProvince,
  getCoupleData,
  getExperienceData,
  getFamilyData,
  getProvinces,
  getTrainingData,
  getTrainingFileList,
  updateCouple,
  updateExperience,
  updateFamilyData,
  updateSpaData,
  updateTraining,
  uploadPhotoProfile,
  uploadTrainingFile,
} from './ProfileApiSlice';

// component
export {
  UpdateDataSpa,
  AllDataExperience,
  AllDataCouple,
  AllDataTraining,
  DetailFamily,
  CreateFamily,
  DetailDataSpa,
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
  getProvinces,
  getCitiesByProvince,
  getAllDataSpa,
  updateSpaData,
  uploadTrainingFile,
  deleteTrainingFile,
  getTrainingFileList,
  getFamilyData,
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
