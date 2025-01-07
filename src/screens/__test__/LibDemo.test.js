// ! SCREEN BANTUAN & DUKUNGAN-BANTUAN
// import React from 'react';
// import {ScrollView, StyleSheet, Text} from 'react-native';
// import {Gap} from '../../Component';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <ScrollView style={styles.container}>
//       <Gap height={20} />
//       <Text style={styles.header}>Bantuan</Text>
//       <Text style={styles.description}>
//         Temukan jawaban untuk pertanyaan Anda atau hubungi dukungan kami.
//       </Text>
//       <Gap height={20} />
//       <Text style={styles.question}>Bagaimana cara mengganti profil?</Text>
//       <Text style={styles.answer}>
//         Anda dapat mengganti profil Anda di menu "Profil Karyawan".
//       </Text>
//       <Text style={styles.question}>
//         Bagaimana cara mengubah pengaturan bahasa?
//       </Text>
//       <Text style={styles.answer}>
//         Anda dapat mengubah bahasa aplikasi melalui menu "Bahasa".
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   description: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginTop: 15,
//   },
//   answer: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginTop: 5,
//   },
// });

// ! screen untuk admin presensi
// import React from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {HeaderTransparent} from '../../Component';
// import {AbsenceView, ItemPerizinanAdmin} from '../../features/PresenceEmployee';
// import {COLORS} from '../../utils';

// export default function LibDemo({navigation}) {
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <View style={styles.headerWrapper}>
//         <HeaderTransparent
//           title="Absensi"
//           icon="arrow-left-circle-outline"
//           onPress={() => navigation.goBack()}
//           rightIcon="information-outline"
//         />
//         <View style={styles.additionalIconWrapper}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('FaceRecognitionRegistration')}
//             style={styles.additionalIconButton}>
//             <Icon name="face-recognition" size={17} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.additionalIconText}>Daftar</Text>
//         </View>
//       </View>
//       {/* Dashboard Section */}
//       <ItemPerizinanAdmin />

//       {/* Absence Menu Section */}
//       <AbsenceView navigation={navigation} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     elevation: 3,
//   },
//   additionalIconButton: {
//     marginRight: 10,
//     backgroundColor: '#4CAF50',
//     padding: 7,
//     borderRadius: 20,
//   },
//   additionalIconText: {
//     fontSize: 12,
//     color: COLORS.black,
//     textAlign: 'center',
//     position: 'absolute',
//     top: 35,
//     fontWeight: '600',
//   },
//   additionalIconWrapper: {
//     position: 'absolute',
//     top: 30,
//     right: 10,
//   },
//   container: {
//     flex: 1,
//   },
// });

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

