import DropdownPicker from './components/DropdonwPicker';
import NavbarNotif from './components/NavbarNotif';
import PermissionDetailScreen from './components/PermissionDetailScreen';
import PermissionNotificationListScreen from './components/PermissionNotificationListScreen';
import CarLoanNotificationListScreen from './components/CarLoanNotificationListScreen';
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
  PermissionNotificationListScreen,
  CarLoanNotificationListScreen,
  PermissionDetailScreen,
};
// slice
export {
  getAllNotifications,
  getNotificationDetail,
  deleteNotification,
  getNotificationCategory,
  updateApprovalStatus,
};
