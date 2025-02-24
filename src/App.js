import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Modal from 'react-native-modal';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import {Gap} from './Component';
import {store} from './redux';
import Navigator from './routes';
import {COLORS, DIMENS} from './utils';

export const navigationRef = createNavigationContainerRef();

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [lastBackPressed, setLastBackPressed] = useState(null);

  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();
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
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Apakah kamu yakin untuk keluar dari SIMPONDOK?
            </Text>
            <Text style={styles.modalDescription}>
              Setelah keluar, kamu harus memasukkan kembali informasi login kamu
              untuk menggunakan layanan simpondok
            </Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Batalkan</Text>
            </TouchableOpacity>
            <Gap height={15} />
            <TouchableOpacity
              style={[
                styles.exitButton,
                loadingLogout && styles.disabledButton,
              ]}
              onPress={handleLogout}
              disabled={loadingLogout}>
              {loadingLogout ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.exitButtonText}>Keluar</Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: COLORS.black,
  },
  modalDescription: {
    fontSize: DIMENS.md,
    marginBottom: 20,
    textAlign: 'left',
    color: COLORS.grey,
  },
  cancelButton: {
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.goldenOrange,
    padding: 13,
    borderRadius: 35,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: COLORS.grey,
    fontSize: DIMENS.l,
  },
  exitButton: {
    marginHorizontal: 15,
    backgroundColor: COLORS.goldenOrange,
    padding: 13,
    borderRadius: 35,
  },
  exitButtonText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: DIMENS.l,
  },
});
