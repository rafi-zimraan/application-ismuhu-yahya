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
import {useSelector} from 'react-redux';
import {
  Background,
  ButtonAction,
  HeaderTransparent,
  ModalCustom,
} from '../../Component';
import {apiChangePassword} from '../../features/ChangePassword';
import {Translations} from '../../features/Language';
import {COLORS, DIMENS} from '../../utils';

export default function ChangePassword({navigation}) {
  const currentLanguage = useSelector(state => state.language.currentLanguage);

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

  // Ambil teks terjemahan berdasarkan bahasa saat ini
  const t = key => Translations[currentLanguage][key];

  const onSubmit = async data => {
    if (data.newPassword !== data.confirmPassword) {
      Alert.alert(t('error'), t('password_mismatch'));
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
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={t('app_settings')}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Text style={styles.title}>{t('change_password_title')}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={!showNewPassword}
              onChangeText={text => setValue('newPassword', text)}
              value={newPassword}
              placeholder={t('new_password_placeholder')}
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

          <Text style={styles.title}>{t('confirm_password_title')}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={!showConfirmPassword}
              onChangeText={text => setValue('confirmPassword', text)}
              value={confirmPassword}
              placeholder={t('confirm_password_placeholder')}
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
          title={t('save_button')}
          color={COLORS.white}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title={t('password_success_title')}
        description={t('password_success_message')}
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
