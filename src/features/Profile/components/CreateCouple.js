import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {addCouple} from '..';
import {
  Background,
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CreateCouple({navigation}) {
  const {control, handleSubmit} = useForm();
  const [nameCouple, setNameCouple] = useState('');
  const [coupleDomisili, setCoupleDomisili] = useState('');
  const [children, setChildren] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const handleAPI = async data => {
    setIsLoading(true);
    try {
      const userId = await EncryptedStorage.getItem('idUser');
      const response = await addCouple(userId, data);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    const data = {
      name_couple: nameCouple,
      couple_domisili: coupleDomisili,
      children: parseInt(children),
    };
    handleAPI(data);
  };
  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Tambah Data Pasangan"
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
              <Text style={styles.inputLabel}>Nama Pasangan</Text>
              <TextInput
                style={styles.input}
                value={nameCouple}
                onChangeText={setNameCouple}
                placeholderTextColor={COLORS.grey}
                placeholder="nama"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Domisili</Text>
              <TextInput
                style={styles.input}
                value={coupleDomisili}
                onChangeText={setCoupleDomisili}
                placeholderTextColor={COLORS.grey}
                placeholder="Domisili"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={styles.inputLabel}>Jumlah Anak</Text>
              <TextInput
                style={styles.input}
                value={children}
                onChangeText={setChildren}
                keyboardType="numeric"
                placeholderTextColor={COLORS.grey}
                placeholder="berapa anak anda"
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
        title="Sukses menambah data pasangan"
        buttonTitle="OK"
        description="Selamat melanjutkan aktivitas anda.. semoga di permudah aktivitasnya yaa 😆"
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
    fontSize: DIMENS.s,
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: 'goldenrod',
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: DIMENS.l,
  },
});
