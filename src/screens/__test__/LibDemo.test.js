// import React, {useEffect, useState} from 'react';
// import {
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ReactNativeBiometrics from 'react-native-biometrics';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import {Gap} from '../../Component';

// const BiometricsAuth = () => {
//   const [biometryType, setBiometryType] = useState(null);
//   const [publicKey, setPublicKey] = useState(null); // Added publicKey state

//   useEffect(() => {
//     // Load publicKey from EncryptedStorage if it exists
//     const loadPublicKey = async () => {
//       try {
//         const storedPublicKey = await EncryptedStorage.getItem('publicKey');
//         console.log('data:', storedPublicKey);
//         if (storedPublicKey) {
//           setPublicKey(storedPublicKey);
//         }
//       } catch (error) {
//         console.log('Error fetching publicKey:', error);
//       }
//     };

//     loadPublicKey();
//   }, []);

//   const registerFingerprint = () => {
//     const rnBiometrics = new ReactNativeBiometrics({
//       allowDeviceCredentials: true,
//     });
//     rnBiometrics
//       .isSensorAvailable()
//       .then(resultObject => {
//         const {available, biometryType} = resultObject;
//         console.log('bio', biometryType);
//         setBiometryType(biometryType);
//         // const { biometryType } = await rnBiometrics.isSensorAvailable()

//         if (available && biometryType) {
//           // Create biometric keys
//           rnBiometrics
//             .createKeys()
//             .then(resultObject => {
//               const {publicKey} = resultObject;
//               console.log('Public Key:', publicKey);

//               // Save publicKey in EncryptedStorage
//               EncryptedStorage.setItem('publicKey', publicKey)
//                 .then(() => {
//                   Alert.alert(
//                     'Fingerprint Registered',
//                     'Public key successfully created and saved',
//                   );
//                   setPublicKey(publicKey);
//                 })
//                 .catch(error => {
//                   console.log('Error saving publicKey:', error);
//                   Alert.alert('Error', 'Failed to save public key');
//                 });
//             })
//             .catch(e => {
//               Alert.alert(
//                 'Error',
//                 `Error generating public private keys: ${e.message}`,
//               );
//               console.log('ERROR:', e.message);
//             });
//         } else {
//           Alert.alert('Error', 'Biometrics not available on this device');
//         }
//       })
//       .catch(error => {
//         Alert.alert(
//           'Error',
//           `Error checking biometrics availability: ${error.message}`,
//         );
//       });
//   };

//   const authenticateWithFingerprint = () => {
//     const rnBiometrics = new ReactNativeBiometrics();

//     rnBiometrics
//       .simplePrompt({promptMessage: 'Scan your fingerprint'})
//       .then(resultObject => {
//         const {success} = resultObject;
//         console.log('result', resultObject);

//         if (success) {
//           // Validate publicKey after successful fingerprint
//           EncryptedStorage.getItem('publicKey')
//             .then(storedPublicKey => {
//               if (storedPublicKey) {
//                 if (storedPublicKey === publicKey) {
//                   Alert.alert(
//                     'Success',
//                     'Fingerprint authentication successful!',
//                   );
//                 } else {
//                   Alert.alert(
//                     'Failed',
//                     'Public key mismatch, authentication failed!',
//                   );
//                 }
//               } else {
//                 Alert.alert('Error', 'No public key stored');
//               }
//             })
//             .catch(() => {
//               Alert.alert('Error', 'Failed to retrieve public key');
//             });
//         } else {
//           Alert.alert(
//             'Cancelled',
//             'Fingerprint authentication cancelled by user.',
//           );
//         }
//       })
//       .catch(() => {
//         Alert.alert('Error', 'Fingerprint authentication failed.');
//       });
//   };

//   const deleteFingerprint = () => {
//     const rnBiometrics = new ReactNativeBiometrics();

//     rnBiometrics
//       .deleteKeys()
//       .then(resultObject => {
//         const {keysDeleted} = resultObject;

//         if (keysDeleted) {
//           console.log('Fingerprint keys successfully deleted');
//           Alert.alert('Success', 'Fingerprint keys deleted');
//         } else {
//           console.log('No keys found to delete');
//           Alert.alert('Info', 'No fingerprint keys to delete');
//         }
//       })
//       .catch(error => {
//         console.log('Error deleting keys:', error);
//         Alert.alert('Error', `Failed to delete keys: ${error.message}`);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Please use fingerprint to check-in</Text>

//       <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//         <TouchableOpacity
//           onPress={registerFingerprint}
//           style={styles.fingerprintButton}>
//           <Image
//             source={{
//               uri: 'https://img.icons8.com/ios-filled/100/000000/fingerprint.png',
//             }}
//             style={styles.fingerprintImage}
//           />
//         </TouchableOpacity>

//         <Gap width={40} />

