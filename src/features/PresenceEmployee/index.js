import CameraPresence from './components/CameraPresensce';
import CategoryPresence from './components/CategoryPresence';
import MenuItemPresensi from './components/MenuItemPresensi';
import ModalPermission from './components/ModalPermission';
import ModalSucces from './components/ModalSucces';
import StatusPresensi from './components/StatusPresensi';
import {setFingerData} from './services/fingerSlice';
import {createFinger, fingerPresence} from './services/presenceApiSlice';
// presence redux
export {setFingerData};
// presence component & icon presence
export {
  ModalSucces,
  StatusPresensi,
  MenuItemPresensi,
  CategoryPresence,
  ModalPermission,
  CameraPresence,
};
// presence api
export {createFinger, fingerPresence};
