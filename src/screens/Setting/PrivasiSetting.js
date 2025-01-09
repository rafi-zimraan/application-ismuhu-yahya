import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Background, Gap, HeaderTransparent, ModalCustom} from '../../Component';
import {Translations} from '../../features/Language';
import {setLanguage} from '../../features/Language/services/languageSlice';
import {toggleTheme} from '../../features/theme/services/themeSlice';
import {COLORS} from '../../utils';

export default function PrivasiSetting({navigation}) {
  const dispatch = useDispatch();
  const darkTheme = useSelector(state => state.theme.darkTheme);
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

  // Ambil teks terjemahan berdasarkan bahasa saat ini
  const t = key => Translations[currentLanguage][key];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={darkTheme ? 'default' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <Background />
      <View
        style={[
          styles.headerWrapper,
          {backgroundColor: darkTheme ? COLORS.darkBackground : '#fff'},
        ]}>
        <HeaderTransparent
          title={t('app_settings')}
          icon="arrow-left-circle-outline"
          color={darkTheme ? COLORS.white : COLORS.black}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15}}>
        {/* Tema */}
        <View
          style={[
            styles.section,
            {backgroundColor: darkTheme ? COLORS.darkBackground : COLORS.white},
          ]}>
          <View>
            <Text
              style={[
                styles.sectionTitle,
                {color: darkTheme ? COLORS.goldenOrange : COLORS.black},
              ]}>
              {t('dark_theme')}
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                {color: darkTheme ? COLORS.goldenOrange : COLORS.grey},
              ]}>
              {t('dark_theme_description')}
            </Text>
          </View>
          <Switch
            value={darkTheme}
            onValueChange={() => dispatch(toggleTheme())}
            trackColor={{
              false: COLORS.lightGray,
              true: COLORS.goldenOrange,
            }}
            thumbColor={darkTheme ? COLORS.primary : COLORS.gray}
          />
        </View>

        <Gap height={15} />

        {/* Pilih Bahasa */}
        <TouchableOpacity
          style={[
            styles.section,
            {backgroundColor: darkTheme ? COLORS.darkBackground : COLORS.white},
          ]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}>
          <View>
            <Text
              style={[
                styles.sectionTitle,
                {color: darkTheme ? COLORS.goldenOrange : COLORS.black},
              ]}>
              {t('select_language')}
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                {color: darkTheme ? COLORS.goldenOrange : COLORS.grey},
              ]}>
              {languages.find(lang => lang.code === currentLanguage)?.label ||
                t('select_language')}
            </Text>
          </View>
        </TouchableOpacity>

        <ModalCustom
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          onOutContentPress={() => setModalVisible(false)}
          title={t('modal_title')}
          description={t('modal_description')}
          iconModalName="translate"
          buttonSubmit={handleLanguageChange}
          buttonTitle={t('confirm')}>
          <View>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageOption}
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
          </View>
        </ModalCustom>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.black,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  languageText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedLanguage: {
    fontWeight: 'bold',
    color: COLORS.goldenOrange,
  },
});