//         <TouchableOpacity
//           onPress={authenticateWithFingerprint}
//           style={styles.fingerprintButton}>
//           <Image
//             source={{
//               uri: 'https://img.icons8.com/ios-filled/100/000000/fingerprint.png',
//             }}
//             style={styles.fingerprintImage}
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={deleteFingerprint}>
//         <Text>Delete Fingerprint</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   fingerprintButton: {
//     padding: 20,
//     borderRadius: 100,
//     backgroundColor: '#e0e0e0',
//   },
//   fingerprintImage: {
//     width: 100,
//     height: 100,
//   },
//   successText: {
//     fontSize: 16,
//     color: 'green',
//     marginTop: 20,
//   },
// });

// export default BiometricsAuth;

// import React, {useEffect, useState} from 'react';
// import {Text, View} from 'react-native';
// import DeviceInfo from 'react-native-device-info';

// const LibDemo = () => {
//   const [deviceInfo, setDeviceInfo] = useState({});

//   useEffect(() => {
//     const fetchDeviceInfo = async () => {
//       const info = {
//         brand: await DeviceInfo.getBrand(),
//         model: await DeviceInfo.getModel(),
//         systemVersion: await DeviceInfo.getSystemVersion(),
//         deviceId: await DeviceInfo.getDeviceId(),
//         uniqueId: await DeviceInfo.getUniqueId(),
//       };
//       setDeviceInfo(info);
//     };
//     fetchDeviceInfo();
//   }, []);

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{color: 'red'}}>Brand: {deviceInfo.brand}</Text>
//       <Text style={{color: 'red'}}>Model: {deviceInfo.model}</Text>
//       <Text style={{color: 'red'}}>
//         System Version: {deviceInfo.systemVersion}
//       </Text>
//       <Text style={{color: 'red'}}>Device ID: {deviceInfo.deviceId}</Text>
//       <Text style={{color: 'red'}}>Unique ID: {deviceInfo.uniqueId}</Text>
//     </View>
//   );
// };

// export default LibDemo;

// import React, { useEffect, useRef } from 'react';
// import {
//   Animated,
//   FlatList,
//   PanResponder,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// let data = [];
// for (let i = 0; i < 20; i += 1) data.push(i);

// const leftButtons = ['btn1', 'btn2', 'btn3'];
// const rightButtons = ['btn1', 'btn2'];
// const btnWidth = 80;
// const offset = [-btnWidth * rightButtons.length, btnWidth * leftButtons.length];

// export default function LibDemo() {
//   return (
//     <View>
//       <FlatList
//         data={[...Array(10).keys()]}
//         renderItem={() => {
//           return <RenderItem />;
//         }}
//       />
//     </View>
//   );
// }

// function RenderItem() {
//   let panValue = {x: 0, y: 0};
//   let isOpenState = useRef(false).current;
//   const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

//   const itemTranslate = pan.x.interpolate({
//     inputRange: offset,
//     outputRange: offset,
//     extrapolate: 'clamp',
//   });
//   const translateLeftBtns = pan.x.interpolate({
//     inputRange: [-leftButtons.length * btnWidth, 0],
//     outputRange: [-leftButtons.length * btnWidth, 0],
//     extrapolate: 'clamp',
//   });
//   const translateRightBtns = pan.x.interpolate({
//     inputRange: [0, rightButtons.length * btnWidth],
//     outputRange: [0, rightButtons.length * btnWidth],
//     extrapolate: 'clamp',
//   });

//   useEffect(() => {
//     pan.addListener(value => {
//       panValue = value;
//     });
//   }, []);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => false,
//       onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
//       onMoveShouldSetPanResponder: (e, g) => false,
//       onPanResponderGrant: () => {
//         pan.setOffset({x: panValue.x, y: panValue.y});
//         pan.setValue({x: 0, y: 0});
//       },
//       onPanResponderMove: Animated.event([null, {dx: pan.x}], {
//         useNativeDriver: false,
//       }),
//       onPanResponderRelease: (e, g) => {
//         pan.flattenOffset();
//         if (g.vx > 0.5 || g.dx > (btnWidth * leftButtons.length) / 2) {
//           if (isOpenState && g.dx > 0) {
//             reset();
//             return;
//           }
//           move(false);
//           return;
//         }
//         if (g.vx < -0.5 || g.dx < (-btnWidth * rightButtons.length) / 2) {
//           if (isOpenState && g.dx < 0) {
//             reset();
//             return;
//           }
//           move(true);
//           return;
//         }
//         reset();
//       },
//       onPanResponderTerminate: () => {
//         reset();
//       },
//     }),
//   ).current;

//   const reset = () => {
//     isOpenState = false;
//     Animated.spring(pan, {
//       toValue: {x: 0, y: 0},
//       useNativeDriver: true,
//       bounciness: 0,
//     }).start();
//   };

