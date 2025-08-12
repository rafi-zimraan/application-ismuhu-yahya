import Complaints from './Components/Complaints';
import CreateFacilityComplaint from './Components/CreateFacilityComplaint';
import DetailFacilityComplaint from './Components/DetailFacilityComplaint';
import UpdateFacilityComplaint from './Components/UpdateFacilityComplaint';
import {
  addSuggestion,
  deleteSuggestion,
  deleteSuggestionFile,
  getAllSuggestions,
  getSuggestionDetail,
  updateSuggestion,
} from './Services/FacilityComplaintApi';
import ProgressItem from './Components/ProgressItem';
import HeaderUserInfo from './Components/HeaderUserInfo';
import SectionTitle from './Components/SectionTitle';
import FacilityComplaintItem from './Components/FacilityComplaintItem';
import FacilityComplaintStatusBadge from './Components/FacilityComplaintStatusBadge';
import ComplaintHistory from './Components/ComplaintHistory';
import ScanQRFacilityComplaint from './Components/ScanQRFacilityComplaint';

// component
export {
  ProgressItem,
  HeaderUserInfo,
  SectionTitle,
  CreateFacilityComplaint,
  Complaints,
  DetailFacilityComplaint,
  UpdateFacilityComplaint,
  FacilityComplaintItem,
  FacilityComplaintStatusBadge,
  ComplaintHistory,
  ScanQRFacilityComplaint,
};
// slice
export {
  getAllSuggestions,
  addSuggestion,
  getSuggestionDetail,
  updateSuggestion,
  deleteSuggestion,
  deleteSuggestionFile,
};
