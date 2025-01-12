import CreateFormulirPerizinan from './components/CreateFormulirPerizinan';
import CreateFormulirPerizinanExit from './components/CreateFormulirPerizinanExit';
import CustomTextInput from './components/CustomTextInput';
import EditFormulirPerizinan from './components/EditFormulirPerizinan';
import HistoryCuti from './components/HistoryCuti';
import HistoryItem from './components/HistoryItem';
import HistoryKeluar from './components/HistoryKeluar';
import TotalCuti from './components/TotalCuti';
import {
  addCuti,
  addPerizinanKeluar,
  deleteCuti,
  deletePerizinanKeluar,
  getAllCuti,
  getAllPerizinanKeluar,
  patchCuti,
  patchPerizinanKeluar,
} from './services/perizinanApiSlice';

// component
export {
  CustomTextInput,
  CreateFormulirPerizinan,
  EditFormulirPerizinan,
  HistoryKeluar,
  HistoryCuti,
  TotalCuti,
  HistoryItem,
  CreateFormulirPerizinanExit,
};
// slice
export {
  getAllCuti,
  deleteCuti,
  patchCuti,
  addCuti,
  getAllPerizinanKeluar,
  deletePerizinanKeluar,
  patchPerizinanKeluar,
  addPerizinanKeluar,
};
