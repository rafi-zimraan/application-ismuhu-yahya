import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {patchPerizinan} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS} from '../../../utils';
import {DIMENS} from '../../../utils/dimens';
import {getDepartmentDetail} from '../../Departmant';
import {getDivisionDetail} from '../../History/Divisi';

export default function EditFormulirPerizinan({navigation, route}) {
  const {id_lisences, initialData} = route.params;
  console.log('data edit', initialData);

  const [divisionId, setDivisionId] = useState(initialData.division_id || '');
  const [departmentId, setDepartmentId] = useState(
    initialData.department_id || '',
  );
  const [regarding, setRegarding] = useState(initialData.regarding || '');
  const [necessity, setNecessity] = useState(initialData.necessity || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [outTime, setOutTime] = useState(initialData.out || '');
  const [intTime, setIntTime] = useState(initialData.in || '');
  const [totDay, setTotDay] = useState(initialData.tot_day || '');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const fetchDivisionAndDepartment = async () => {
      try {
        if (divisionId) {
          setLoadingDivision(true);
          const division = await getDivisionDetail(divisionId);
          setDivisionName(division.data?.name);
        }

        if (departmentId) {
          setLoadingDepartment(true);
          const department = await getDepartmentDetail(departmentId);
          setDepartmentName(department.data?.name);
        }
      } catch (error) {
        console.error('Error fetching division or department:', error);
      } finally {
        setLoadingDivision(false);
        setLoadingDepartment(false);
      }
    };

    fetchDivisionAndDepartment();
  }, [divisionId, departmentId]);

  const validateTimeFormat = time => {
    const timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeFormat.test(time);
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (!validateTimeFormat(outTime) || !validateTimeFormat(intTime)) {
      alert(
        'Format waktu tidak valid. Harap gunakan format HH:mm:ss, Contoh (12:00:00).',
      );
      setLoading(false);
      return;
    }

    try {
      const response = await patchPerizinan(id_lisences, {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        out: outTime,
        in: intTime,
        tot_day: totDay,
      });
      console.log('Response server:', response.data);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
        return;
      }

      if (response && response.status === true) {
        console.log('Update berhasil:', response.message);
        setModalVisible(true);
      } else {
        console.log('Gagal merubah data:', response.message);
        alert('Gagal merubah data: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating perizinan:', error);
      alert('Terjadi kesalahan saat mengubah data');
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
        <Text style={styles.label}>Division</Text>
        <View style={{position: 'relative'}}>
          <TextInput
            style={styles.input}
            value={divisionName}
            onChangeText={text => {
              setDivisionId('');
              setDivisionName(text);
            }}
            placeholderTextColor={COLORS.grey}
          />
          {loadingDivision && (
            <ActivityIndicator
              size="small"
              color={COLORS.black}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{translateY: -10}],
              }}
            />
          )}
        </View>

        <Text style={styles.label}>Department</Text>
        <View style={{position: 'relative'}}>
          <TextInput
            style={styles.input}
            value={departmentName}
            onChangeText={text => {
              setDepartmentId('');
              setDepartmentName(text);
            }}
            placeholderTextColor={COLORS.grey}
          />
          {loadingDepartment && (
            <ActivityIndicator
              size="small"
              color={COLORS.black}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{translateY: -10}],
              }}
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
          placeholder="Jam keluar Contoh(12:00:00)"
          placeholderTextColor={COLORS.grey}
          keyboardType="default"
          maxLength={8}
        />

        <Text style={styles.label}>Jam Kembali</Text>
        <TextInput
          style={styles.input}
          value={intTime}
          onChangeText={setIntTime}
          placeholder="Jam kembali Contoh(12:00:00)"
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
          placeholderTextColor={COLORS.grey}
          maxLength={8}
          keyboardType="default"
        />

        <Gap height={20} />
        <View style={{alignItems: 'center'}}>
          <ButtonAction
            title="Perbarui Data"
            onPress={handleUpdate}
            backgroundColor={COLORS.primary}
            color={'white'}
            loading={loading}
          />
        </View>
      </ScrollView>

      {/* Modal untuk notifikasi berhasil update */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-circle-outline"
        title="Data Diperbarui"
        description="Data Anda telah berhasil diperbarui."
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        buttonTitle="OK"
        ColorIcon={COLORS.primary}
        BackgroundButtonAction={COLORS.primary}
        TextColorButton={COLORS.white}
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
  title: {
    fontSize: DIMENS.l,
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 10,
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
    paddingRight: 35, // Tambahkan padding kanan untuk ruang ActivityIndicator
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.champagne,
    color: COLORS.black,
  },
});
