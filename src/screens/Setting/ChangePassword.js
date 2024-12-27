import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  ButtonAction,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
import {apiChangePassword} from '../../features/ChangePassword';
import {COLORS, DIMENS} from '../../utils';

export default function ChangePassword({navigation}) {
  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');
  const [modalVisible, setModalVisible] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async data => {
    if (data.newPassword !== data.confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok');
      return;
    }

    try {
      const response = await apiChangePassword(
        data.newPassword,
        data.confirmPassword,
      );
      if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Pengaturan Aplikasi"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.contentWrapper}>
        <Background />
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Text style={styles.title}>Masukkan password baru Anda</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={!showNewPassword}
              onChangeText={text => setValue('newPassword', text)}
              value={newPassword}
              placeholder="Masukkan password baru"
              placeholderTextColor={COLORS.grey}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon
                name={showNewPassword ? 'eye-off' : 'eye'}
                size={20}
                color={COLORS.darkGray}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Konfirmasi password baru Anda</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={!showConfirmPassword}
              onChangeText={text => setValue('confirmPassword', text)}
              value={confirmPassword}
              placeholder="Konfirmasi password baru"
              placeholderTextColor={COLORS.grey}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color={COLORS.darkGray}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ButtonAction
          title="Simpan"
          color={COLORS.white}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title="Sukses"
        description="Password Anda berhasil diubah."
        iconModalName="check-circle-outline"
        buttonTitle="OK"
        buttonSubmit={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  backButton: {
    color: COLORS.goldenOrange,
    fontSize: DIMENS.l,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    color: COLORS.black,
    borderRadius: 8,
    padding: 10,
    fontSize: DIMENS.l,
  },
  iconContainer: {
    marginLeft: -40,
    padding: 10,
  },
});
