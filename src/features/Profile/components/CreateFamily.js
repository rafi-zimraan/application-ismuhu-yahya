import React, {useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {addFamilyData} from '..';
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

export default function CreateFamily({navigation}) {
  const {mode, colors} = useSelector(state => state.theme);
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [brother, setBrother] = useState('');
  const [child, setChild] = useState('');
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
      const response = await addFamilyData(userId, data);
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
    if (!father || !mother || !brother) {
      showToast('Harap diisi semua kolom');
      return;
    }
    const data = {
      father,
      mother,
      brother,
      child,
    };
    handleAPI(data);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={mode == 'light' ? 'default' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <View
        style={[
          styles.navbarContainer,
          {backgroundColor: colors[mode].background_header},
        ]}>
        <HeaderTransparent
          title="Tambah Data Keluarga"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView style={styles.container}>
          <Gap height={15} />
          <View style={styles.contentData} useBackgroundTransparent={true}>
            <View style={styles.inputContainer} useBackgroundTransparent={true}>
              <View style={styles.inputFieldContainer}>
                <Text
                  style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                  Nama Ayah
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: colors[mode].textInput},
                  ]}
                  value={father}
                  onChangeText={setFather}
                  placeholderTextColor={
                    mode == 'light' ? COLORS.softGray : COLORS.grey
                  }
                  placeholder="Nama Ayah"
                />
              </View>

              <View
                style={styles.inputFieldContainer}
                useBackgroundTransparent={true}>
                <Text
                  style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                  Nama Ibu
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: colors[mode].textInput},
                  ]}
                  value={mother}
                  onChangeText={setMother}
                  placeholderTextColor={
                    mode == 'light' ? COLORS.softGray : COLORS.grey
                  }
                  placeholder="Nama Ibu"
                />
              </View>

              <View
                style={styles.inputFieldContainer}
                useBackgroundTransparent={true}>
                <Text
                  style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                  Jumlah Saudara
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: colors[mode].textInput},
                  ]}
                  value={brother}
                  onChangeText={setBrother}
                  placeholderTextColor={
                    mode == 'light' ? COLORS.softGray : COLORS.grey
                  }
                  placeholder="Jumlah Saudara"
                  keyboardType="numeric"
                />
              </View>

              <View
                style={styles.inputFieldContainer}
                useBackgroundTransparent={true}>
                <Text
                  style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
                  Urutan Anak
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: colors[mode].textInput},
                  ]}
                  value={child}
                  onChangeText={setChild}
                  placeholderTextColor={
                    mode == 'light' ? COLORS.softGray : COLORS.grey
                  }
                  placeholder="Anak ke"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <ButtonAction
            title="Simpan"
            backgroundColor={COLORS.goldenOrange}
            loading={isLoading}
            color={COLORS.white}
            onPress={onSubmit}
          />
        </ScrollView>
      </View>
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        iconModalName="check-decagram-outline"
        title="Data Keluarga Berhasil Ditambahkan"
        description="Data keluarga Anda berhasil ditambahkan!"
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
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '11%',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  contentData: {
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
    borderRadius: 10,
    borderColor: COLORS.neutralGrey,
    borderWidth: 1,
    fontSize: DIMENS.s,
    color: COLORS.black,
  },
});
