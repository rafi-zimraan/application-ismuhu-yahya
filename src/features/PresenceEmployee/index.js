import BiometricSvg from './components/BiometricSvg';
import ModalSucces from './components/ModalSucces';
import {setFingerData} from './services/fingerSlice';
import {
  createFinger,
  fingerPresence,
  getAllDivision,
  getDepartmentByDivision,
  getUserFromDepartment,
} from './services/presenceApiSlice';

// presence redux
export {setFingerData};
// presence component & icon presence
export {BiometricSvg, ModalSucces};
// presence api
export {
  getAllDivision,
  createFinger,
  getUserFromDepartment,
  getDepartmentByDivision,
  fingerPresence,
};
