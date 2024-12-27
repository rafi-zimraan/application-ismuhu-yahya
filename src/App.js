// ! Digunakan untuk applikasi sudah berjalan nantinya
// import {
//   NavigationContainer,
//   createNavigationContainerRef,
// } from '@react-navigation/native';
// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   BackHandler,
//   Image,
//   NativeModules,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import BootSplash from 'react-native-bootsplash';
// import Modal from 'react-native-modal';
// import {Provider} from 'react-redux';
// import {ButtonAction, Gap} from './Component';
// import {IMG_WARNING_DEVICE} from './assets';
// import {logout} from './features/authentication';
// import {store} from './redux';
// import Navigator from './routes';
// import {COLORS, DIMENS} from './utils';

// const {DeveloperOptions} = NativeModules;
// const navigationRef = createNavigationContainerRef();

// export default function App() {
//   const [isDevMode, setIsDevMode] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [loadingLogout, setLoadingLogout] = useState(false);

//   useEffect(() => {
//     const backAction = () => {
//       setModalVisible(true);
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);

//   const handleLogout = async () => {
//     setLoadingLogout(true);
//     try {
//       await logout(navigationRef);
//       setModalVisible(false);
//     } catch (error) {
//       console.error('Error during logout:', error);
//     } finally {
//       setLoadingLogout(false);
//     }
//   };

//   useEffect(() => {
//     // Gunakan __DEV__ untuk mendeteksi mode pengembangan
//     if (__DEV__) {
//       setIsDevMode(true);
//       setModalVisible(true);
//     }
//   }, []);

//   const openDeveloperSettings = () => {
//     if (Platform.OS === 'android') {
//       if (DeveloperOptions && DeveloperOptions.open) {
//         DeveloperOptions.open();
//       } else {
//         console.error('DeveloperOptions module not found or undefined.');
//       }
//     } else if (Platform.OS === 'ios') {
//       Alert.alert(
//         'Matikan Developer Mode',
//         'Untuk menjaga keamanan, buka aplikasi Pengaturan, lalu navigasikan ke General -> Privacy & Security -> Developer Mode dan matikan Developer Mode.',
//         [{text: 'OK'}],
//       );
//     }
//   };

//   if (isDevMode) {
//     return (
//       <Provider store={store}>
//         <View style={styles.container}>
//           <Modal
//             isVisible={isModalVisible}
//             onBackdropPress={() => setModalVisible(false)}
//             style={styles.bottomModal}>
//             <View style={styles.modalContent}>
//               <Image source={IMG_WARNING_DEVICE} style={styles.image} />
//               <Text style={styles.title}>
//                 Kamu terdeteksi mengaktifkan developer mode
//               </Text>
//               <Text style={styles.description}>
//                 Demi keamanan, harap menonaktifkan developer mode pada perangkat
//                 kamu melalui tombol di bawah ini
//               </Text>
//               <ButtonAction
//                 onPress={openDeveloperSettings}
//                 title="Pengaturan"
//               />
//             </View>
//           </Modal>
//         </View>
//       </Provider>
//     );
//   }

//   // Jika Developer Mode tidak aktif, aplikasi berjalan normal
//   return (
//     <Provider store={store}>
//       <NavigationContainer
//         ref={navigationRef}
//         onReady={() => {
//           BootSplash.hide({fade: true});
//         }}>
//         <Navigator />
//         <Modal
//           isVisible={isModalVisible}
//           onBackdropPress={() => setModalVisible(false)}
//           style={styles.modal}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               Apakah kamu yakin untuk keluar dari SIMPONDOK?
//             </Text>
//             <Text style={styles.modalDescription}>
//               Setelah keluar, kamu harus memasukkan kembali informasi login kamu
//               untuk menggunakan layanan kami
//             </Text>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setModalVisible(false)}>
//               <Text style={styles.cancelButtonText}>Batalkan</Text>
//             </TouchableOpacity>
//             <Gap height={15} />
//             <TouchableOpacity
//               style={[
//                 styles.exitButton,
//                 loadingLogout && styles.disabledButton,
//               ]}
//               onPress={handleLogout}
//               disabled={loadingLogout}>
//               {loadingLogout ? (
//                 <ActivityIndicator size="small" color={COLORS.white} />
//               ) : (
//                 <Text style={styles.exitButtonText}>Keluar</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </NavigationContainer>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomModal: {
//     justifyContent: 'flex-end',
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 130,
//     height: 130,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: COLORS.black,
//   },
//   description: {
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: COLORS.black,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   modal: {
//     justifyContent: 'flex-end',
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   modalTitle: {
//     fontSize: DIMENS.xl,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'left',
//     color: COLORS.black,
//   },
//   modalDescription: {
//     fontSize: DIMENS.md,
//     marginBottom: 20,
//     textAlign: 'left',
//     color: COLORS.grey,
//   },
//   cancelButton: {
//     marginHorizontal: 15,
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.goldenOrange,
//     padding: 13,
//     borderRadius: 35,
//   },
//   cancelButtonText: {
//     textAlign: 'center',
//     color: COLORS.grey,
//     fontSize: DIMENS.l,
//   },
//   exitButton: {
//     marginHorizontal: 15,
//     backgroundColor: COLORS.goldenOrange,
//     padding: 13,
//     borderRadius: 35,
//   },
//   exitButtonText: {
//     textAlign: 'center',
//     color: COLORS.white,
//     fontSize: DIMENS.l,
//   },
// });

// ! tanpa configurasi developer mode
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
  TouchableOpacity,
  View,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Modal from 'react-native-modal';
import {Provider} from 'react-redux';
import {Gap} from './Component';
import {logout} from './features/authentication';
import {store} from './redux';
import Navigator from './routes';
import {COLORS, DIMENS} from './utils';

const navigationRef = createNavigationContainerRef();

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true); // Tampilkan modal saat tombol back ditekan
      return true; // Mencegah aksi default tombol back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Bersihkan listener saat unmount
  }, []);

  // Handle Logout dengan Loading
  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await logout(navigationRef);
      setModalVisible(false);
    } catch (error) {
      console.error('Error during logout:', error);
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
              untuk menggunakan layanan kami
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
