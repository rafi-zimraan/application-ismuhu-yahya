import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {addTraining} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CreateTraining({navigation}) {
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
      ToastAndroid.show(
        'Gagal menambahkan data pelatihan!',
        ToastAndroid.SHORT,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    if (!title || !date || !cost || !category) {
      ToastAndroid.show('Harap diisi semua kolom!', ToastAndroid.SHORT);
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
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Tambah Data Pelatihan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.container}>
        <Gap height={15} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          stickyHeaderHiddenOnScroll>
          <View style={styles.inputContainer}>
            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Judul</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={COLORS.grey}
                placeholder="Judul training"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Tanggal</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerContainer}>
                <Text style={styles.dateText}>
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

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Kategori</Text>
              <TextInput
                style={styles.input}
                value={category}
                onChangeText={setCategory}
                placeholderTextColor={COLORS.grey}
                placeholder="Kategori training"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Harga Pelatihan</Text>
              <TextInput
                style={styles.input}
                value={cost}
                onChangeText={setCost}
                keyboardType="numeric"
                placeholderTextColor={COLORS.grey}
                placeholder="Harga Pelatihan"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Deskripsi</Text>
              <TextInput
                style={styles.inputMultiline}
                value={desc}
                onChangeText={setDesc}
                placeholderTextColor={COLORS.grey}
                placeholder="Deskripsi training"
                multiline
              />
            </View>
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
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 30,
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
    color: COLORS.textPrimary,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
    borderWidth: 1,
  },
  dateText: {
    fontSize: DIMENS.s,
    color: COLORS.black,
  },
});
