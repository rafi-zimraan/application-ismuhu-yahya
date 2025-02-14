import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInputTaskManagement,
  getAllTaskManagement,
  updateDataTaskManagement,
} from '..';
import {
  AlertWarning,
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

export default function UpdateTaskManagement() {
  const navigation = useNavigation();
  const route = useRoute();
  const {taskId} = route.params;
  const [task, setTask] = useState(null);
  const [activity, setActivity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState(null);
  const [additionalPlan, setAdditionalPlan] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFetchingData, setIsFecthingData] = useState(true);
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

  useEffect(() => {
    const fetchTask = async () => {
      setIsFecthingData(true);
      try {
        const response = await getAllTaskManagement('all');
        if (response?.data) {
          const foundTask = response.data.find(t => t.id === taskId);
          if (foundTask) {
            setTask(foundTask);
            setActivity(foundTask.activity || '');
            setStartTime(foundTask.startTime || '');
            setEndTime(foundTask.endTime || '');
            setDueDate(foundTask.date || '');
            setCategory(
              foundTask.category === 'planned' ? 'Rencana' : 'Tidak Rencana',
            );
            setAdditionalPlan(foundTask.addition_task ? 1 : 0);
          }
        }
      } catch (error) {
        console.log('err mengambil data tasks', error);
      } finally {
        setIsFecthingData(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async () => {
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
      formattedActivity = `(${startTime} - ${endTime}) ${activity}`;
    }

    const division_id = task?.division_id || null;

    setLoading(true);
    try {
      const response = await updateDataTaskManagement(
        taskId,
        formattedActivity,
        division_id,
        dueDate,
        formattedCategory,
        additionalPlan,
      );

      if (response?.status === true) {
        ToastAndroid.show('Task berhasil diperbarui!', ToastAndroid.SHORT);
        setModalVisible(true);
      } else {
        console.log('Kesalahan update rencana harian');
      }
    } catch (error) {
      ToastAndroid.show(
        'Gagal memperbarui rencana harian!',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Background />
        <ModalLoading visible={isFetchingData} />
        <AlertWarning
          show={showAlert}
          message="Harap isi jam mulai dan jam selesai jika ingin menambahkan waktu!"
        />
        <View style={styles.headerWrapper}>
          <HeaderTransparent
            title={'Update Rencana Harian'}
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
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="done"
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
            title="Update"
            onPress={handleUpdateTask}
            loading={loading}
          />
        </View>

        <ModalCustom
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          iconModalName="check-circle"
          title="Sukses Memperbarui Rencana"
          description="Data telah diperbarui"
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    color: COLORS.black,
    fontSize: DIMENS.l,
    fontWeight: '500',
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
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
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
