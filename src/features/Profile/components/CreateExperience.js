import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {addExperience} from '..';
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

export default function CreateExperience({navigation}) {
  const {handleSubmit} = useForm();
  const {mode, colors} = useSelector(state => state.theme);
  const [company, setCompany] = useState('');
  const [lengthOfWork, setLengthOfWork] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleAPI = async data => {
    setIsLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      const response = await addExperience(userId, data);

      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    if (!company || !lengthOfWork || !position) {
      showToast('Harap diisi semua kolom');
      return;
    }

    const data = {
      company,
      length_of_work: lengthOfWork,
      position,
      description,
    };
    handleAPI(data);
  };

  return (
    <View style={{flex: 1}}>
      <HeaderTransparent
        title="Tambah Data Pengalaman"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container} showImageBackground={true}>
        <Gap height={15} />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.inputContainer} useBackgroundTransparent={true}>
            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Perusahaan
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {backgroundColor: colors[mode].textInput},
                ]}
                value={company}
                onChangeText={setCompany}
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
                placeholder="Nama perusahaan"
              />
            </View>

            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Lama Bekerja (Tahun)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {backgroundColor: colors[mode].textInput},
                ]}
                value={lengthOfWork}
                onChangeText={setLengthOfWork}
                keyboardType="numeric"
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
                placeholder="Lama bekerja dalam tahun"
              />
            </View>

            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Posisi
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {backgroundColor: colors[mode].textInput},
                ]}
                value={position}
                onChangeText={setPosition}
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
                placeholder="Posisi pekerjaan"
              />
            </View>

            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Deskripsi
              </Text>
              <TextInput
                style={[
                  styles.inputMultiline,
                  {backgroundColor: colors[mode].textInput},
                ]}
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
                placeholder="Deskripsi pekerjaan"
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
        title="Pengalaman Berhasil Ditambahkan"
        description="Data pengalaman kerja Anda berhasil ditambahkan!"
        buttonSubmit={() => navigation.goBack()}
        buttonTitle="OK"
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    width: '100%',
    marginTop: 8,
  },
  inputFieldContainer: {
    marginBottom: 15,
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
    color: COLORS.black,
  },
  inputMultiline: {
    minHeight: 90,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
    borderWidth: 1,
    fontSize: DIMENS.s,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
});
