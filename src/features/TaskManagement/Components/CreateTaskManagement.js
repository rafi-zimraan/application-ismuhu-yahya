import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputTaskManagement, addTaskManagement} from '..';
import {
  AlertWarning,
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

export default function CreateTaskManagement({route}) {
  const navigation = useNavigation();
  const [activity, setActivity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [dueDate, setDueDate] = useState(today);
  const [category, setCategory] = useState(null);
  const [additionalPlan, setAdditionalPlan] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const validateSession = async () => {
    try {
      const response = await FecthMe();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
    } catch (error) {
      console.log('Gagal melakukan validasi sesi:', error);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const handleAddTask = async () => {
    if (!activity.trim()) {
      ToastAndroid.show(
        'Nama rencana harian tidak boleh kosong!',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (!dueDate.trim()) {
      ToastAndroid.show('Tenggat waktu harus diisi!', ToastAndroid.SHORT);
      return;
    }

    if (!category) {
      ToastAndroid.show('Kategori harus dipilih!', ToastAndroid.SHORT);
      return;
    }

    if ((startTime && !endTime) || (!startTime && endTime)) {
      setShowAlert(true);
      return;
    }
    const formattedCategory = category === 'Rencana' ? 'planned' : 'unplanned';
    let formattedActivity = activity;
    if (startTime && endTime) {
      formattedActivity = `(${startTime} - ${endTime}) ${activity}  `;
    }
    setloading(true);
    try {
      const response = await addTaskManagement(
        formattedActivity,
        dueDate,
        additionalPlan,
        formattedCategory,
      );
      if (response?.status) {
        setTaskData({
          activity: formattedActivity,
          date: dueDate,
          addition_task: additionalPlan,
          category: formattedCategory,
        });
        setModalVisible(true);
      } else {
        console.log('kesalahan menambah rencana harian');
      }
    } catch (error) {
      ToastAndroid.show(
        'Gagal menambahkan rencana harian!',
        ToastAndroid.SHORT,
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Background />
      <AlertWarning
        show={showAlert}
        message="Harap isi jam mulai dan jam selesai jika ingin menambahkan waktu!"
      />
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
          value={activity}
          onChangeText={setActivity}
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
        <View
          style={[
            styles.pickerContainer,
            category && {backgroundColor: COLORS.lightGrey},
          ]}>
          <Picker
            selectedValue={category}
            style={styles.dropDown}
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
            additionalPlan === 1 && styles.checkboxActive,
          ]}
          onPress={() => setAdditionalPlan(prev => (prev === 0 ? 1 : 0))}>
          <Icon
            name={
              additionalPlan === 1
                ? 'check-circle'
                : 'checkbox-blank-circle-outline'
            }
            size={20}
            color={COLORS.black}
          />
          <Gap width={5} />
          <Text style={styles.checkboxText}>Rencana Tambahan</Text>
        </TouchableOpacity>

        <Gap height={20} />
        <ButtonAction
          title="Simpan"
          onPress={handleAddTask}
          loading={loading}
          disabled={activity == '' || dueDate == '' || category == ''}
        />
      </View>

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-circle"
        title="Sukses membuat rencana harian"
        description="Data telah ditambahkan"
        buttonTitle="OK"
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    color: COLORS.black,
    fontSize: DIMENS.l,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  pickerContainer: {
    borderWidth: 0.4,
    borderColor: COLORS.black,
    borderRadius: 8,
    padding: 5,
    marginBottom: 15,
    backgroundColor: COLORS.white,
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
    fontSize: DIMENS.l,
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
    fontSize: DIMENS.l,
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
