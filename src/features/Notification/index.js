import DropdownPicker from './components/DropdonwPicker';
import NavbarNotif from './components/NavbarNotif';
import PermissionDetailScreen from './components/PermissionDetailScreen';
import PermissionNotificationListScreen from './components/PermissionNotificationListScreen';
import CarLoanApprovalListScreen from './components/CarLoanApprovalListScreen';
import CarLoanNotificationListScreen from './components/CarLoanNotificationListScreen';
import {
  deleteNotification,
  getAllNotifications,
  getNotificationCategory,
  getNotificationDetail,
  updateApprovalStatus,
  updateLoanCarApprovalStatus,
} from './services/notificationApiSlice';

// component
export {
  DropdownPicker,
  NavbarNotif,
  PermissionNotificationListScreen,
  CarLoanNotificationListScreen,
  CarLoanApprovalListScreen,
  PermissionDetailScreen,
};
// slice
export {
  getAllNotifications,
  getNotificationDetail,
  deleteNotification,
  getNotificationCategory,
  updateApprovalStatus,
  updateLoanCarApprovalStatus,
};
