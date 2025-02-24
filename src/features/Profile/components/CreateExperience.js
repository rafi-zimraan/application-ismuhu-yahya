import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {addExperience} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CreateExperience({navigation}) {
  const {handleSubmit} = useForm();
  const [company, setCompany] = useState('');
  const [lengthOfWork, setLengthOfWork] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

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
      ToastAndroid.show(
        error.response?.data?.message || 'Gagal menambahkan data!',
        ToastAndroid.SHORT,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    if (!company || !lengthOfWork || !position) {
      ToastAndroid.show('Harap diisi semua kolom', ToastAndroid.SHORT);
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
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Tambah Data Pengalaman"
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
              <Text style={styles.inputLabel}>Perusahaan</Text>
              <TextInput
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                placeholderTextColor={COLORS.grey}
                placeholder="Nama perusahaan"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Lama Bekerja (Tahun)</Text>
              <TextInput
                style={styles.input}
                value={lengthOfWork}
                onChangeText={setLengthOfWork}
                keyboardType="numeric"
                placeholderTextColor={COLORS.grey}
                placeholder="Lama bekerja dalam tahun"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Posisi</Text>
              <TextInput
                style={styles.input}
                value={position}
                onChangeText={setPosition}
                placeholderTextColor={COLORS.grey}
                placeholder="Posisi pekerjaan"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Deskripsi</Text>
              <TextInput
                style={styles.inputMultiline}
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={COLORS.grey}
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
    color: COLORS.black,
  },
  inputMultiline: {
    minHeight: 90,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
    borderWidth: 1,
    fontSize: DIMENS.s,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
});