// export default function RegistrationWithCamera() {
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     const requestPermission = async () => {
//       const permission = await Camera.getCameraPermissionStatus();
//       if (permission !== 'authorized') {
//         const newPermission = await Camera.requestCameraPermission();
//         setHasPermission(newPermission === 'authorized');
//       } else {
//         setHasPermission(true);
//       }
//     };
//     requestPermission();
//   }, []);

//   const takePhoto = async () => {
//     if (cameraRef.current) {
//       try {
//         const snapshot = await cameraRef.current.takePhoto({
//           quality: 0.8,
//         });
//         setPhoto(snapshot.path);
//       } catch (error) {
//         Alert.alert('Error', 'Failed to take photo: ' + error.message);
//       }
//     }
//   };

//   const retakePhoto = () => {
//     setPhoto(null);
//   };

//   if (!device) return <Text>Loading camera...</Text>;

//   return (
//     <View style={styles.container}>
//       {!photo ? (
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           device={device}
//           isActive={true}
//           photo={true}>
//           <View style={styles.cameraOverlay}>
//             <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
//               <View style={styles.innerCircle} />
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       ) : (
//         <View style={styles.previewContainer}>
//           <Image source={{uri: `file://${photo}`}} style={styles.preview} />
//           <View style={styles.actionButtons}>
//             <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
//               <Text style={styles.buttonText}>Retake</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.saveButton}
//               onPress={() => Alert.alert('Success', 'Photo has been saved.')}>
//               <Text style={styles.buttonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//   },
//   cameraOverlay: {
//     position: 'absolute',
//     bottom: 30,
//     width: '100%',
//     alignItems: 'center',
//   },
//   captureButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   innerCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#FF4C4C',
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   preview: {
//     width: '90%',
//     height: '70%',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//   },
//   retakeButton: {
//     backgroundColor: '#FF4C4C',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, HeaderTransparent} from '../../Component';
import {IMG_NAME_CARD_REBORN, IMG_REBORN_CAR_ESCAPE} from '../../assets';
import {COLORS, DIMENS} from '../../utils';

export default function LibDemo({navigation}) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [IMG_REBORN_CAR_ESCAPE, IMG_REBORN_CAR_ESCAPE];

  const handleScroll = event => {
    const position = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentScreen(position);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Detail Pinjam Mobil"
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{paddingBottom: 20}}
        style={styles.scrollViewContainer}>
        <View style={styles.bodyDetail}>
          <Text style={styles.txtCategoryCar}>Ambulance Car</Text>
          <Gap height={5} />
          <Text style={styles.txtNameCar}>Reborn GT-R NISMO 2019</Text>
          <Gap height={15} />
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            style={styles.scrollView}>
            {screens.map((image, index) => (
              <View key={index} style={styles.viewCar}>
                <Image source={image} style={{height: 120, width: 300}} />
              </View>
            ))}
          </ScrollView>

          {/* Pagination */}
          <View style={styles.viewPagination}>
            <View style={styles.paginationWrapper}>
              {screens.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentScreen === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </View>

          <Gap height={20} />
          <Text style={styles.title}>Detail Mobil</Text>
          <Gap height={10} />
          <View style={styles.contentCar}>
            <Image
              source={IMG_NAME_CARD_REBORN}
              style={{height: 50, width: 50, borderRadius: 7}}
            />
            <Gap width={15} />
            <View>
              <Text style={styles.txtTitleCar}>Mobil Reborn</Text>
              <Text style={styles.txtColorCar}>Hitam Pekat</Text>
              <Gap height={10} />

              <View style={styles.viewPlatAndDesc}>
                {/* Icon for Seats */}
                <View style={styles.row}>
                  <Icon name="seat" size={16} color={COLORS.black} />
                  <Text style={styles.txtDescCar}>2 seat - Manual</Text>
                </View>
                {/* Icon for Plate */}
                <View style={styles.row}>
                  <Icon name="car-info" size={16} color={COLORS.black} />
                  <Text style={styles.txtPlatCar}>KB - 1212 - BJH</Text>
                </View>
              </View>
            </View>
          </View>

          <Gap height={20} />
          <Text style={styles.title}>History Peminjaman</Text>
          <Gap height={10} />

          {/* History Peminjaman */}
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <View key={index} style={styles.contentCar}>
                <Icon
                  name="account-circle"
                  size={50}
                  color={COLORS.goldenOrange}
                />
                <Gap width={15} />
                <View>
                  <Text style={styles.txtTitleCar}>Fulan bin fulanah</Text>
                  <Text style={styles.txtColorCar}>Des, 22, 2025</Text>
                </View>
                <Gap height={20} />
              </View>
            ))}
        </View>
      </ScrollView>
      {/* Sticky Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Segera pinjam {'\n'}kendaraan pilihan Anda!
        </Text>
        <TouchableOpacity
          style={styles.buttonAction}
          activeOpacity={0.6}
          onPress={() => console.log('Pinjam Button Pressed')}>
          <Text style={styles.buttonText}>Pinjam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 0.2,
    borderColor: COLORS.grey,
  },
  footerText: {
    fontSize: DIMENS.m,
    fontWeight: '400',
    color: COLORS.grey,
  },
  buttonAction: {
    backgroundColor: COLORS.goldenOrange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: DIMENS.m,
    color: COLORS.white,
    fontWeight: '600',
  },
  title: {
    fontSize: DIMENS.m,
    color: COLORS.grey,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewPlatAndDesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '89%',
  },
  txtColorCar: {
    fontSize: DIMENS.s,
    color: '#333',
    fontWeight: '400',
  },
  txtPlatCar: {
    fontSize: DIMENS.s,
    color: COLORS.grey,
    fontWeight: '400',
  },
  txtTitleCar: {
    fontSize: DIMENS.xl,
    color: COLORS.black,
    fontWeight: '700',
  },
  contentCar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewPagination: {
    marginTop: 10,
    alignItems: 'center',
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.goldenOrange,
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  scrollView: {
    width: '100%',
    height: 140,
  },
  scrollViewContainer: {
    flex: 1,
  },
  viewCar: {
    alignSelf: 'center',
  },
  txtDescCar: {
    fontSize: DIMENS.m,
    color: COLORS.grey,
    fontWeight: '500',
  },
  txtNameCar: {
    fontSize: DIMENS.xxxl,
    color: COLORS.black,
    fontWeight: '500',
  },
  txtCategoryCar: {
    fontSize: DIMENS.m,
    color: COLORS.grey,
    fontWeight: '500',
  },
  bodyDetail: {
    padding: 15,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
