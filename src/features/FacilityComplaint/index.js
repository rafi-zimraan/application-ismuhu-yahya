import AllComplaints from './Components/AllComplaints';
import Complaints from './Components/Complaints';
import CreateFacilityComplaint from './Components/CreateFacilityComplaint';

import {
  addSuggestion,
  deleteSuggestion,
  getAllSuggestions,
  getSuggestionDetail,
  updateSuggestion,
} from './Services/FacilityComplaintApi';

// component
export {CreateFacilityComplaint, Complaints, AllComplaints};
// slice
export {
  getAllSuggestions,
  addSuggestion,
  getSuggestionDetail,
  updateSuggestion,
  deleteSuggestion,
};
