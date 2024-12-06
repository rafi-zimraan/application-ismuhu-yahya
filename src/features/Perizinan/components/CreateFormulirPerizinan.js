import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Background,
  ButtonAction,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {getAllDepartment} from '../../../Component/Departmant/departmantApiSlice';
import {getAllDivisions} from '../../../Component/Divisi/divisiApiSlice';
import {COLORS} from '../../../utils';
import {addPerizinan} from '../services/perizinanApiSlice';

export default function CreateFormulirPerizinan({navigation, route}) {
  const {division_id, department_id} = route.params;

  // State untuk Divisi dan Departemen
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);

  // State untuk formulir
  const [divisionId, setDivisionId] = useState(division_id || '');
  const [departmentId, setDepartmentId] = useState(department_id || '');
  const [regarding, setRegarding] = useState('');
  const [necessity, setNecessity] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [totDay, setTotDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchDivisionsAndDepartments = async () => {
      try {
        setLoadingDivision(true);
        const divisions = await getAllDivisions();
        setDivisionName(divisions.data[0].name);
        setDivisionId(divisions.data[0].id); // Menyimpan ID Divisi yang didapat ke state

        setLoadingDepartment(true);
        const departments = await getAllDepartment();
        setDepartmentName(departments.data[0].name);
        setDepartmentId(departments.data[0].id); // Menyimpan ID Departemen yang didapat ke state
      } catch (error) {
        console.error('Error fetching divisions or departments:', error);
      } finally {
        setLoadingDivision(false);
        setLoadingDepartment(false);
      }
    };

    fetchDivisionsAndDepartments();
  }, []);

  // Fungsi untuk mengirim data ke API
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        start_date: startDate,
        end_date: endDate,
        tot_day: totDay,
      };

      const response = await addPerizinan(data);
      if (response?.status === true) {
        setShowSuccessModal(true); // Tampilkan modal sukses
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Terjadi kesalahan saat menambahkan data',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Membuat formulir perizinan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Input Divisi */}
          <Text style={styles.label}>Division</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={styles.input}
              value={divisionName}
              editable={false} // Non-editable
              placeholder="Masukkan ID Divisi"
              placeholderTextColor={COLORS.black}
            />
            {loadingDivision && (
              <ActivityIndicator
                size="small"
                color={COLORS.black}
                style={styles.activityIndicator}
              />
            )}
          </View>

          {/* Input Departemen */}
          <Text style={styles.label}>Department</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={styles.input}
              value={departmentName}
              editable={false} // Non-editable
              placeholder="Masukkan ID Departemen"
              placeholderTextColor={COLORS.black}
            />
            {loadingDepartment && (
              <ActivityIndicator
                size="small"
                color={COLORS.black}
                style={styles.activityIndicator}
              />
            )}
          </View>

          {/* Formulir lainnya */}
          <Text style={styles.label}>Perihal</Text>
          <TextInput
            style={styles.input}
            value={regarding}
            onChangeText={setRegarding}
            placeholder="Perihal (cuti, dinas, lainnya)"
            placeholderTextColor={COLORS.black}
          />

          <Text style={styles.label}>Keperluan</Text>
          <TextInput
            style={styles.input}
            value={necessity}
            onChangeText={setNecessity}
            placeholder="Masukkan keperluan"
            placeholderTextColor={COLORS.black}
          />

          <Text style={styles.label}>Kategori</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Kategori (cuti, dinas, keluar, dll)"
            placeholderTextColor={COLORS.black}
          />

          {/* Tanggal Mulai */}
          <Text style={styles.label}>Tanggal Mulai</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.input}
            onPress={() => setShowStartDatePicker(true)}>
            <Text style={{color: startDate ? COLORS.black : COLORS.grey}}>
              {startDate || 'Pilih Tanggal Mulai'}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate ? new Date(startDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          {/* Tanggal Berakhir */}
          <Text style={styles.label}>Tanggal Berakhir</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.input}
            onPress={() => setShowEndDatePicker(true)}>
            <Text style={{color: endDate ? COLORS.black : COLORS.grey}}>
              {endDate || 'Pilih Tanggal Berakhir'}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate ? new Date(endDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}

          <Text style={styles.label}>Jumlah Hari</Text>
          <TextInput
            style={styles.input}
            value={totDay}
            onChangeText={setTotDay}
            placeholder="Jumlah hari untuk izin"
            keyboardType="numeric"
            placeholderTextColor={COLORS.black}
          />

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <ButtonAction
              title={loading ? 'Loading...' : 'Kirim'}
              onPress={handleSubmit}
              backgroundColor={COLORS.primary}
              color={COLORS.white}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal untuk Sukses */}
      <ModalCustom
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        iconModalName="check-circle-outline"
        title="Permintaan Berhasil"
        description="Permintaan perizinan Anda telah berhasil dikirim. Selamat melanjutkan aktivitas dan semoga semua berjalan lancar. 😊"
        buttonSubmit={() => {
          setShowSuccessModal(false);
          navigation.goBack();
        }}
        buttonTitle="Kembali"
        buttonDisable={false}
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: COLORS.grey,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.champagne,
    color: COLORS.black,
  },
  activityIndicator: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
