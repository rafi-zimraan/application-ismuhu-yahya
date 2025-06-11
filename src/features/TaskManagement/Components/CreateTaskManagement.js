import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {TextInputTaskManagement, addTaskManagement} from '..';
import {
  AlertWarning,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';
import Toast from 'react-native-toast-message';

export default function CreateTaskManagement({route}) {
  const {colors, mode} = useSelector(state => state.theme);
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

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

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
      showToast('Nama rencana harian tidak boleh kosong!');
      return;
    }

    if (!dueDate.trim()) {
      showToast('Tenggat waktu harus diisi!');
      return;
    }

    if (!category) {
      showToast('Kategori harus dipilih!');
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
      showToast('Gagal menambahkan rencana harian!');
    } finally {
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AlertWarning
        show={showAlert}
        message="Harap isi jam mulai dan jam selesai jika ingin menambahkan waktu!"
      />
      <HeaderTransparent
        title={'Tambah Rencana Harian'}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.formContainer} showImageBackground={true}>
        <ScrollView contentContainerStyle={{padding: 15}}>
          <Text style={styles.label}>Nama Rencana</Text>
          <TextInputTaskManagement
            placeholder="Tulis Rencana Anda"
            value={activity}
            onChangeText={setActivity}
            iconName="widgets"
            backgroundColorTextInput={colors[mode].textInput}
          />

          <Text style={styles.label}>Waktu Pengerjaan (Opsional)</Text>
          <View style={styles.timeContainer} useBackgroundTransparent={true}>
            <TextInputTaskManagement
              isTimePicker
              placeholder="--:--"
              value={startTime}
              onChangeText={setStartTime}
              backgroundColorTextInput={colors[mode].textInput}
            />
            <Text style={styles.sampaiText}> sampai </Text>
            <TextInputTaskManagement
              isTimePicker
              placeholder="--:--"
              value={endTime}
              onChangeText={setEndTime}
              backgroundColorTextInput={colors[mode].textInput}
            />
          </View>

          <Text style={styles.label}>Tenggat Waktu</Text>
          <TextInputTaskManagement
            isDatePicker
            placeholder="Pilih Tanggal"
            value={dueDate}
            onChangeText={setDueDate}
            iconName="calendar-month"
            backgroundColorTextInput={colors[mode].textInput}
          />

          <Text style={styles.label}>Kategori</Text>
          <View
            style={[
              styles.pickerContainer,
              {backgroundColor: colors[mode].textInput},
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
              ,
              {backgroundColor: colors[mode].textInput},
            ]}
            onPress={() => setAdditionalPlan(prev => (prev === 0 ? 1 : 0))}>
            <Icon
              name={
                additionalPlan === 1
                  ? 'check-circle'
                  : 'checkbox-blank-circle-outline'
              }
              size={20}
              color={additionalPlan === 1 ? COLORS.Orange : COLORS.black}
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
        </ScrollView>
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
  pickerContainer: {
    borderWidth: 0.4,
    borderColor: COLORS.black,
    borderRadius: 8,
    padding: 5,
    marginBottom: 15,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sampaiText: {
    marginHorizontal: 10,
    fontSize: DIMENS.s,
    fontWeight: '400',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
