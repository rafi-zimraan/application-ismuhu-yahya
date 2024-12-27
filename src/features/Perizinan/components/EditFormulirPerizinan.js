import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {
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
import {patchPerizinan} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {getDepartmentDetail} from '../../Departmant';
import {getDivisionDetail} from '../../Divisi';

export default function EditFormulirPerizinan({navigation, route}) {
  const {id_lisences, initialData} = route.params;
  const isExitPermit = initialData.is_exit_permit === '1';
  const [divisionId, setDivisionId] = useState(initialData.division_id || '');
  const [departmentId, setDepartmentId] = useState(
    initialData.department_id || '',
  );
  const [regarding, setRegarding] = useState(initialData.regarding || '');
  const [necessity, setNecessity] = useState(initialData.necessity || '');
  const [showOutPicker, setShowOutPicker] = useState(false);
  const [showIntPicker, setShowIntPicker] = useState(false);
  const [category, setCategory] = useState(initialData.category || '');
  const [outTime, setOutTime] = useState(initialData.out || '');
  const [intTime, setIntTime] = useState(initialData.in || '');
  const [startDate, setStartDate] = useState(
    new Date(initialData.start_date) || new Date(),
  );
  const [endDate, setEndDate] = useState(
    new Date(initialData.end_date) || new Date(),
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [totalTime, setTotalTime] = useState('');
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchDivisionAndDepartment = async () => {
      try {
        setLoading(true);
        if (divisionId) {
          const division = await getDivisionDetail(divisionId);
          if (division?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
            return;
          }
          setDivisionName(division.data?.name);
          console.log('divisi', division.data?.name);
        }

        if (departmentId) {
          const department = await getDepartmentDetail(departmentId);
          if (department?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
            return;
          }
          setDepartmentName(department.data?.name);
          console.log('department', department.data?.name);
        }
      } catch (error) {
        console.error('Error fetching division or department:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDivisionAndDepartment();
  }, [divisionId, departmentId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        ...(isExitPermit
          ? {out: outTime, in: intTime, tot_day: totalTime}
          : {start_date: startDate, end_date: endDate, tot_day: totalDays}),
      };

      const response = await patchPerizinan(id_lisences, payload);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }

      if (response && response.status === true) {
        console.log('Update berhasil:', response.message);
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);

        const {onSave} = route.params || {};

        if (onSave) {
          onSave({...initialData, ...payload});
        }

        setModalVisible(true);
      } else {
        alert('Gagal merubah data: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating perizinan:', error);
      alert('Terjadi kesalahan saat mengubah data');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);
  }, [startDate, endDate]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Edit Formulir"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Division</Text>
        <TextInput
          style={styles.input}
          value={divisionName}
          onChangeText={text => {
            setDivisionId('');
            setDivisionName(text);
          }}
          placeholderTextColor={COLORS.black}
        />

        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          value={departmentName}
          onChangeText={text => {
            setDepartmentId('');
            setDepartmentName(text);
          }}
          placeholderTextColor={COLORS.black}
        />

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

        {isExitPermit ? (
          <>
            <Text style={styles.label}>Jam Keluar</Text>
            <TouchableOpacity
              onPress={() => setShowOutPicker(true)}
              style={styles.input}>
              <Text style={styles.clockText}>
                {outTime || 'Pilih Jam keluar'}
              </Text>
            </TouchableOpacity>
            {showOutPicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedClock) => {
                  setShowOutPicker(false);
                  if (selectedClock) {
                    const hours = selectedClock
                      .getHours()
                      .toString()
                      .padStart(2, '0');
                    const minutes = selectedClock
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
                {intTime || 'Pilih Jam kembali'}
              </Text>
            </TouchableOpacity>
            {showIntPicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedClock) => {
                  setShowIntPicker(false);
                  if (selectedClock) {
                    const hours = selectedClock
                      .getHours()
                      .toString()
                      .padStart(2, '0');
                    const minutes = selectedClock
                      .getMinutes()
                      .toString()
                      .padStart(2, '0');
                    setIntTime(`${hours}:${minutes}`);
                  }
                }}
              />
            )}

            <Text style={styles.label}>Durasi</Text>
            <Text style={styles.input}>
              {totalTime || 'Durasi belum dihitung'}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Tanggal Mulai</Text>
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

            <Text style={styles.label}>Tanggal Berakhir</Text>
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
          </>
        )}

        <Gap height={20} />
        <View style={{alignItems: 'center'}}>
          <ButtonAction
            title="Perbarui Data"
            onPress={handleUpdate}
            backgroundColor={COLORS.primary}
            color={'white'}
          />
        </View>
      </ScrollView>

      <ModalLoading visible={loading} />
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title="Data Diperbarui"
        description="Data berhasil diperbarui."
        iconModalName="check-circle"
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        buttonTitle="OK"
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
  textDate: {
    color: COLORS.black,
    fontSize: DIMENS.l,
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
});
