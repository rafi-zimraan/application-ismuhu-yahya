/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {name as appName} from './app.json';
import App, {navigationRef} from './src/App';

PushNotification.configure({
  onRegister: function (token) {},
  onNotification: function (notification) {
    if (notification.userInteraction) {
      if (navigationRef.isReady()) {
        const currentRoute = navigationRef.getCurrentRoute()?.name;
        if (currentRoute) {
          // ✅ Jika aplikasi sedang berjalan, navigasi langsung ke TaskManagement
          navigationRef.navigate('AmalYaumi');
        } else {
          // ✅ Jika aplikasi tidak berjalan, pastikan SignIn adalah layar pertama yang terbuka
          navigationRef.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
        }
      }
    }
    notification.finish();
  },
  onAction: function (notification) {
    const {foreground, action} = notification;
    if (foreground && action == 'Isi Yaumi') console.log('yaumi notifikasi');
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: '01',
  channelName: 'Yaumi Channel',
  channelDescription: 'A channel to inform user to fill yaumi',
  playSound: true,
  soundName: 'default',
  importance: Importance.HIGH,
  vibrate: true,
});

AppRegistry.registerComponent(appName, () => App);
