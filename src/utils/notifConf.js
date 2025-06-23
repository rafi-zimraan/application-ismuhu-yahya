import {Platform} from 'react-native';

const notifConf = {
  onRegister: function (token) {},
  onNotification: function (notification) {
    const {foreground, action} = notification;
    if (foreground && !action) console.log('yaumi notifikasi');
    notification.finish();
  },
  onAction: function (notification) {
    const {foreground, action} = notification;
    if (foreground && action == 'Isi Yaumi') console.log('yaumi notifikasi');
  },
  onRegistrationError: function (err) {
    console.log(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
};

export default notifConf;
