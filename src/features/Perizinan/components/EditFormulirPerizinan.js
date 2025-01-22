import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {CustomTextInput, patchCuti, patchPerizinanKeluar} from '..';
import {
  Background,
  ButtonAction,
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
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [desc, setDesc] = useState(initialData.desc || '');
  const [necessity, setNecessity] = useState(initialData.necessity || '');
  const [outTime, setOutTime] = useState(initialData.out || '');
  const [intTime, setIntTime] = useState(initialData.in || '');
  const [startDate, setStartDate] = useState(
    new Date(initialData.start_date) || new Date(),
  );
  const [endDate, setEndDate] = useState(
    new Date(initialData.end_date) || new Date(),
  );
  const [totalTime, setTotalTime] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

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
        }

        if (departmentId) {
          const department = await getDepartmentDetail(departmentId);
          if (department?.message === 'Silahkan login terlebih dahulu') {
            setTokenExpired(true);
            return;
          }
          setDepartmentName(department.data?.name);
        }
      } catch (error) {
        console.log('Error fetching division or department:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDivisionAndDepartment();
  }, [divisionId, departmentId]);

  useEffect(() => {
    if (outTime && intTime) {
      const [outHours, outMinutes] = outTime.split(':').map(Number);
      const [inHours, inMinutes] = intTime.split(':').map(Number);
      const outDate = new Date(0, 0, 0, outHours, outMinutes);
      const inDate = new Date(0, 0, 0, inHours, inMinutes);

      let diff = (inDate - outDate) / 1000;
      if (diff < 0) diff += 24 * 60 * 60;

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

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        division_id: divisionId,
        department_id: departmentId,
        desc: desc,
        ...(isExitPermit
          ? {necessity, out: outTime, in: intTime, duration: totalTime}
          : {start_date: startDate, end_date: endDate, duration: totalDays}),
      };

      const response = isExitPermit
        ? await patchPerizinanKeluar(id_lisences, payload)
        : await patchCuti(id_lisences, payload);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }

      if (response?.status === true) {
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        const {onSave} = route.params || {};
        if (onSave) {
          onSave({...initialData, ...payload});
        }
        setModalVisible(true);
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error updating perizinan:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <CustomTextInput
          label="Division"
          value={divisionName}
          onChangeText={text => {
            setDivisionId('');
            setDivisionName(text);
          }}
          placeholder="Masukkan Division"
          editable={false}
        />
        <CustomTextInput
          label="Department"
          value={departmentName}
          onChangeText={text => {
            setDepartmentId('');
            setDepartmentName(text);
          }}
          placeholder="Masukkan Department"
          editable={false}
        />
        <CustomTextInput
          label="Deskripsi"
          value={desc}
          onChangeText={setDesc}
          placeholder="Berikan keterangan"
          isMultiline
        />
        {isExitPermit ? (
          <>
            <CustomTextInput
              label="Kategori"
              value={necessity}
              onChangeText={setNecessity}
              placeholder="Pilih kategori"
              isDropdown
              dropdownOptions={[
                {label: 'Pribadi', value: 'pribadi'},
                {label: 'Tugas', value: 'tugas'},
              ]}
            />
            <CustomTextInput
              label="Jam Keluar"
              value={outTime}
              onChangeText={setOutTime}
              placeholder="Pilih Jam Keluar"
              isTimePicker
            />
            <CustomTextInput
              label="Jam Kembali"
              value={intTime}
              onChangeText={setIntTime}
              placeholder="Pilih Jam Kembali"
              isTimePicker
            />
            <CustomTextInput
              label="Durasi Waktu"
              value={totalTime}
              placeholder="Durasi dihitung otomatis"
              editable={false}
            />
          </>
        ) : (
          <>
            <CustomTextInput
              label="Tanggal Mulai"
              value={startDate.toISOString().split('T')[0]}
              onChangeText={date => setStartDate(new Date(date))}
              placeholder="Pilih Tanggal Mulai"
              isDatePicker
            />
            <CustomTextInput
              label="Tanggal Akhir"
              value={endDate.toISOString().split('T')[0]}
              onChangeText={date => setEndDate(new Date(date))}
              placeholder="Pilih Tanggal Akhir"
              isDatePicker
            />
            <CustomTextInput
              label="Jumlah Hari"
              value={`${totalDays} hari`}
              placeholder="Jumlah hari dihitung otomatis"
              editable={false}
            />
          </>
        )}
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
  inputDesc: {
    minHeight: 90,
    paddingHorizontal: 10,
    backgroundColor: COLORS.champagne,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 13,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
});
