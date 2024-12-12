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

// ! BANTUAN & DUKUNGAN - TENTANG APLIKASI
// import React from 'react';
// import {ScrollView, StyleSheet, Text} from 'react-native';
// import {Gap} from '../../Component';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <ScrollView style={styles.container}>
//       <Gap height={20} />
//       <Text style={styles.header}>Tentang Aplikasi</Text>
//       <Text style={styles.description}>
//         Aplikasi ini dirancang untuk membantu pengelolaan pengaturan pengguna
//         secara efisien.
//       </Text>
//       <Text style={styles.detail}>
//         Versi: 1.0.0{'\n'}
//         Developer: Nama Developer{'\n'}
//         Hak Cipta: © 2024 Nama Perusahaan.
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
//   detail: {
//     fontSize: 16,
//     color: COLORS.darkGray,
//     lineHeight: 24,
//   },
// });

// ! ini QR-CODE
// import React, {useEffect, useState} from 'react';
// import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import {HeaderTransparent} from '../../Component';

// const screenWidth = Dimensions.get('window').width;

// export default function LibDemo({navigation}) {
//   const [qrData, setQrData] = useState('');

//   useEffect(() => {
//     // Generate QR Code data berdasarkan tanggal saat ini
//     const generateQrData = () => {
//       const today = new Date();
//       const dateString = `${today.getFullYear()}-${
//         today.getMonth() + 1
//       }-${today.getDate()}`;
//       const uniqueKey = `presensi-${dateString}`;
//       console.log('Data QR Code yang dihasilkan:', uniqueKey);
//       setQrData(uniqueKey);
//     };

//     generateQrData();

//     // Perbarui data QR Code setiap 24 jam
//     const interval = setInterval(() => {
//       generateQrData();
//     }, 24 * 60 * 60 * 1000); // 24 jam dalam milidetik

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <HeaderTransparent
//         title="Absensi Qr-code"
//         icon="arrow-left-circle-outline"
//         onPress={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <Text style={styles.title}>QR-Code Presensi</Text>
//         <View style={styles.qrContainer}>
//           {qrData ? (
//             <QRCode value={qrData} size={200} />
//           ) : (
//             <Text>Memuat Kode QR...</Text>
//           )}
//         </View>
//         <Text style={styles.instructionText}>
//           Pindai kode ini menggunakan ponsel Anda untuk melakukan presensi
//           kerja.
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 25,
//     position: 'absolute',
//     top: 220,
//     left: 40,
//     right: 40,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//   },
//   qrContainer: {
//     width: 220,
//     height: 220,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     shadowOffset: {width: 0, height: 2},
//     elevation: 5,
//   },
//   instructionText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 20,
//     textAlign: 'center',
//   },
// });

// ! ini screen admin presensi
// import {useNavigation} from '@react-navigation/native';
// import React from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {HeaderTransparent} from '../../Component';
// import {ICON_ILUSTRATION_SCAAN_QR_CODE} from '../../assets';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <HeaderTransparent
//         title="Absensi"
//         icon="arrow-left-circle-outline"
//         onPress={() => navigation.goBack()}
//         rightIcon="information-outline"
//       />

//       <View style={styles.dashboardContainer}>
//         <View style={styles.profileContainer}>
//           <Image
//             source={ICON_ILUSTRATION_SCAAN_QR_CODE}
//             style={styles.profileImage}
//           />
//           <Text style={styles.profileDescription}>
//             Selamat datang! Untuk melakukan absensi, silakan pilih tombol di
//             bawah ini dan lakukan scan QR Code.
//           </Text>
//         </View>
//       </View>
//       <View style={styles.viewBodyPresensi}>
//         <Text style={styles.title}>Lakukan Absensi</Text>

//         {/* Tambahan elemen menarik */}
//         <View style={styles.infoContainer}>
//           <Icon name="information-outline" size={24} color={COLORS.black} />
//           <Text style={styles.infoText}>
//             Pastikan Anda berada di lokasi yang telah ditentukan untuk memindai
//             QR Code.
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={styles.qrButton}
//           onPress={() => navigation.navigate('QRCodeScanner')}>
//           <View style={styles.qrButtonBackground}>
//             <Icon name="qrcode" size={32} color="white" />
//             <Text style={styles.qrButtonText}>Scan QR Code untuk Absensi</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   viewBodyPresensi: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fbe9e7', // Background seperti button warning
//     borderTopLeftRadius: 45,
//     borderTopRightRadius: 45,
//     elevation: 5,
//     paddingTop: 20,
//   },
//   container: {
//     flex: 1,
//   },
//   backIcon: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   dashboardContainer: {
//     height: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 300,
//     height: '80%',
//     marginBottom: 10,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   profileDescription: {
//     fontSize: 16,
//     color: '#6c757d',
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     marginHorizontal: 20,
//     padding: 5,
//     borderRadius: 5,
//     backgroundColor: '#d3e3e8', // Warna tidak terlalu terang
//   },
//   infoText: {
//     fontSize: 14,
//     color: COLORS.black,
//     marginLeft: 10,
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: COLORS.black,
//   },
//   qrButton: {
//     marginVertical: 10,
//   },
//   qrButtonBackground: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ffab40', // Estetik dengan warna tidak mencolok
//     padding: 16,
//     borderRadius: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   qrButtonText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   qrScreenContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   qrScreenText: {
//     fontSize: 18,
//   },
// });

