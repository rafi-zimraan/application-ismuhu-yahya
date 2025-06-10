import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import EncryptedStorage from 'react-native-encrypted-storage';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import {ExitAppModal} from './features/authentication';
import {store} from './redux';
import Navigator from './routes';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-toast-message';
import {toastConfig} from './Component';

export const navigationRef = createNavigationContainerRef();

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [lastBackPressed, setLastBackPressed] = useState(null);

  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();

    // // 🧠 Tambahan untuk iOS: Request permission saat pertama app launch jika kalo plafrom-nya ios
    // if (Platform.OS === 'ios') {
    //   PushNotificationIOS.requestPermissions();
    // }

    const scheduleNotification = (hour, minute, title, message) => {
      const now = new Date();
      const scheduledDate = new Date();

      scheduledDate.setHours(hour, minute, 0, 0); // Atur jam dan menit
      // Jika waktu sudah lewat hari ini, jadwalkan untuk hari berikutnya
      if (scheduledDate < now) {
        scheduledDate.setDate(scheduledDate.getDate() + 1);
      }

      PushNotification.localNotificationSchedule({
        channelId: '01',
        title: title,
        message: message,
        date: scheduledDate,
        repeatType: 'day',
        largeIcon: '',
      });
    };

    // ✅ Jadwalkan Notifikasi Jam 9 Pagi
    scheduleNotification(
      9,
      0,
      "Selamat Pagi, Pejuang Qur'an",
      'Jangan lupa isi amal yaumi, ya!',
    );

    // ✅ Jadwalkan Notifikasi Jam 8 Malam
    scheduleNotification(
      20,
      0,
      "Selamat Malam, Pejuang Qur'an",
      'Jangan lupa isi amal yaumi, ya!',
    );
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (navigationRef.isReady()) {
        const currentRoute = navigationRef.getCurrentRoute()?.name;

        if (['Beranda', 'bell-outline', 'Setting'].includes(currentRoute)) {
          const now = Date.now();
          if (lastBackPressed && now - lastBackPressed < 2000) {
            setModalVisible(true);
            return true;
          }
          setLastBackPressed(now);
          ToastAndroid.show(
            'Klik tombol kembali sekali lagi untuk keluar dari aplikasi',
            ToastAndroid.SHORT,
          );
          return true;
        }

        if (navigationRef.canGoBack()) {
          navigationRef.goBack();
          return true;
        }

        const now = Date.now();
        if (lastBackPressed && now - lastBackPressed < 2000) {
          setModalVisible(true);
          return true;
        }
        setLastBackPressed(now);
        ToastAndroid.show(
          'Klik tombol kembali sekali lagi untuk keluar dari aplikasi',
          ToastAndroid.SHORT,
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [lastBackPressed]);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await EncryptedStorage.removeItem('token');
      await EncryptedStorage.removeItem('user_sesion');
      BackHandler.exitApp();
      setModalVisible(false);
    } catch (error) {
      ToastAndroid.show('Gagal keluar dari applikasi', ToastAndroid.SHORT);
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          BootSplash.hide({fade: true});
        }}>
        <Navigator />
        <ExitAppModal
          isVisible={isModalVisible}
          loading={loadingLogout}
          onCancel={() => setModalVisible(false)}
          onConfirm={handleLogout}
        />
      </NavigationContainer>

      {/* Toast container for cross-platfrom toasts */}
      <Toast config={toastConfig} />
    </Provider>
  );
}
