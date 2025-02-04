import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputTaskManagement} from '..';
import {ButtonAction, Gap, HeaderTransparent} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CreateTaskManagement({route}) {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState(null);
  const [additionalPlan, setAdditionalPlan] = useState(false);

  const handleSaveTask = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Judul rencana tidak boleh kosong!');
      return;
    }

    const newTask = {
      title,
      startTime,
      endTime,
      dueDate,
      category,
      additionalPlan,
    };

    if (route.params?.addTask) {
      route.params.addTask(newTask);
    }

    ToastAndroid.show('Rencana berhasil ditambahkan!', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={'Tambah Rencana Harian'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInputTaskManagement
          label="Nama Rencana"
          placeholder="Tulis Rencana Anda"
          value={title}
          onChangeText={setTitle}
          iconName="widgets"
        />

        <Text style={styles.label}>Waktu Pengerjaan (Opsional)</Text>
        <View style={styles.timeContainer}>
          <TextInputTaskManagement
            isTimePicker
            placeholder="--:--"
            value={startTime}
            onChangeText={setStartTime}
          />
          <Text style={styles.sampaiText}> sampai </Text>
          <TextInputTaskManagement
            isTimePicker
            placeholder="--:--"
            value={endTime}
            onChangeText={setEndTime}
          />
        </View>

        <TextInputTaskManagement
          label="Tenggat Waktu"
          isDatePicker
          placeholder="Pilih Tanggal"
          value={dueDate}
          onChangeText={setDueDate}
          iconName="calendar-month"
        />

        <Text style={styles.label}>Kategori</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            dropdownIconColor={COLORS.black}
            onValueChange={itemValue => setCategory(itemValue)}>
            <Picker.Item label="Pilih Kategori" value={null} />
            <Picker.Item label="Rencana" value="Rencana" />
            <Picker.Item label="Tidak Rencana" value="Tidak Rencana" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[
            styles.checkboxContainer,
            additionalPlan && styles.checkboxActive,
          ]}
          onPress={() => setAdditionalPlan(!additionalPlan)}>
          <Icon
            name={
              additionalPlan ? 'check-circle' : 'checkbox-blank-circle-outline'
            }
            size={20}
            color={COLORS.black}
          />
          <Gap width={5} />
          <Text style={styles.checkboxText}>Rencana Tambahan</Text>
        </TouchableOpacity>

        <Gap height={20} />
        <ButtonAction title="Simpan" onPress={handleSaveTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    padding: 5,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    marginTop: 15,
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sampaiText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  checkboxActive: {
    backgroundColor: COLORS.greenLight,
  },
  checkboxText: {
    color: COLORS.black,
    fontSize: DIMENS.l,
    fontWeight: '500',
  },
});