// import {useNavigation} from '@react-navigation/native';
// import React from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Gap, HeaderTransparent} from '../../Component';
// import {ICON_ILUSTRATION_SCAAN_QR_CODE} from '../../assets';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
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

//       <View style={styles.dashboardContainer}>
//         <View style={styles.profileContainer}>
//           <Image
//             source={ICON_ILUSTRATION_SCAAN_QR_CODE}
//             style={styles.profileImage}
//           />
//           <Text style={styles.profileDescription}>
//             Selamat datang! Untuk melakukan absensi, silakan pilih tombol di
//             bawah ini dan lakukan scan QR Code atau daftar wajah Anda.
//           </Text>
//         </View>
//       </View>

//       <View style={styles.viewBodyPresensi}>
//         <Text style={styles.title}>Lakukan Absensi</Text>

//         <Gap height={25} />
//         <View style={styles.infoContainer}>
//           <Icon name="information-outline" size={24} color={COLORS.black} />
//           <Text style={styles.infoText}>
//             Pastikan Anda berada di lokasi yang telah ditentukan untuk memindai
//             QR Code.
//           </Text>
//         </View>

//         <Gap height={10} />
//         <View style={styles.BottomMenuPresensi}>
//           <TouchableOpacity
//             style={styles.qrButton}
//             onPress={() => navigation.navigate('QRCodeScanner')}>
//             <View style={styles.qrButtonBackground}>
//               <Icon name="qrcode" size={32} color="white" />
//               <Text style={styles.qrButtonText}>QR Code </Text>
//             </View>
//           </TouchableOpacity>
//           {/* <Gap width={15} /> */}
//           <TouchableOpacity
//             style={styles.faceButton}
//             onPress={() => navigation.navigate('FaceRecognitionAbsence')}>
//             <View style={styles.faceButtonBackground}>
//               <Icon name="camera" size={32} color="white" />
//               <Text style={styles.faceButtonText}>Absensi Wajah</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   BottomMenuPresensi: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '90%',
//   },
//   container: {
//     flex: 1,
//   },
//   headerWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     elevation: 3,
//   },
//   additionalIconWrapper: {
//     position: 'absolute',
//     top: 30,
//     right: 10,
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
//   dashboardContainer: {
//     height: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 300,
//     height: '80%',
//     marginBottom: 10,
//   },
//   profileDescription: {
//     fontSize: 16,
//     color: '#6c757d',
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
//   viewBodyPresensi: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fbe9e7',
//     borderTopLeftRadius: 45,
//     borderTopRightRadius: 45,
//     elevation: 5,
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: COLORS.black,
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     marginHorizontal: 20,
//     padding: 5,
//     borderRadius: 5,
//     backgroundColor: '#d3e3e8',
//   },
//   infoText: {
//     fontSize: 14,
//     color: COLORS.black,
//     marginLeft: 10,
//     textAlign: 'center',
//   },
//   qrButton: {
//     marginVertical: 10,
//   },
//   qrButtonBackground: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFD166',
//     padding: 5,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   qrButtonText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   faceButton: {
//     marginVertical: 10,
//   },
//   faceButtonBackground: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.greenSoft,
//     padding: 5,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   faceButtonText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderTransparent} from '../../Component';
import {AbsenceView, ItemPerizinanAdmin} from '../../features/PresenceEmployee';
import {COLORS} from '../../utils';

export default function LibDemo({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Absensi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
          rightIcon="information-outline"
        />
        <View style={styles.additionalIconWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FaceRecognitionRegistration')}
            style={styles.additionalIconButton}>
            <Icon name="face-recognition" size={17} color="white" />
          </TouchableOpacity>
          <Text style={styles.additionalIconText}>Daftar</Text>
        </View>
      </View>
      {/* Dashboard Section */}
      <ItemPerizinanAdmin />

      {/* Absence Menu Section */}
      <AbsenceView navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  additionalIconButton: {
    marginRight: 10,
    backgroundColor: '#4CAF50',
    padding: 7,
    borderRadius: 20,
  },
  additionalIconText: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
    position: 'absolute',
    top: 35,
    fontWeight: '600',
  },
  additionalIconWrapper: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  container: {
    flex: 1,
  },
});
