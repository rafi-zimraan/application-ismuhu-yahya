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
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../features/Language/services/languageSlice';
import {COLORS} from '../../utils';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.currentLanguage);

  const [isModalVisible, setModalVisible] = useState(false);

  const languages = [
    {code: 'en', label: 'English'},
    {code: 'id', label: 'Bahasa Indonesia'},
    {code: 'fr', label: 'Français'},
  ];

  const handleLanguageChange = languageCode => {
    dispatch(setLanguage(languageCode));
    setModalVisible(false);
  };

  return (
    <View style={[styles.section, {backgroundColor: COLORS.white}]}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.sectionTitle}>Pilih Bahasa</Text>
        <Text style={styles.sectionSubtitle}>
          {languages.find(lang => lang.code === currentLanguage)?.label ||
            'Pilih Bahasa'}
        </Text>
      </TouchableOpacity>

      {/* Modal Pilihan Bahasa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Bahasa</Text>
            <FlatList
              data={languages}
              keyExtractor={item => item.code}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleLanguageChange(item.code)}>
                  <Text
                    style={[
                      styles.modalItemText,
                      item.code === currentLanguage && styles.selectedLanguage,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.black,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedLanguage: {
    fontWeight: 'bold',
    color: COLORS.goldenOrange,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 14,
  },
});

export default LanguageSelector;
