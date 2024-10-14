// // import React, {useRef} from 'react';
// // import {
// //   DrawerLayoutAndroid,
// //   Image,
// //   Pressable,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import {ICONS} from '../../assets';
// // import {COLORS} from '../../utils/colors';

// // export default function LibDemo() {
// //   const drawer = useRef(null);
// //   const drawerRight = useRef(null);

// //   const drawerLayout = (
// //     <View style={styles.Container}>
// //       <Pressable onPress={() => drawer.current?.closeDrawer()}>
// //         <Icon name={'account'} size={23} color={'black'} />
// //         <Text style={{color: 'blue', fontSize: 15}}>Drawer Dasboard</Text>
// //       </Pressable>
// //     </View>
// //   );

// //   const drawerLayoutRight = (
// //     <View style={styles.Container}>
// //       <Pressable onPress={() => drawer.current?.closeDrawer()}>
// //         <Icon name={'account'} size={23} color={'black'} />
// //         <Text style={{color: 'blue', fontSize: 15}}>Drawer Dasboard</Text>
// //       </Pressable>
// //     </View>
// //   );

// //   return (
// //     <View style={{flex: 1, padding: 20}}>
// //       <DrawerLayoutAndroid
// //         ref={drawer}
// //         drawerWidth={270}
// //         drawerPosition="left"
// //         renderNavigationView={() => drawerLayout}
// //         style={{flex: 1}}>
// //         <DrawerLayoutAndroid
// //           ref={drawerRight}
// //           drawerWidth={270}
// //           drawerPosition="right"
// //           renderNavigationView={() => drawerLayoutRight}
// //           style={{flex: 1}}>
// //           <View style={styles.Content}>
// //             <Pressable
// //               onPress={() => drawer.current?.openDrawer()}
// //               style={styles.bodyContent}>
// //               <View style={styles.leftContent}>
// //                 <Image
// //                   source={ICONS.LogoDaasboard}
// //                   style={{height: 53, width: 53}}
// //                 />
// //                 <Text style={styles.txtTitleNavbar}>Marcom</Text>
// //               </View>
// //               <Pressable onPress={() => drawerRight.current?.openDrawer()}>
// //                 <Image
// //                   source={ICONS.IconProfile}
// //                   style={{height: 53, width: 53}}
// //                 />
// //               </Pressable>
// //             </Pressable>
// //           </View>
// //         </DrawerLayoutAndroid>
// //       </DrawerLayoutAndroid>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   txtTitleNavbar: {
// //     textAlign: 'left',
// //     fontSize: 32,
// //     fontWeight: '500',
// //     color: COLORS.black,
// //     marginLeft: 10,
// //   },
// //   bodyContent: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   leftContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   Content: {
// //     flex: 1,
// //   },
// //   Container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignContent: 'center',
// //   },
// // });

// // import React from 'react';
// // import {useForm} from 'react-hook-form';
// // import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// // import {ButtonAction, Gap} from '../../Component';
// // import {IMAGE} from '../../assets';
// // import {COLORS} from '../../utils';

// // export default function LibDemo() {
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: {errors},
// //   } = useForm();

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.content}>
// //         <Image source={IMAGE.imgBoarding} style={styles.img} />
// //       </View>
// //       <Gap height={15} />
// //       <View style={styles.bodyText}>
// //         <Text style={styles.text}>
// //           Jalin relasi {'\n'}dengan customer dengan mudah
// //         </Text>
// //       </View>
// //       <Gap height={45} />
// //       <ButtonAction title="GET STARTED" />
// //       <Gap height={30} />
// //       <ButtonAction
// //         title="HAVE AN ACCOUNT"
// //         backgroundColor={COLORS.white}
// //         color={COLORS.turquoiseGreen}
// //       />
// //       <Gap height={10} />
// //       {/* <FormInput
// //         control={control}
// //         errors={errors}
// //         name={'inputfrom'}
// //         iconName="book"
// //         /> */}
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: COLORS.white,
// //     flex: 1,
// //     padding: 10,
// //   },
// //   content: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   img: {
// //     height: 410,
// //     width: 370,
// //   },
// //   bodyText: {
// //     alignItems: 'center',
// //   },
// //   text: {
// //     color: COLORS.turquoiseGreen,
// //     fontSize: 42,
// //     fontWeight: '500',
// //   },
// // });

