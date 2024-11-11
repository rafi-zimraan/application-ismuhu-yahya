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

// import React, {useEffect, useRef} from 'react';
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

import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../Component';

export default function LibDemo({
  title = 'filter',
  picker = {
    data: [],
    loading: false,
    label: 'label',
    value: 'value',
    onSelect: value => null,
  },
}) {
  const {control} = useForm();
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Icon
          name="filter-menu-outline"
          size={20}
          color="black"
          style={styles.icon}
        />
        <Picker
          selectedValue={selectedValue}
          onValueChange={value => {
            setSelectedValue(value);
            if (picker.onSelect) picker.onSelect(value);
          }}
          style={styles.picker}
          dropdownIconColor="black">
          <Picker.Item label={`${title}`} value={null} />
          {picker.data.map((item, index) => (
            <Picker.Item
              key={index}
              label={item[picker.label]}
              value={item[picker.value]}
            />
          ))}
        </Picker>
      </View>

      <Gap height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    width: 250,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 5,
  },
  icon: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
    height: 40,
    color: 'black',
  },
});
