import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {patchPerizinan} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
} from '../../../Component';
import {getDepartmentDetail} from '../../../Component/Departmant/departmantApiSlice';
import {getDivisionDetail} from '../../../Component/Divisi/divisiApiSlice';
import {COLORS} from '../../../utils';

export default function EditFormulirPerizinan({navigation, route}) {
  const {id_lisences, initialData} = route.params;
  const [divisionId, setDivisionId] = useState(initialData.division_id || '');
  const [departmentId, setDepartmentId] = useState(
    initialData.department_id || '',
  );
  const [regarding, setRegarding] = useState(initialData.regarding || '');
  const [necessity, setNecessity] = useState(initialData.necessity || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [startDate, setStartDate] = useState(initialData.start_date || '');
  const [endDate, setEndDate] = useState(initialData.end_date || '');
  const [totDay, setTotDay] = useState(initialData.tot_day || '');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDivision, setLoadingDivision] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);

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

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await patchPerizinan(id_lisences, {
        division_id: divisionId,
        department_id: departmentId,
        regarding,
        necessity,
        category,
        start_date: startDate,
        end_date: endDate,
        tot_day: totDay,
      });
      console.log('data update formulir', response);

      if (response && response.status === true) {
        setModalVisible(true);
      } else {
        console.log('Gagal merubah data:', response);
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
            placeholderTextColor={COLORS.black}
          />
          {loadingDivision && (
            <ActivityIndicator
              size="small"
              color={COLORS.black}
              style={{
                position: 'absolute',
                right: 10, // Posisi di sebelah kanan dalam TextInput
                top: '50%', // Vertikal di tengah
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
            placeholderTextColor={COLORS.black}
          />
          {loadingDepartment && (
            <ActivityIndicator
              size="small"
              color={COLORS.black}
              style={{
                position: 'absolute',
                right: 10, // Posisi di sebelah kanan dalam TextInput
                top: '50%', // Vertikal di tengah
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

        <Text style={styles.label}>Tanggal Mulai</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={setStartDate}
          placeholder="Tanggal mulai izin (YYYY-MM-DD)"
          placeholderTextColor={COLORS.black}
        />

        <Text style={styles.label}>Tanggal Berakhir</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={setEndDate}
          placeholder="Tanggal batas terakhir izin (YYYY-MM-DD)"
          placeholderTextColor={COLORS.black}
        />

        <Text style={styles.label}>Jumlah Hari</Text>
        <TextInput
          style={styles.input}
          value={totDay}
          onChangeText={setTotDay}
          placeholder="Jumlah hari untuk izin"
          keyboardType="numeric"
          placeholderTextColor={COLORS.black}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon
              name="emoticon-happy-outline"
              size={60}
              color={COLORS.primary}
            />
            <Text style={styles.title}>Data berhasil diperbarui!</Text>
            <ButtonAction
              title="OK"
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 10,
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
    paddingRight: 35, // Tambahkan padding kanan untuk ruang ActivityIndicator
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.champagne,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
