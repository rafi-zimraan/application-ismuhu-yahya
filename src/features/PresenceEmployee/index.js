import MenuItemPresensi from './components/MenuItemPresensi';
import ModalSucces from './components/ModalSucces';
import StatusPresensi from './components/StatusPresensi';
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
export {ModalSucces, StatusPresensi, MenuItemPresensi};
// presence api
export {
  getAllDivision,
  createFinger,
  getUserFromDepartment,
  getDepartmentByDivision,
  fingerPresence,
};
