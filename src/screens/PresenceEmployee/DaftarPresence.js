import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
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

export default function DaftarPresence({navigation}) {
  const {control, handleSubmit, getValues, watch} = useForm();
  const [isFingerprintAdded, setIsFingerprintAdded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [users, setUsers] = useState([]);

  // save id
  const selectedDivision = watch('division');
  const selectedDepartment = watch('department');
  const selectedUser = watch('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisionData = await getAllDivision();
        setDivisions(divisionData);

        // Fetch departmant when a division is selected
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
        console.log('error fecthing data:', error);
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

      if (available && biometryType) {
        // Generate publicKey
        const {publicKey} = await rnBiometrics.createKeys();
        console.log('publickey', publicKey);
        await EncryptedStorage.setItem('publickey', publicKey);

        if (selectedUser) {
          const response = await createFinger(publicKey, selectedUser);

          if (response.success && response.saveFinger) {
            // create payload for signature
            let saveTimeSignature = Math.random(
              new Date().getTime() / 1000,
            ).toString();
            let payload = saveTimeSignature + 'save_verification';

            // create signature for fingerprint verification
            const {success, signature} = await rnBiometrics.createSignature({
              promptMessage: 'Sentuh sensor sidik jari',
              payload: payload,
            });

            if (success) {
              await EncryptedStorage.setItem('signature', signature);
              console.log('signature', signature);

              setIsFingerprintAdded(true);
              setModalVisible(true);
              setTimeout(() => {
                setModalVisible(false);
              }, 2000);
            } else {
              ToastAndroid.show('Error creating signature', ToastAndroid.SHORT);
            }
          }
        } else {
          ToastAndroid.show('User ID not selected', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Biometric not available', ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log('error', e);
      ToastAndroid.show('Error Registering fingerprint', ToastAndroid.SHORT);
    }
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
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <Gap height={25} />
        <View style={styles.body}>
          <Image source={IMG_ISMUHUYAHYA_POTRAIT} style={styles.img} />
          <View style={styles.content}>
            <Text style={styles.txtTitle}>
              "Selesaikan pendaftaran diri anda, {'\n'}Sesuaikan pekerjaan anda
              dengan benar!"
            </Text>
            <Gap height={20} />

            {/* Picker for divisions */}
            <FormInput
              control={control}
              name="division"
              mode="picker"
              iconName="office-building"
              title="Divisi"
              picker={{data: divisions, label: 'division_name', value: 'id'}}
            />
            <Gap height={20} />

            {/* Picker for departments */}
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
            />
            <Gap height={20} />

            {/* Picker for username */}
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
            />
            <Gap height={30} />

            {/* Fingerprint Section */}
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.txtFingerPrint}>Create your fingerprint</Text>
              <TouchableOpacity
                activeOpacity={0.13}
                onPress={handleAddFingerPrint}>
                <BiometricSvg
                  width={100}
                  height={100}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Modal sukses setelah semua data dan fingerprint ditambahkan */}
        {modalVisible && <ModalSucces />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  txtFingerPrint: {
    color: COLORS.black,
    fontSize: 17,
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  img: {
    width: 400,
    height: 335,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 500,
    marginTop: 50,
  },
  txtTitle: {
    color: COLORS.gold,
    textAlign: 'justify',
    fontSize: 30,
    fontWeight: '500',
  },
});
