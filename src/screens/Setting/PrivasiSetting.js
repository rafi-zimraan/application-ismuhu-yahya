import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, HeaderTransparent, ModalCustom, Text, View} from '../../Component';
import {Translations} from '../../features/Language';
import {setLanguage} from '../../features/Language/services/languageSlice';
import {toggleTheme} from '../../features/theme';
import {COLORS, DIMENS} from '../../utils';

export default function PrivasiSetting({navigation}) {
  const dispatch = useDispatch();
  const {mode, colors} = useSelector(state => state.theme);
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isModalVisible, setModalVisible] = useState(false);
  const languages = [
    {code: 'en', label: 'English'},
    {code: 'id', label: 'Bahasa Indonesia'},
  ];

  const handleLanguageChange = () => {
    dispatch(setLanguage(selectedLanguage));
    setModalVisible(false);
  };

  const t = key => Translations[currentLanguage][key];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={mode == 'light' ? 'default' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <HeaderTransparent
        title={t('app_settings')}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
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

        <View style={styles.section} section={true}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}>
            <Text style={styles.sectionTitle}>{t('select_language')}</Text>
            <Text style={styles.sectionSubtitle}>
              {languages.find(lang => lang.code === currentLanguage)?.label ||
                t('select_language')}
            </Text>
          </TouchableOpacity>
        </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    elevation: 3,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
  },
  sectionSubtitle: {
    fontSize: DIMENS.s,
    marginTop: 5,
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    marginVertical: 5,
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