//   const move = toLeft => {
//     isOpenState = true;
//     Animated.spring(pan, {
//       toValue: {
//         x: toLeft
//           ? -btnWidth * rightButtons.length
//           : btnWidth * leftButtons.length,
//         y: 0,
//       },
//       useNativeDriver: true,
//       bounciness: 0,
//     }).start();
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.btnContainer,
//           {transform: [{translateX: translateLeftBtns}]},
//         ]}>
//         {leftButtons.map(btn => (
//           <TouchableOpacity
//             onPress={reset}
//             key={btn}
//             style={[styles.btn, {backgroundColor: 'red'}]}>
//             <Text>{btn}</Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//       <Animated.View
//         style={[
//           styles.btnContainer,
//           {
//             transform: [{translateX: translateRightBtns}],
//             alignSelf: 'flex-end',
//           },
//         ]}>
//         {rightButtons.map(btn => (
//           <TouchableOpacity
//             onPress={reset}
//             key={btn}
//             style={[styles.btn, {backgroundColor: 'orange'}]}>
//             <Text>{btn}</Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//       <Animated.View
//         style={[styles.item, {transform: [{translateX: itemTranslate}]}]}
//         {...panResponder.panHandlers}>
//         <Text style={styles.txt}>Swipe Left or Right</Text>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 80,
//     width: '100%',
//     marginBottom: 3,
//   },
//   item: {
//     height: '100%',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#aa3e82',
//   },
//   txt: {
//     color: '#fff',
//     letterSpacing: 1,
//   },
//   btnContainer: {
//     height: '100%',
//     position: 'absolute',
//     flexDirection: 'row',
//   },
//   btn: {
//     height: '100%',
//     width: btnWidth,
//     backgroundColor: 'red',
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   PermissionsAndroid,
// } from 'react-native';
// import {colors} from '../../utils/constant';
// import * as Animatable from 'react-native-animatable';
// import {useDispatch} from 'react-redux';
// import {signQrCode} from '../../features/Auth/services/signQrCode';
// import {useSelector} from 'react-redux';
// import {SetQrLoading} from '../../redux/slices/authSlice';
// import {RNCamera} from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';

// export default function ScanQR({navigation}) {
//   const dispatch = useDispatch();
//   const {qr_loading} = useSelector(state => state.auth);
//   const [isLoading, setIsLoading] = useState(false);
//   const [animationDuration, setAnimasionDuration] = useState(3000);
//   const [isCameraAuthorized, setIsCameraAuthorized] = useState(false);
//   const check_permission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         setIsCameraAuthorized(true);
//         setAnimasionDuration(3000);
//       }
//     } catch (error) {
//       console.log('Error Chaking camera', error);
//     }
//   };

//   useEffect(() => {
//     const refresh = navigation.addListener('focus', () => {
//       check_permission();
//       dispatch(SetQrLoading(false));
//     });
//     return refresh;
//   }, [navigation]);

//   function handleSignWithQrCode(rfid) {
//     dispatch(SetQrLoading(true));
//     console.log('Signing in with QR code:', rfid);
//     dispatch(signQrCode({rfid, navigation}));

//     // Setelah pemindaian QR code selesai, kembalikan ke tampilan awal
//     dispatch(SetQrLoading(false));
//   }

//   // Menampilkan loading indicator jika isLoading adalah true
//   if (!isCameraAuthorized) {
//     return (
//       <View style={styles.loadingContainer}>
//         <StatusBar
//           barStyle={'dark-content'}
//           translucent={true}
//           backgroundColor="transparent"
//         />
//         <Text style={styles.loadingText}>Memuat...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.Container}>
//       <StatusBar
//         barStyle={'dark-content'}
//         translucent={true}
//         backgroundColor="transparent"
//       />

//       <QRCodeScanner
//         onRead={event => handleSignWithQrCode(event.data)}
//         flashMode={RNCamera.Constants.FlashMode.torch}
//         topContent={
//           <Text style={styles.centerText}>
//             Go for <Text style={styles.textBold}>Login Panther Mania </Text>
//             from scan the QR code.
//           </Text>
//         }
//       />

//       <Animatable.View
//         style={styles.qrScannBox}
//         animation="pulse" // Anda dapat memilih animasi yang sesuai
//         easing="linear"
//         iterationCount="infinite"
//         duration={animationDuration}
//       />

//       <View style={styles.qrScannBox} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   Container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//   },
//   ContentModal: {
//     backgroundColor: '#FFF',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//   },
//   HeaderModal: {
//     justifyContent: 'center',
//   },
//   AboutData: {
//     textAlign: 'auto',
//     color: colors.black,
//     margin: 7,
//   },
//   TextWarning: {
//     color: '#000',
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 18,
//   },
//   txtDesciption: {
//     color: '#000',
//     fontFamily: 'Poppins-Medium',
//     fontSize: 14,
//   },
//   TextClose: {
//     color: '#000',
//     fontSize: 30,
//   },
//   qrScannBox: {
//     position: 'absolute',
//     top: '30%', // Sesuaikan dengan posisi yang Anda inginkan
//     left: '10%', // Sesuaikan dengan posisi yang Anda inginkan
//     width: '80%',
//     height: '40%',
//     borderWidth: 2,
//     borderColor: colors.white,
//   },
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: colors.primary,
//   },
// });

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function LibDemo() {
  const devices = useCameraDevices();
  console.log(devices);
  const device = devices.back;
  console.log(device);
  if (device == null) {
    return <View style={styles.errorContainer} />;
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
