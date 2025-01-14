import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {CustomTextInput, addCuti} from '..';
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
import {FecthMe} from '../../authentication';

export default function CreateFormulirPerizinan({navigation, route}) {
  const {division_id, department_id} = route.params;
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [divisionId, setDivisionId] = useState(division_id || '');
  const [departmentId, setDepartmentId] = useState(department_id || '');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

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
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);
  }, [startDate, endDate]);

  const handleSubmit = async () => {
    setShowWarning(false);

    if (!desc) {
      setWarningMessage('Harap lengkapi deskripsi sebelum mengirim.');
      setShowWarning(true);
      return;
    }

    if (!startDate || !endDate) {
      setWarningMessage('Harap pilih tanggal awal dan akhir cuti.');
      setShowWarning(true);
      return;
    }
    setLoading(true);
    try {
      const data = {
        division_id: divisionId,
        department_id: departmentId,
        desc: desc,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        duration: totalDays,
      };

      const response = await addCuti(data);

      if (response?.status === true) {
        setShowSuccessModal(true);
      } else if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        ToastAndroid.show(
          response?.message || 'Gagal mengirim data',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show('Terjadi kesalahan', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await FecthMe();
        if (response.message === 'Silahkan login terlebih dahulu') {
          setTokenExpired(true);
        }
      } catch (e) {
        console.log('error checking session', e);
        setTokenExpired(false);
      }
    };

    fetchUserSession();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <HeaderTransparent
        title="Perizinan Cuti"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <AlertWarning show={showWarning} message={warningMessage} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <CustomTextInput
            label="Division"
            value={divisionName}
            placeholder="Memuat..."
            isLoading={loadingDivision}
            placeholderTextColor={COLORS.grey}
          />
          <CustomTextInput
            label="Department"
            value={departmentName}
            placeholder="Memuat..."
            isLoading={loadingDepartment}
            placeholderTextColor={COLORS.grey}
          />
          <CustomTextInput
            label="Deskripsi"
            value={desc}
            onChangeText={setDesc}
            placeholder="Masukkan deskripsi"
            placeholderTextColor={COLORS.grey}
            isMultiline={true}
          />
          <CustomTextInput
            label="Tanggal Awal Cuti"
            value={startDate.toISOString().split('T')[0]}
            onChangeText={date => setStartDate(new Date(date))}
            placeholder="Pilih tanggal"
            isDatePicker={true}
          />
          <CustomTextInput
            label="Tanggal Akhir Cuti"
            value={endDate.toISOString().split('T')[0]}
            onChangeText={date => setEndDate(new Date(date))}
            placeholder="Pilih tanggal"
            isDatePicker={true}
          />
          <CustomTextInput
            label="Jumlah Hari"
            value={
              totalDays ? `${totalDays} hari` : 'Jumlah hari belum tersedia'
            }
            editable={false}
            placeholderTextColor={COLORS.grey}
          />
          <Gap height={20} />
          <ButtonAction
            title={loading ? 'Loading...' : 'Kirim'}
            onPress={handleSubmit}
            backgroundColor={COLORS.goldenOrange}
            color={COLORS.white}
            loading={loading}
          />
        </View>
      </ScrollView>

      <ModalCustom
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        iconModalName="check-circle-outline"
        title="Berhasil"
        description="Perizinan berhasil dikirim"
        buttonSubmit={() => {
          setShowSuccessModal(false);
          navigation.goBack();
        }}
        buttonTitle="Kembali"
      />

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
    paddingBottom: 20,
  },
  container: {
    padding: 20,
  },
});
