import CreateFormulirPerizinan from './components/CreateFormulirPerizinan';
import EditFormulirPerizinan from './components/EditFormulirPerizinan';
import {
  addPerizinan,
  deleteDataPerizinan,
  getAllPerizinan,
  patchPerizinan,
} from './services/perizinanApiSlice';

// component
export {CreateFormulirPerizinan, EditFormulirPerizinan};
// slice
export {getAllPerizinan, deleteDataPerizinan, patchPerizinan, addPerizinan};