// import React from 'react';
// import {useForm} from 'react-hook-form';
// import {StyleSheet, View} from 'react-native';
// import {
//   AlertPopUp,
//   ButtonCommon,
//   FormInput,
//   Gap,
//   Header,
//   HeaderTransparent,
// } from '../../Component';
// // import {FormInput} from '../../features/authentication';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   const {control, handleSubmit} = useForm();

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//       }}>
//       <ButtonCommon iconName={'home'} title={'hii'} iconColor={COLORS.black} />
//       {/* <Gap height={10} />
//       <ButtonDate title="hiii" />
//       <Gap height={10} />
//       <ButtonModal title="hii" loading={false} />
//       <Gap height={10} />
//       <ButtonRefresh iconSize={10} width={200} />
//       <Gap height={10} />
//       <ButtonViewMore elevation={10} title="hii" />
//       <Gap height={10} />
//       <ErrorGlobal />
//       <Gap height={10} />
//       <FloatingButton iconName="plus" />
//       <Gap height={10} />

//       <Gap height={10} />
//       <Gap height={10} />
//       <Line height={10} width={10} marginHorizontal={10} marginVertical={10} />
//       <Gap height={10} /> */}
//       {/* <ModalLoading /> */}
//       <HeaderTransparent icon="chevron-left-circle" title="hii" />
//       <Gap height={10} />
//       <Header />
//       {/* <ModalCustom
//         title="halo"
//         iconModalName="home"
//         backgroundColorStatusBar="HII"
//       /> */}
//       <Gap height={10} />
//       {/* <SearchInput style={{width: 200}} borderColor="red" /> */}
//       <Gap height={10} />
//       <FormInput
//         control={control}
//         name="password"
//         autoCapitalize="none"
//         iconName="lock"
//         placeholder="Kata sandi..."
//         title="Password"
//         secureText
//       />
//       {/* <FormInput
//         control={control}
//         name="name"
//         iconName="account"
//         placeholder="Masukan nama..."
//         title="Nama Lengkap"
//         autoCapitalize="words"
//       />
//       <FormInput
//         control={control}
//         name="password"
//         iconName="lock"
//         placeholder="Kata sandi..."
//         title="Password"
//         secureText
//         autoCapitalize="none"
//       />
//       <FormInput
//         control={control}
//         name="division"
//         mode="picker"
//         iconName="office-building"
//         title="Divisi"
//         picker={{
//           // data: divisions,
//           // error: divisionsError,
//           // loading: divisionsLoading,
//           label: 'name',
//           value: 'id',
//           // onRefresh: () => getDivisions(),
//         }}
//       />
//       <FormInput
//         control={control}
//         name="department"
//         mode="picker"
//         iconName="domain"
//         title="Departemen"
//         picker={{
//           // data: departments,
//           // error: departmentsError,
//           // loading: departmentsLoading,
//           label: 'name',
//           value: 'id',
//           // onRefresh: () => getDepartments(),
//         }}
//       /> */}
//       {/* <FormInput
//         control={control}
//         name="branch"
//         mode="picker"
//         iconName="source-branch"
//         title="Cabang"
//         picker={{
//           // data: branches,
//           // error: branchesError,
//           // loading: branchesLoading,
//           label: 'name',
//           value: 'id',
//           // onRefresh: () => getBranches(),
//         }}
//       /> */}
//       {/* <FormInput
//         control={control}
//         name="position"
//         mode="picker"
//         iconName="card-account-details-star"
//         title="Jabatan"
//         picker={{
//           data: [
//             {name: 'Staff', value: 'staff'},
//             {name: 'Supervisor', value: 'supervisor'},
//             {name: 'Manager', value: 'manager'},
//           ],
//           loading: false,
//           label: 'name',
//           value: 'value',
//         }}
//       /> */}
//       {/* <FormInput
//         control={control}
//         name="gender"
//         mode="picker"
//         iconName="gender-male-female"
//         title="Gender"
//         picker={{
//           data: [
//             {name: 'Pria', value: 'Pria'},
//             {name: 'Wanita', value: 'Wanita'},
//           ],
//           loading: false,
//           label: 'name',
//           value: 'value',
//         }}
//       /> */}
//       <Gap height={10} />
//       <AlertPopUp show={true} />
//       <Gap height={10} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

