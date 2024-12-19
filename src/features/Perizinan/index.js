import CreateFormulirPerizinan from './components/CreateFormulirPerizinan';
import CreateFormulirPerizinanExit from './components/CreateFormulirPerizinanExit';
import EditFormulirPerizinan from './components/EditFormulirPerizinan';
import {
  addPerizinan,
  deleteDataPerizinan,
  getAllPerizinan,
  patchPerizinan,
} from './services/perizinanApiSlice';

// component
export {
  CreateFormulirPerizinan,
  EditFormulirPerizinan,
  CreateFormulirPerizinanExit,
};
// slice
export {getAllPerizinan, deleteDataPerizinan, patchPerizinan, addPerizinan};
