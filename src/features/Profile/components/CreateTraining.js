import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {addTraining} from '..';
import {
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';
import Toast from 'react-native-toast-message';

export default function CreateTraining({navigation}) {
  const {mode, colors} = useSelector(state => state.theme);
  const {handleSubmit} = useForm();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleAPI = async data => {
    setIsLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      const response = await addTraining(userId, data);
      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      showToast('Gagal menambahkan data pelatihan!');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    if (!title || !date || !cost || !category) {
      showToast('Harap diisi semua kolom!');
      return;
    }

    const data = {
      title,
      date,
      category,
      desc,
      cost,
    };
    handleAPI(data);
  };

  return (
    <View style={{flex: 1}}>
      <HeaderTransparent
        title="Tambah Data Pelatihan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container} showImageBackground={true}>
        <Gap height={15} />
        <ScrollView style={styles.scrollContainer}>
          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Judul
            </Text>
            <TextInput
              style={[styles.input, {backgroundColor: colors[mode].textInput}]}
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={
                mode == 'light' ? COLORS.softGray : COLORS.grey
              }
              placeholder="Judul training"
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Tanggal
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.datePickerContainer,
                {backgroundColor: colors[mode].textInput},
              ]}>
              <Text style={[styles.dateText]}>
                {date.toISOString().split('T')[0]}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Kategori
            </Text>
            <TextInput
              style={[styles.input, {backgroundColor: colors[mode].textInput}]}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor={
                mode == 'light' ? COLORS.softGray : COLORS.grey
              }
              placeholder="Kategori training"
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Harga Pelatihan
            </Text>
            <TextInput
              style={[styles.input, {backgroundColor: colors[mode].textInput}]}
              value={cost}
              onChangeText={setCost}
              keyboardType="numeric"
              placeholderTextColor={
                mode == 'light' ? COLORS.softGray : COLORS.grey
              }
              placeholder="Harga Pelatihan"
            />
          </View>

          <View
            style={styles.inputFieldContainer}
            useBackgroundTransparent={true}>
            <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
              Deskripsi
            </Text>
            <TextInput
              style={[
                styles.inputMultiline,
                {backgroundColor: colors[mode].textInput},
              ]}
              value={desc}
              onChangeText={setDesc}
              placeholderTextColor={
                mode == 'light' ? COLORS.softGray : COLORS.grey
              }
              placeholder="Deskripsi training"
              multiline
            />
          </View>
          <Gap height={15} />
          <ButtonAction
            title="Simpan"
            backgroundColor={COLORS.goldenOrange}
            loading={isLoading}
            color={COLORS.white}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </View>

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-decagram-outline"
        title="Training Berhasil Ditambahkan"
        buttonTitle="Ok"
        description="Data training Anda berhasil ditambahkan!"
        buttonSubmit={() => navigation.goBack()}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
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
  dropdownButton: {
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    padding: 10,
    width: 100,
    borderRadius: 7,
    alignItems: 'center',
  },
  dropdownText: {
    color: COLORS.black,
    fontSize: DIMENS.m,
    fontWeight: '400',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 30,
    padding: 15,
  },
  inputContainer: {
    width: '100%',
    marginTop: 8,
  },
  inputFieldContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: DIMENS.m,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
    borderWidth: 1,
    fontSize: DIMENS.s,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    color: COLORS.black,
  },
  inputMultiline: {
    minHeight: 90,
    paddingHorizontal: 10,
    borderColor: COLORS.grey,
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
    borderWidth: 1,
    fontSize: DIMENS.s,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
  datePickerContainer: {
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
  },
  dateText: {
    fontSize: DIMENS.s,
    fontWeight: '400',
    color: COLORS.black,
  },
});
