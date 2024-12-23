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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Background,
  ButtonAction,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {getAllDepartment} from '../../Departmant';
import {getAllDivisions} from '../../Divisi';
import {addCutiPerizinan} from '../services/perizinanApiSlice';

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
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
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);
  }, [startDate, endDate]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        tot_day: totalDays,
      };

      const response = await addCutiPerizinan(data);

      if (response?.status === true) {
        setShowSuccessModal(true);
      } else if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        if (
          response?.message?.includes('Request failed with status code 500')
        ) {
          ToastAndroid.show(
            'Terdapat kesalahan pada server',
            ToastAndroid.SHORT,
          );
        } else {
          ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      if (error.message?.includes('Request failed with status code 500')) {
        ToastAndroid.show('Terdapat kesalahan pada server', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Perizinan Cuti"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Division</Text>
          <View style={{position: 'relative'}}>
            <Text style={styles.input}>
              {loadingDivision ? 'Memuat...' : divisionName}
            </Text>
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
            <Text style={styles.input}>
              {loadingDepartment ? 'Memuat...' : departmentName}
            </Text>
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
            placeholder="Perihal (cuti, lainnya)"
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
            placeholder="Kategori (cuti, lainnya)"
            placeholderTextColor={COLORS.grey}
          />

          <Text style={styles.label}>Tanggal Awal Cuti</Text>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.dateInput}>
            <Text style={styles.textDate}>
              {startDate.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) {
                  setStartDate(selectedDate);
                }
              }}
            />
          )}

          <Text style={styles.label}>Tanggal Kembali Cuti</Text>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.dateInput}>
            <Text style={styles.textDate}>
              {endDate.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}

          <Text style={styles.label}>Jumlah Hari</Text>
          <Text style={styles.input}>{totalDays} hari</Text>

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
  textDate: {
    color: COLORS.black,
    fontSize: DIMENS.l,
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
    borderColor: COLORS.grey,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.champagne,
    color: COLORS.black,
  },
  dateInput: {
    borderWidth: 0.5,
    borderColor: COLORS.grey,
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
