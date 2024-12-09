import DropdownPicker from './components/DropdonwPicker';
import NavbarNotif from './components/NavbarNotif';
import {
  deleteNotification,
  getAllNotifications,
  getNotificationCategory,
  getNotificationDetail,
  updateApprovalStatus,
} from './services/notificationApiSlice';

// component
export {DropdownPicker, NavbarNotif};
// slice
export {
  getAllNotifications,
  getNotificationDetail,
  deleteNotification,
  getNotificationCategory,
  updateApprovalStatus,
};
