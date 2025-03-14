import DropdownPicker from './components/DropdonwPicker';
import NavbarNotif from './components/NavbarNotif';
import NotificationDetail from './components/NotificationDetail';
import NotificationFromCategory from './components/NotificationFromCategory';
import {
  deleteNotification,
  getAllNotifications,
  getNotificationCategory,
  getNotificationDetail,
  updateApprovalStatus,
} from './services/notificationApiSlice';

// component
export {
  DropdownPicker,
  NavbarNotif,
  NotificationFromCategory,
  NotificationDetail,
};
// slice
export {
  getAllNotifications,
  getNotificationDetail,
  deleteNotification,
  getNotificationCategory,
  updateApprovalStatus,
};
