import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, StyleSheet, TextInput} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {addCouple} from '..';
import {
  ButtonAction,
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function CreateCouple({navigation}) {
  const {handleSubmit} = useForm();
  const {colors, mode} = useSelector(state => state.theme);
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
      <StatusBar barStyle={mode == 'light' ? 'dark-content' : 'default'} />
      <HeaderTransparent
        title="Tambah Data Pasangan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container} showImageBackground={true}>
        <Gap height={15} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          stickyHeaderHiddenOnScroll>
          <View style={styles.inputContainer} useBackgroundTransparent={true}>
            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Nama Pasangan
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors[mode].textInput,
                  },
                ]}
                value={nameCouple}
                onChangeText={setNameCouple}
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
                placeholder="nama"
              />
            </View>

            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Domisili
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors[mode].textInput,
                  },
                ]}
                value={coupleDomisili}
                onChangeText={setCoupleDomisili}
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
                placeholder="Domisili"
              />
            </View>

            <View
              style={styles.inputFieldContainer}
              useBackgroundTransparent={true}>
              <Text
                style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                Jumlah Anak
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors[mode].textInput,
                  },
                ]}
                value={children}
                onChangeText={setChildren}
                keyboardType="numeric"
                placeholderTextColor={
                  mode == 'light' ? COLORS.softGray : COLORS.grey
                }
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
            disabled={nameCouple == '' || coupleDomisili == ''}
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    padding: 15,
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
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
    shadowColor: COLORS.black,
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
