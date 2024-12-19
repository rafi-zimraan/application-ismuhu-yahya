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
import {DIMENS} from '../../../utils/dimens';
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
  const [regarding, setRegarding] = useState('');
  const [necessity, setNecessity] = useState('');
  const [category, setCategory] = useState('');
  const [outTime, setOutTime] = useState('');
  const [intTime, setIntTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      const [outHours, outMinutes, outSeconds] = outTime.split(':').map(Number);
      const [inHours, inMinutes, inSeconds] = intTime.split(':').map(Number);

      const outDate = new Date(0, 0, 0, outHours, outMinutes, outSeconds);
      const inDate = new Date(0, 0, 0, inHours, inMinutes, inSeconds);

      let diff = (inDate - outDate) / 1000; // Difference in seconds

      if (diff < 0) {
        diff += 24 * 60 * 60; // Handle case where inTime is past midnight
      }

      const hours = Math.floor(diff / 3600);
      diff %= 3600;
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;

      setTotalTime(`${hours} jam ${minutes} menit ${seconds} detik`);
    } else {
      setTotalTime('');
    }
  }, [outTime, intTime]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        out: outTime,
        in: intTime,
        tot_day: totalTime,
      };

      const response = await addPerizinan(data);
      console.log('response', response);
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
        title="Perizinan keluar"
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
            placeholder="Jam keluar (12:00:00)"
            placeholderTextColor={COLORS.grey}
            keyboardType="default"
            maxLength={8}
          />

          <Text style={styles.label}>Jam Kembali</Text>
          <TextInput
            style={styles.input}
            value={intTime}
            onChangeText={setIntTime}
            placeholder="Jam kembali (13:00:00)"
            placeholderTextColor={COLORS.grey}
            keyboardType="default"
            maxLength={8}
          />

          <Text style={styles.label}>Durasi Waktu</Text>
          <Text style={styles.input}>
            {totalTime || 'Durasi belum dihitung'}
          </Text>

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <ButtonAction
              title={loading ? 'Loading...' : 'Kirim'}
              onPress={handleSubmit}
              backgroundColor={COLORS.goldenOrange}
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
        TextColorButton="white"
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
    fontSize: DIMENS.l,
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
