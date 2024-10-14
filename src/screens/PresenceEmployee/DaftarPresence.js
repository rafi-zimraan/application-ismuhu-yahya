import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap, HeaderTransparent} from '../../Component';
import {IMG_ISMUHUYAHYA_POTRAIT} from '../../assets';
import {BiometricSvg, ModalSucces} from '../../features/PresenceEmployee';
import {FormInput} from '../../features/authentication';
import {COLORS} from '../../utils';

export default function DaftarPresence({navigation}) {
  const {control, handleSubmit, getValues} = useForm(); // Menggunakan getValues untuk validasi
  const [isFingerprintAdded, setIsFingerprintAdded] = useState(false); // Untuk status fingerprint
  const [modalVisible, setModalVisible] = useState(false); // Untuk menampilkan modal
  const [showAlert, setShowAlert] = useState(false); // Menyimpan status alert

  // Fungsi untuk validasi input
  const handleAddFingerprint = () => {
    const division = getValues('division');
    const department = getValues('department');
    const username = getValues('username');

    // Cek jika salah satu dari field divisi, department, atau nama belum diisi
    // if (!division || !department || !username) {
    //   setShowAlert(true); // Tampilkan alert jika input tidak valid
    //   return;
    // }

    // Jika semua data sudah diisi, maka bisa tambahkan fingerprint
    setIsFingerprintAdded(true);
    setModalVisible(true);
    setShowAlert(false);
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
            // picker={{data: divisions, label: 'name', value: 'id'}}
          />
          <Gap height={20} />

          {/* Picker for departments (auto refresh based on divId) */}
          <FormInput
            control={control}
            name="department"
            mode="picker"
            iconName="domain"
            title="Department"
            // picker={{data: departments, label: 'name', value: 'id'}}
          />
          <Gap height={20} />

          {/* Picker for username */}
          <FormInput
            control={control}
            name="username"
            iconName="account"
            title="Name"
            placeholder="Nama Lengkap"
          />
          <Gap height={30} />

          {/* Fingerprint Section */}
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.txtFingerPrint}> Create your fingerprint</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddFingerprint}>
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

      {/* {!isFingerprintAdded && showAlert && (
        <AlertPopUp
          show={true}
          message="Harap isi semua data (divisi, department, dan nama) sebelum menambahkan fingerprint."
        />
      )} */}
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
