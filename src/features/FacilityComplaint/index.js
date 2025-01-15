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

// component
export {
  CreateFacilityComplaint,
  Complaints,
  DetailFacilityComplaint,
  UpdateFacilityComplaint,
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
