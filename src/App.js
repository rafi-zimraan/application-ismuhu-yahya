import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {store} from './redux';
import Navigator from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        onReady={() => {
          BootSplash.hide({fade: true});
        }}>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}

// ! Digunakan untuk applikasi sudah berjalan nantinya
// import {NavigationContainer} from '@react-navigation/native';
// import React, {useEffect, useState} from 'react';
// import {
//   Alert,
//   Image,
//   NativeModules,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import BootSplash from 'react-native-bootsplash';
// import Modal from 'react-native-modal';
// import {Provider} from 'react-redux';
// import {ButtonAction} from './Component';
// import {IMG_WARNING_DEVICE} from './assets';
// import {store} from './redux';
// import Navigator from './routes';
// import {COLORS} from './utils';

// const {DeveloperOptions} = NativeModules; // Mengimpor modul DeveloperOptions dari NativeModules

// export default function App() {
//   const [isDevMode, setIsDevMode] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

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
//         DeveloperOptions.open(); // Memanggil fungsi native untuk membuka Developer Options
//       } else {
//         console.error('DeveloperOptions module not found or undefined.');
//       }
//     } else if (Platform.OS === 'ios') {
//       // Memberikan instruksi kepada pengguna iOS
//       Alert.alert(
//         'Matikan Developer Mode',
//         'Untuk menjaga keamanan, buka aplikasi Pengaturan, lalu navigasikan ke General -> Privacy & Security -> Developer Mode dan matikan Developer Mode.',
//         [{text: 'OK'}],
//       );
//     }
//   };

//   // Jika Developer Mode terdeteksi aktif, hanya tampilkan modal dan tidak render navigasi
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
//                 onPress={openDeveloperSettings} // Menggunakan onPress dari ButtonAction
//                 title="Pengaturan" // Misalnya, ButtonAction memiliki prop 'title'
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
//         onReady={() => {
//           BootSplash.hide({fade: true});
//         }}>
//         <Navigator />
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
// });
