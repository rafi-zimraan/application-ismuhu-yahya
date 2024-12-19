import AbsenceView from './components/AbsenceView';
import CameraPresence from './components/CameraPresensce';
import ItemPerizinanAdmin from './components/ItemPerizinanAdmin';
import MenuItemPresensi from './components/MenuItemPresensi';
import ModalPermission from './components/ModalPermission';
import ModalSucces from './components/ModalSucces';
import QrCodeAdmin from './components/QrCodeAdmin';
import ScannerQrCodeByCategoryAbsensi from './components/ScannerQrCodeByCategoryAbsensi';
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
  ScannerQrCodeByCategoryAbsensi,
  ModalPermission,
  CameraPresence,
  ItemPerizinanAdmin,
  AbsenceView,
  QrCodeAdmin,
};
// presence api
export {createFinger, fingerPresence};
