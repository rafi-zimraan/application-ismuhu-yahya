import BiometricSvg from './components/BiometricSvg';
import ChooseImageButton from './components/ChooseImageButton';
import FaceMap from './components/FaceMap';
import MenuItemPresensi from './components/MenuItemPresensi';
import ModalSucces from './components/ModalSucces';
import OptionSwitch from './components/OptionSwitch';
import PreviewImage from './components/PreviewImage';
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
export {
  BiometricSvg,
  ModalSucces,
  StatusPresensi,
  MenuItemPresensi,
  OptionSwitch,
  PreviewImage,
  ChooseImageButton,
  FaceMap,
};
// presence api
export {
  getAllDivision,
  createFinger,
  getUserFromDepartment,
  getDepartmentByDivision,
  fingerPresence,
};
