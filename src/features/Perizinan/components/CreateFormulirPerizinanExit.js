import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {CustomTextInput, addPerizinanKeluar} from '..';
import {
  AlertWarning,
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';
import {getAllDepartment} from '../../Departmant';
import {getAllDivisions} from '../../Divisi';

export default function CreateFormulirPerizinanExit({navigation, route}) {
  const {division_id, department_id} = route.params;
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [divisionId, setDivisionId] = useState(division_id || '');
  const [departmentId, setDepartmentId] = useState(department_id || '');
  const [desc, setDesc] = useState('');
  const [necessity, setNecessity] = useState('');
  const [outTime, setOutTime] = useState('');
  const [intTime, setIntTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchDivisionsAndDepartments = async () => {
      try {
        setLoadingDivision(true);
        const divisions = await getAllDivisions();
        setDivisionName(divisions?.data?.data?.[0]?.name);
        setDivisionId(divisions?.data?.data?.[0]?.id);
        setLoadingDepartment(true);
        const departments = await getAllDepartment();
        setDepartmentName(departments?.data?.data?.[0]?.name);
        setDepartmentId(departments?.data?.data?.[0]?.id);
      } catch (error) {
        console.error('Error fetching divisions or departments:', error);
      } finally {
        setLoadingDivision(false);
        setLoadingDepartment(false);
      }
    };

    fetchDivisionsAndDepartments();
  }, []);

  useEffect(() => {
    if (outTime && intTime) {
      try {
        const timeRegex = /^\d{2}:\d{2}$/; // Validasi format HH:mm
        if (!timeRegex.test(outTime) || !timeRegex.test(intTime)) {
          throw new Error('Invalid time format');
        }

        const [outHours, outMinutes] = outTime.split(':').map(Number);
        const [inHours, inMinutes] = intTime.split(':').map(Number);

        const outDate = new Date(0, 0, 0, outHours, outMinutes);
        const inDate = new Date(0, 0, 0, inHours, inMinutes);

        let diff = (inDate - outDate) / 1000;
        if (diff < 0) {
          diff += 24 * 60 * 60;
        }
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);

        setTotalTime(`${hours} jam ${minutes} menit`);
      } catch (error) {
        console.error('Error calculating total time:', error.message);
        setTotalTime('');
      }
    } else {
      setTotalTime('');
    }
  }, [outTime, intTime]);

  const onSubmit = async () => {
    if (!desc || !necessity) {
      setAlertMessage('Harap lengkapi semua kolom sebelum mengirim.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      const data = {
        division_id: divisionId,
        department_id: departmentId,
        desc: desc,
        necessity: necessity,
        out: outTime,
        in: intTime,
        duration: totalTime,
      };

      const response = await addPerizinanKeluar(data);
      console.log('response', response);

      if (response?.status === true) {
        setShowSuccessModal(true);
      } else if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        ToastAndroid.show(
          response?.message || 'Gagal menambahkan data.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error.message || 'Terjadi kesalahan saat menambahkan data');
      ToastAndroid.show(
        error.message || 'Terjadi kesalahan saat menambahkan data',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Perizinan Keluar"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <AlertWarning show={showAlert} message={alertMessage} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <CustomTextInput
            label="Division"
            value={divisionName}
            placeholder="Memuat..."
            isLoading={loadingDivision}
          />
          <CustomTextInput
            label="Department"
            value={departmentName}
            placeholder="Memuat..."
            isLoading={loadingDepartment}
          />

          <CustomTextInput
            label="Deskripsi"
            value={desc}
            onChangeText={setDesc}
            placeholder="Masukkan keperluan"
            placeholderTextColor={COLORS.grey}
            isMultiline={true}
          />

          <CustomTextInput
            label="Kategori"
            value={necessity}
            onChangeText={setNecessity}
            placeholderTextColor={COLORS.grey}
            isDropdown={true}
            dropdownOptions={[
              {label: 'Pilih Kategori', value: ''},
              {label: 'Pribadi', value: 'pribadi'},
              {label: 'Tugas', value: 'tugas'},
            ]}
          />
          <CustomTextInput
            label="Jam Keluar"
            value={outTime}
            onChangeText={setOutTime}
            placeholder="Pilih Jam Keluar"
            isTimePicker={true}
            placeholderTextColor={COLORS.grey}
          />
          <CustomTextInput
            label="Jam Kembali"
            value={intTime}
            onChangeText={setIntTime}
            placeholder="Pilih Jam Kembali"
            placeholderTextColor={COLORS.grey}
            isTimePicker={true}
          />
          <CustomTextInput
            label="Durasi Waktu"
            value={totalTime}
            placeholder="Durasi akan dihitung otomatis"
            editable={false}
            placeholderTextColor={COLORS.grey}
          />

          <Gap height={15} />
          <ButtonAction
            title={loading ? 'Loading...' : 'Kirim'}
            onPress={onSubmit}
            backgroundColor={COLORS.goldenOrange}
            color={COLORS.white}
            loading={loading}
          />
        </View>
      </ScrollView>

      {/* Modal untuk success */}
      <ModalCustom
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        iconModalName="check-circle-outline"
        title="Permintaan Berhasil"
        description="Permintaan perizinan Anda telah berhasil dikirim."
        buttonSubmit={() => {
          setShowSuccessModal(false);
          navigation.goBack();
        }}
        buttonTitle="Kembali"
      />

      {/* Modal untuk Token Expired */}
      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 15,
  },
  container: {
    padding: 15,
  },
});
