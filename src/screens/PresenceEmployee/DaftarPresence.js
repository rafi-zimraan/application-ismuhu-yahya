// import React, {useEffect, useState} from 'react';
// import {useForm} from 'react-hook-form';
// import {
//   ActivityIndicator,
//   Dimensions,
//   Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ReactNativeBiometrics from 'react-native-biometrics';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import {Background, Gap, HeaderTransparent} from '../../Component';
// import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
// import {
//   BiometricSvg,
//   ModalSucces,
//   createFinger,
//   getAllDivision,
//   getDepartmentByDivision,
//   getUserFromDepartment,
// } from '../../features/PresenceEmployee';
// import {FormInput} from '../../features/authentication';
// import {COLORS} from '../../utils';

// const screenWidth = Dimensions.get('window').width;
// const smallScreen = screenWidth < 360;

// export default function DaftarPresence({navigation}) {
//   const {control, handleSubmit, getValues, watch} = useForm();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [divisions, setDivisions] = useState([]);
//   const [departements, setDepartements] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [isFingerLoading, setIsFingerLoading] = useState(false);

//   // save id
//   const selectedDivision = watch('division');
//   const selectedDepartment = watch('department');
//   const selectedUser = watch('username');
//   console.log('users', selectedUser);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const divisionData = await getAllDivision();
//         setDivisions(divisionData);

//         if (selectedDivision) {
//           const departmentData = await getDepartmentByDivision(
//             selectedDivision,
//           );
//           setDepartements(departmentData);
//         }

//         if (selectedDivision && selectedDepartment) {
//           const userData = await getUserFromDepartment(
//             selectedDivision,
//             selectedDepartment,
//           );
//           setUsers(userData);
//         }
//       } catch (error) {
//         console.log('error fecthing data:', error);
//         ToastAndroid.show(error.message, ToastAndroid.SHORT);
//       }
//     };
//     fetchData();
//   }, [selectedDivision, selectedDepartment]);

//   const handleAddFingerPrint = async () => {
//     const rnBiometrics = new ReactNativeBiometrics({
//       allowDeviceCredentials: true,
//     });

//     try {
//       const {available, biometryType} = await rnBiometrics.isSensorAvailable();

//       if (!available || !biometryType) {
//         setIsFingerLoading(false);
//         return ToastAndroid.show('Biometric not available', ToastAndroid.SHORT);
//       }

//       const {publicKey} = await rnBiometrics.createKeys();
//       console.log('publickey----->', publicKey);

//       if (!selectedUser) {
//         setIsFingerLoading(false);
//         return ToastAndroid.show(
//           'Silahkan daftarkan data terlebih',
//           ToastAndroid.SHORT,
//         );
//       }

//       const response = await createFinger(publicKey, selectedUser);

//       if (response.success && response.saveFinger && response.name) {
//         // const payload = 'fixedPayloadForRegistration';
//         const {success, signature} = await rnBiometrics.createSignature({
//           promptMessage: 'Silahkan sentuh sensor',
//           payload: selectedUser,
//         });

//         if (success) {
//           const newRegistrationData = {
//             name: response.name,
//             saveFinger: response.saveFinger,
//             signature: signature,
//           };

//           const storedData =
//             (await EncryptedStorage.getItem('fingerprintData')) || [];
//           const localData = storedData.length > 0 ? JSON.parse(storedData) : [];
//           EncryptedStorage.setItem(
//             'fingerprintData',
//             JSON.stringify([...localData, newRegistrationData]),
//           );
//           console.log('localdata---->', localData);
//           console.log('newdata---->', newRegistrationData);

//           setModalVisible(true);
//           setTimeout(() => {
//             setModalVisible(false);
//           }, 2000);
//         } else {
//           console.log('error create fingerprint');
//           ToastAndroid.show('error create fingerprint', ToastAndroid.SHORT);
//         }
//       } else {
//         console.log('fingerprint error create ', response);
//       }
//     } catch (error) {
//       console.log('error registering fingerprint', error);
//       ToastAndroid.show('Error registering fingerprint', ToastAndroid.SHORT);
//     }
//     setIsFingerLoading(false);
//   };

//   return (
//     <View style={{flex: 1}}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <Background />
//       <HeaderTransparent
//         icon="arrow-left-circle-outline"
//         title="Daftar fingerprint"
//         onPress={() => navigation.goBack()}
//       />
//       <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
//         <Gap height={25} />
//         <View style={styles.body}>
//           <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />
//           <View style={styles.content}>
//             <Text style={styles.txtTitle}>
//               "Selesaikan pendaftaran diri anda, {'\n'}Sesuaikan pekerjaan anda
//               dengan benar!"
//             </Text>
//             <Gap height={20} />

//             {/* Picker for divisions */}
//             <FormInput
//               control={control}
//               name="division"
//               mode="picker"
//               iconName="office-building"
//               title="Divisi"
//               picker={{data: divisions, label: 'division_name', value: 'id'}}
//             />
//             <Gap height={20} />

//             {/* Picker for departments */}
//             <FormInput
//               control={control}
//               name="department"
//               mode="picker"
//               iconName="domain"
//               title="Department"
//               picker={{
//                 data: departements,
//                 label: 'department',
//                 value: 'id_department',
//               }}
//             />
//             <Gap height={20} />

//             {/* Picker for username */}
//             <FormInput
//               control={control}
//               name="username"
//               iconName="account"
//               title="Name"
//               mode="picker"
//               picker={{
//                 data: users,
//                 label: 'name',
//                 value: 'user_id',
//               }}
//             />
//             <Gap height={30} />

