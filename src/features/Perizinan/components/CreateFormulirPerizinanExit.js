import DateTimePicker from '@react-native-community/datetimepicker';
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
  TouchableOpacity,
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
  const [showOutPicker, setShowOutPicker] = useState(false);
  const [showIntPicker, setShowIntPicker] = useState(false);
  const [regarding, setRegarding] = useState('');
  const [necessity, setNecessity] = useState('');
  const [category, setCategory] = useState('');
  const [outTime, setOutTime] = useState('');
  const [intTime, setIntTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

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

      if (response?.status === true) {
        setShowSuccessModal(true);
      } else if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
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
        title="Perizinan Keluar"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Division</Text>
          <View style={{position: 'relative'}}>
            <Text style={styles.input}>{divisionName || 'Memuat...'}</Text>
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
            <Text style={styles.input}>{departmentName || 'Memuat...'}</Text>
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
            placeholder="Kategori (cuti, dinas, lainnya)"
            placeholderTextColor={COLORS.black}
          />

          <Text style={styles.label}>Jam Keluar</Text>
          <TouchableOpacity
            onPress={() => setShowOutPicker(true)}
            style={styles.input}>
            <Text style={styles.clockText}>
              {outTime || 'Pilih Jam Keluar'}
            </Text>
          </TouchableOpacity>
          {showOutPicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowOutPicker(false);
                if (selectedDate) {
                  const hours = selectedDate
                    .getHours()
                    .toString()
                    .padStart(2, '0');
                  const minutes = selectedDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0');
                  setOutTime(`${hours}:${minutes}`);
                }
              }}
            />
          )}

          <Text style={styles.label}>Jam Kembali</Text>
          <TouchableOpacity
            onPress={() => setShowIntPicker(true)}
            style={styles.input}>
            <Text style={styles.clockText}>
              {intTime || 'Pilih Jam Kembali'}
            </Text>
          </TouchableOpacity>
          {showIntPicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowIntPicker(false);
                if (selectedDate) {
                  const hours = selectedDate
                    .getHours()
                    .toString()
                    .padStart(2, '0');
                  const minutes = selectedDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0');
                  setIntTime(`${hours}:${minutes}`);
                }
              }}
            />
          )}

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
        buttonTitle="Kembali"
        buttonDisable={false}
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
  clockText: {
    color: COLORS.black,
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
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
    color: COLORS.black,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.champagne,
    justifyContent: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
});