// import React, {useEffect, useState} from 'react';
// import {Alert, Text, TouchableOpacity, View} from 'react-native';
// import ReactNativeBiometrics from 'react-native-biometrics';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const LibDemo = () => {
//   const [biometryType, setBiometryType] = useState(null);

//   useEffect(() => {
//     const rnBiometrics = new ReactNativeBiometrics();

//     // Mengecek apakah sensor biometrik tersedia
//     rnBiometrics.isSensorAvailable().then(resultObject => {
//       const {available, biometryType} = resultObject;

//       if (available) {
//         setBiometryType(biometryType);
//       } else {
//         Alert.alert('Sensor biometrik tidak tersedia');
//       }
//     });
//   }, []);

//   const registerFingerprint = () => {
//     const rnBiometrics = new ReactNativeBiometrics();

//     // Proses pembuatan kunci biometrik
//     rnBiometrics
//       .createKeys()
//       .then(resultObject => {
//         const {publicKey} = resultObject;
//         console.log('Public Key:', publicKey);
//         Alert.alert('Fingerprint Terdaftar', 'Kunci publik berhasil dibuat');
//         // Kirim publicKey ke server jika diperlukan
//       })
//       .catch(() => {
//         Alert.alert('Error', 'Terjadi kesalahan saat mendaftarkan fingerprint');
//       });
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Jenis Biometrik: {biometryType}</Text>

//       {/* Gambar fingerprint yang bisa ditekan */}
//       <TouchableOpacity onPress={registerFingerprint}>
//         <Icon name="fingerprint" height="400" width="400" />
//         {/* <Image source={BiometricSvg} style={{width: 100, height: 100}} /> */}
//       </TouchableOpacity>

//       <Text>Tekan fingerprint untuk mendaftarkan sidik jari Anda</Text>
//     </View>
//   );
// };

// export default LibDemo;

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricsAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    checkFingerprintAvailability();
  }, []);

  const checkFingerprintAvailability = () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        Alert.alert('Info', 'Fingerprint tersedia di perangkat Anda.');
      } else {
        Alert.alert('Gagal', 'Fingerprint tidak tersedia di perangkat ini.');
      }
    });
  };

  const authenticateWithFingerprint = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Scan Fingerprint Anda'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          setIsAuthenticated(true);
          Alert.alert('Sukses', 'Fingerprint Autentikasi Berhasil!');
        } else {
          Alert.alert('Gagal', 'Fingerprint Autentikasi Dibatalkan Pengguna.');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Fingerprint Autentikasi Gagal.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Silahkan gunakan Fingerprint untuk absen kehadiran
      </Text>

      <TouchableOpacity
        onPress={authenticateWithFingerprint}
        style={styles.fingerprintButton}>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios-filled/100/000000/fingerprint.png',
          }}
          style={styles.fingerprintImage}
        />
      </TouchableOpacity>

      {isAuthenticated && (
        <Text style={styles.successText}>Autentikasi Berhasil!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  fingerprintButton: {
    padding: 20,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
  },
  fingerprintImage: {
    width: 100,
    height: 100,
  },
  successText: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
  },
});

export default BiometricsAuth;
