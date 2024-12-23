import CreateFormulirPerizinan from './components/CreateFormulirPerizinan';
import CreateFormulirPerizinanExit from './components/CreateFormulirPerizinanExit';
import EditFormulirPerizinan from './components/EditFormulirPerizinan';
import HistoryCuti from './components/HistoryCuti';
import HistoryKeluar from './components/HistoryKeluar';
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
  HistoryKeluar,
  HistoryCuti,
  CreateFormulirPerizinanExit,
};
// slice
export {getAllPerizinan, deleteDataPerizinan, patchPerizinan, addPerizinan};