//             {/* Fingerprint Section */}
//             <View style={{alignSelf: 'center'}}>
//               <Text style={styles.txtFingerPrint}>Create your fingerprint</Text>
//               <TouchableOpacity
//                 activeOpacity={0.13}
//                 onPress={handleAddFingerPrint}>
//                 {isFingerLoading ? (
//                   <ActivityIndicator size={'small'} color={COLORS.black} />
//                 ) : (
//                   <BiometricSvg
//                     width={100}
//                     height={100}
//                     style={{alignSelf: 'center'}}
//                   />
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         {modalVisible && <ModalSucces />}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   txtFingerPrint: {
//     color: COLORS.black,
//     fontSize: 17,
//     fontWeight: '500',
//   },
//   content: {
//     padding: 20,
//   },
//   img: {
//     width: smallScreen ? '90%' : '100%',
//     height: smallScreen ? 250 : 335,
//   },
//   body: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     height: 500,
//     marginTop: 50,
//   },
//   txtTitle: {
//     color: COLORS.gold,
//     textAlign: 'justify',
//     fontSize: smallScreen ? 24 : 30,
//     fontWeight: '500',
//   },
// });

import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {
  BiometricSvg,
  ModalSucces,
  createFinger,
  getAllDivision,
  getDepartmentByDivision,
  getUserFromDepartment,
} from '../../features/PresenceEmployee';
import {FormInput} from '../../features/authentication';
import {COLORS} from '../../utils';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isLandscape = screenWidth > screenHeight;

export default function DaftarPresence({navigation}) {
  const {control, handleSubmit, getValues, watch} = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [users, setUsers] = useState([]);
  const [isFingerLoading, setIsFingerLoading] = useState(false);

  const selectedDivision = watch('division');
  const selectedDepartment = watch('department');
  const selectedUser = watch('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisionData = await getAllDivision();
        setDivisions(divisionData);

        if (selectedDivision) {
          const departmentData = await getDepartmentByDivision(
            selectedDivision,
          );
          setDepartements(departmentData);
        }

        if (selectedDivision && selectedDepartment) {
          const userData = await getUserFromDepartment(
            selectedDivision,
            selectedDepartment,
          );
          setUsers(userData);
        }
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };
    fetchData();
  }, [selectedDivision, selectedDepartment]);

  const handleAddFingerPrint = async () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });

    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (!available || !biometryType) {
        setIsFingerLoading(false);
        return ToastAndroid.show('Biometric not available', ToastAndroid.SHORT);
      }

      const {publicKey} = await rnBiometrics.createKeys();

      if (!selectedUser) {
        setIsFingerLoading(false);
        return ToastAndroid.show(
          'Silahkan daftarkan data terlebih',
          ToastAndroid.SHORT,
        );
      }

      const response = await createFinger(publicKey, selectedUser);

      if (response.success && response.saveFinger && response.name) {
        const {success, signature} = await rnBiometrics.createSignature({
          promptMessage: 'Silahkan sentuh sensor',
          payload: selectedUser,
        });

        if (success) {
          const newRegistrationData = {
            name: response.name,
            saveFinger: response.saveFinger,
            signature: signature,
          };

          const storedData =
            (await EncryptedStorage.getItem('fingerprintData')) || [];
          const localData = storedData.length > 0 ? JSON.parse(storedData) : [];
          EncryptedStorage.setItem(
            'fingerprintData',
            JSON.stringify([...localData, newRegistrationData]),
          );

          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
        } else {
          ToastAndroid.show('Error create fingerprint', ToastAndroid.SHORT);
        }
      } else {
        console.log('fingerprint error create ', response);
      }
    } catch (error) {
      ToastAndroid.show('Error registering fingerprint', ToastAndroid.SHORT);
    }
    setIsFingerLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        icon="arrow-left-circle-outline"
        title="Daftar fingerprint"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Gap height={25} />
        <View style={[styles.body, isLandscape && styles.bodyLandscape]}>
          <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />
          <View
            style={[styles.content, isLandscape && styles.contentLandscape]}>
            <Text style={styles.txtTitle}>
              "Selesaikan pendaftaran diri anda,{'\n'}Sesuaikan pekerjaan anda
              dengan benar!"
            </Text>
          </View>
        </View>

        <Gap height={10} />
        {/* Dropdowns and Fingerprint Section */}
        <View style={styles.dropdownContainer}>
          <FormInput
            control={control}
            name="division"
            mode="picker"
            iconName="office-building"
            title="Divisi"
            picker={{data: divisions, label: 'division_name', value: 'id'}}
            style={styles.dropdown}
          />
          <Gap height={15} />

          <FormInput
            control={control}
            name="department"
            mode="picker"
            iconName="domain"
            title="Department"
            picker={{
              data: departements,
              label: 'department',
              value: 'id_department',
            }}
            style={styles.dropdown}
          />
          <Gap height={15} />

          <FormInput
            control={control}
            name="username"
            iconName="account"
            title="Name"
            mode="picker"
            picker={{
              data: users,
              label: 'name',
              value: 'user_id',
            }}
            style={styles.dropdown}
          />
          <Gap height={5} />

          <View style={styles.fingerprintContainer}>
            <Text style={styles.txtFingerPrint}>Create your fingerprint</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddFingerPrint}
              style={styles.fingerprintButton}>
              {isFingerLoading ? (
                <ActivityIndicator size={'small'} color={COLORS.black} />
              ) : (
                <BiometricSvg width={90} height={90} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={10} />

        {modalVisible && <ModalSucces />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  txtFingerPrint: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bodyLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    width: '40%',
    height: 150,
    resizeMode: 'contain',
    marginRight: 15,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
  },
  txtTitle: {
    color: COLORS.gold,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
  },
  dropdownContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  fingerprintContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  fingerprintButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
});
