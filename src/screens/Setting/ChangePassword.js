import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  Background,
  ButtonAction,
  Gap,
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
  const [newPasswordBorderColor, setNewPasswordBorderColor] = useState(
    COLORS.grey,
  );
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState(
    COLORS.grey,
  );
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const t = key => Translations[currentLanguage][key];

  const onSubmit = async data => {
    if (data.newPassword !== data.confirmPassword) {
      ToastAndroid.show(t('password_mismatch'), ToastAndroid.SHORT);
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
      ToastAndroid.show(
        'Terjadi kesalahan saat menganti password',
        ToastAndroid.SHORT,
      );
    }
  };

  const validatePassword = (key, value) => {
    if (value.length < 6) {
      if (key === 'newPassword') {
        setNewPasswordBorderColor(COLORS.red);
        setNewPasswordError(t('password_min_length_error'));
      } else {
        setConfirmPasswordBorderColor(COLORS.red);
        setConfirmPasswordError(t('password_min_length_error'));
      }
    } else {
      if (key === 'newPassword') {
        setNewPasswordBorderColor(COLORS.black);
        setNewPasswordError('');
      } else {
        setConfirmPasswordBorderColor(COLORS.black);
        setConfirmPasswordError('');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={t('password_title')}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Text style={styles.title}>{t('change_password_title')}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, {borderColor: newPasswordBorderColor}]}
              secureTextEntry={!showNewPassword}
              onChangeText={text => {
                setValue('newPassword', text);
                validatePassword('newPassword', text);
              }}
              onFocus={() => setNewPasswordBorderColor(COLORS.goldenOrange)}
              onBlur={() => setNewPasswordBorderColor(COLORS.grey)}
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
          {newPasswordError ? (
            <Text style={styles.errorText}>{newPasswordError}</Text>
          ) : null}

          <Gap height={15} />
          <Text style={styles.title}>{t('confirm_password_title')}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {borderColor: confirmPasswordBorderColor},
              ]}
              secureTextEntry={!showConfirmPassword}
              onChangeText={text => {
                setValue('confirmPassword', text);
                validatePassword('confirmPassword', text);
              }}
              onFocus={() => setConfirmPasswordBorderColor(COLORS.goldenOrange)}
              onBlur={() => setConfirmPasswordBorderColor(COLORS.grey)}
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
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
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
  errorText: {
    color: COLORS.red,
    fontSize: DIMENS.s,
    textAlign: 'right',
  },
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  backButton: {
    color: COLORS.goldenOrange,
    fontSize: DIMENS.l,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: DIMENS.xl,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
