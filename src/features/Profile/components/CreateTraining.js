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
import {COLORS} from '../../../utils';

export default function CreateTraining({navigation}) {
  const {control, handleSubmit} = useForm();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2024-05-27');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDate(formattedDate);
    }
  };

  const handleAPI = async data => {
    setIsLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      const response = await addTraining(userId, data);

      if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error.message);
      ToastAndroid.show(
        error.response?.data?.message || 'Gagal menambahkan data!',
        ToastAndroid.SHORT,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    const data = {
      title,
      date,
      category,
      description,
    };
    handleAPI(data);
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <HeaderTransparent
        title="Create Training"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
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
                <Text style={styles.dateText}>{date}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(date)}
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
              <Text style={styles.inputLabel}>Deskripsi</Text>
              <TextInput
                style={styles.inputMultiline}
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={COLORS.grey}
                placeholder="Deskripsi training"
                multiline
              />
            </View>
          </View>
          <Gap height={15} />
          <ButtonAction
            title="Save"
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
        description="Data training Anda berhasil ditambahkan!"
        buttonSubmit={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 8,
  },
  inputFieldContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 13,
    color: COLORS.black,
  },
  inputMultiline: {
    minHeight: 90,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 13,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
  datePickerContainer: {
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.black,
  },
});
