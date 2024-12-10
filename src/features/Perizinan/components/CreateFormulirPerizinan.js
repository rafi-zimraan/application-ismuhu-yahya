import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {addPerizinan} from '..';
import {
  Background,
  ButtonAction,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';
import {getAllDepartment} from '../../Departmant';
import {getAllDivisions} from '../../Divisi';

export default function CreateFormulirPerizinan({navigation, route}) {
  const {division_id, department_id} = route.params;

  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);

  const [divisionId, setDivisionId] = useState(division_id || '');
  const [departmentId, setDepartmentId] = useState(department_id || '');
  const [regarding, setRegarding] = useState('');
  const [necessity, setNecessity] = useState('');
  const [category, setCategory] = useState('');
  const [outTime, setOutTime] = useState('');
  const [intTime, setIntTime] = useState('');
  const [totDay, setTotDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchDivisionsAndDepartments = async () => {
      try {
        setLoadingDivision(true);
        const divisions = await getAllDivisions();
        setDivisionName(divisions.data[0].name);
        setDivisionId(divisions.data[0].id);

        setLoadingDepartment(true);
        const departments = await getAllDepartment();
        setDepartmentName(departments.data[0].name);
        setDepartmentId(departments.data[0].id);
      } catch (error) {
        console.error('Error fetching divisions or departments:', error);
      } finally {
        setLoadingDivision(false);
        setLoadingDepartment(false);
      }
    };

    fetchDivisionsAndDepartments();
  }, []);

  const validateTimeFormat = time => {
    const timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeFormat.test(time);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!validateTimeFormat(outTime) || !validateTimeFormat(intTime)) {
      Alert.alert(
        'Format waktu tidak valid',
        'Pastikan format waktu HH:mm:ss, contoh 12:00:00.',
      );
      setLoading(false);
      return;
    }

    try {
      const data = {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        out: outTime,
        in: intTime,
        tot_day: totDay,
      };

      const response = await addPerizinan(data);
      if (response?.status === true) {
        setShowSuccessModal(true);
      } else {
        Alert.alert('Gagal', response?.message || 'Gagal menambahkan data.');
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
          <Text style={styles.label}>Division</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={styles.input}
              value={divisionName}
              editable={false}
              placeholder="Masukkan ID Divisi"
              placeholderTextColor={COLORS.grey}
            />
            {loadingDivision && (
              <ActivityIndicator
                size="small"
                color={COLORS.black}
                style={styles.activityIndicator}
              />
            )}
          </View>

          <Text style={styles.label}>Department</Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={styles.input}
              value={departmentName}
              editable={false}
              placeholder="Masukkan ID Departemen"
              placeholderTextColor={COLORS.grey}
            />
            {loadingDepartment && (
              <ActivityIndicator
                size="small"
                color={COLORS.black}
                style={styles.activityIndicator}
              />
            )}
          </View>

          <Text style={styles.label}>Perihal</Text>
          <TextInput
            style={styles.input}
            value={regarding}
            onChangeText={setRegarding}
            placeholder="Perihal (cuti, dinas, lainnya)"
            placeholderTextColor={COLORS.grey}
          />

          <Text style={styles.label}>Keperluan</Text>
          <TextInput
            style={styles.input}
            value={necessity}
            onChangeText={setNecessity}
            placeholder="Masukkan keperluan"
            placeholderTextColor={COLORS.grey}
          />

          <Text style={styles.label}>Kategori</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Kategori (cuti, dinas, keluar, dll)"
            placeholderTextColor={COLORS.grey}
          />

          <Text style={styles.label}>Jam Keluar</Text>
          <TextInput
            style={styles.input}
            value={outTime}
            onChangeText={setOutTime}
            placeholder="Jam keluar (HH:mm:ss)"
            placeholderTextColor={COLORS.grey}
            keyboardType="default"
            maxLength={8}
          />

          <Text style={styles.label}>Jam Kembali</Text>
          <TextInput
            style={styles.input}
            value={intTime}
            onChangeText={setIntTime}
            placeholder="Jam kembali (HH:mm:ss)"
            placeholderTextColor={COLORS.grey}
            keyboardType="default"
            maxLength={8}
          />

          <Text style={styles.label}>Durasi Jam</Text>
          <TextInput
            style={styles.input}
            value={totDay}
            onChangeText={setTotDay}
            placeholder="Durasi izin (jam:menit:detik)"
            keyboardType="default"
            placeholderTextColor={COLORS.grey}
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
});
