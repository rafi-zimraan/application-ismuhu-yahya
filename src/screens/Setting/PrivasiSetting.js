import React, {useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, HeaderTransparent, ModalCustom, Text, View} from '../../Component';
import {Translations, setLanguage} from '../../features/Language';
import {toggleTheme} from '../../features/theme';
import {COLORS, DIMENS} from '../../utils';
import ReactNativeBiometrics from 'react-native-biometrics';
import Toast from 'react-native-toast-message';
import {setBiometricEnabled} from '../../features/Profile';

export default function PrivasiSetting({navigation}) {
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics();
  const isBiometricEnable = useSelector(state => state.biometric.isEnabled);
  const {mode, colors} = useSelector(state => state.theme);
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showBiometricConfirmModal, setShowBiometricConfirmModal] =
    useState(false);
  const languages = [
    {code: 'en', label: 'English'},
    {code: 'id', label: 'Bahasa Indonesia'},
  ];

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleLanguageChange = async () => {
    dispatch(setLanguage(selectedLanguage));
    setModalVisible(false);
  };

  const handleBiometricEnable = async () => {
    try {
      const {available} = await rnBiometrics.isSensorAvailable();
      if (!available) {
        showToast('Biometrik tidak tersedia di perangkat ini', 'error');
        return;
      }

      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Otentifikasi menggunakan biometrik Anda',
        fallbackPromptMessage: 'Gunakan kode sandi perangkat',
        cancelButtonText: 'Batal',
      });

      if (result?.success) {
        await EncryptedStorage.setItem('biometric_enabled', 'true');
        dispatch(setBiometricEnabled(true));
        showToast('Biometrik berhasil diaktifkan', 'success');
      } else {
        dispatch(setBiometricEnabled(false));
        showToast('Autentikasi dibatalkan', 'info');
      }
    } catch (error) {
      console.log('Biometric Error:', error.message);
      showToast('Gagal melakukan autentikasi', 'error');
      dispatch(setBiometricEnabled(false));
    } finally {
      setShowBiometricConfirmModal(false);
    }
  };

  const t = key => Translations[currentLanguage][key];

  return (
    <View style={styles.container}>
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
          title={t('app_settings')}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{flex: 1}} showImageBackground={true}>
        <Gap height={15} />
        <View style={styles.section} section={true}>
          <View section={true}>
            <Text style={{fontSize: DIMENS.l}}>{t('dark_theme')}</Text>
            <Text style={styles.sectionSubtitle}>
              {t('dark_theme_description')}
            </Text>
          </View>
          <Switch
            value={mode == 'dark'}
            onValueChange={async () => {
              dispatch(toggleTheme());
              await EncryptedStorage.setItem(
                'theme_mode',
                mode == 'light' ? 'dark' : 'light',
              );
            }}
            trackColor={{
              false: '#767577',
              true: '#81b0ff',
            }}
            thumbColor={mode == 'light' ? COLORS.softGray : '#f5dd4b'}
          />
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
          style={[styles.section, {backgroundColor: colors[mode].section}]}>
          <View section={true}>
            <Text style={styles.sectionTitle}>{t('select_language')}</Text>
            <Text style={styles.textDesc}>{t('modal_description')}</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            {languages.find(lang => lang.code === currentLanguage)?.label ||
              t('select_language')}
          </Text>
        </TouchableOpacity>

        <View style={styles.section} section={true}>
          <View section={true}>
            <Text style={styles.sectionTitle}>Gunakan Biometrik</Text>
            <Text style={styles.sectionSubtitle}>
              Aktifkan untuk menggunakan sidik jari saat login.
            </Text>
          </View>
          <Switch
            value={isBiometricEnable}
            onValueChange={async Bio => {
              if (Bio) {
                setShowBiometricConfirmModal(true);
              } else {
                dispatch(setBiometricEnabled(false));
                await EncryptedStorage.setItem('biometric_enabled', 'false');
              }
            }}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isBiometricEnable ? '#f5dd4b' : COLORS.softGray}
          />
        </View>

        <ModalCustom
          visible={showBiometricConfirmModal}
          onRequestClose={() => setShowBiometricConfirmModal(false)}
          onOutContentPress={() => setShowBiometricConfirmModal(false)}
          title="Aktifkan Biometrik"
          description="Anda akan diminta memverifikasi menggunakan biometrik."
          iconModalName="fingerprint"
          buttonTitle="Lanjutkan"
          buttonSubmit={handleBiometricEnable}
        />

        <ModalCustom
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          onOutContentPress={() => setModalVisible(false)}
          title={t('modal_title')}
          description={t('modal_description')}
          iconModalName="translate"
          buttonSubmit={handleLanguageChange}
          buttonTitle={t('confirm')}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                {backgroundColor: colors[mode].textInput},
              ]}
              onPress={() => setSelectedLanguage(lang.code)}>
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === lang.code && styles.selectedLanguage,
                ]}>
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ModalCustom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    height: '11%',
  },
  textDesc: {
    fontSize: DIMENS.xs,
  },
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {height: 0, width: 2},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
  },
  sectionSubtitle: {
    fontSize: DIMENS.xs,
    marginTop: 5,
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    marginVertical: 5,
    borderRadius: 5,
  },
  languageText: {
    fontSize: DIMENS.l,
    color: COLORS.black,
  },
  selectedLanguage: {
    fontWeight: 'bold',
    color: COLORS.goldenOrange,
  },
});
