import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, ModalCustom, Text, View} from '../../Component';
import {Translations} from '../../features/Language';
import {getAllDataSpa} from '../../features/Profile';
import {FecthMe, logout} from '../../features/authentication';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function Settings({navigation}) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const {mode, colors} = useSelector(state => state.theme);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(false);

  const t = key => Translations[currentLanguage][key];

  const fetchProfileData = useCallback(async () => {
    try {
      const userData = await FecthMe();

      if (userData?.status) {
        const baseUrl = 'https://app.simpondok.com/';
        const photoUrl = userData.url_photo
          ? `${baseUrl}${userData.url_photo}`
          : null;

        setPhoto(photoUrl);
        setUserName(userData.username || '-');
        const userId = userData.user_id;
        const spaData = await getAllDataSpa(userId);
        if (spaData?.status && spaData?.data) {
          setEmail(spaData.data.email || '-');
        } else {
          setEmail('-');
        }
      } else if (userData?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
    } catch (error) {
      console.log('err fect data profile', error);
    }
  }, []);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await logout(navigation, dispatch);
    } catch (error) {
      console.log('err fecth logout', error);
    } finally {
      setLoadingLogout(false);
      setLogoutModalVisible(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [fetchProfileData]),
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={mode == 'light' ? 'default' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <View
        style={[
          styles.navbar,
          {
            backgroundColor: colors[mode].background_header,
          },
        ]}>
        <Text style={styles.navbarTitle}>{t('name_settings')}</Text>
      </View>
      <View useBackgroundColor={true}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Gap height={20} />
          <Text style={styles.sectionHeader}>{t('profile')}</Text>
          <View
            section={true}
            style={[
              styles.contentMenu,
              {shadowColor: mode === 'dark' ? COLORS.white : COLORS.black},
            ]}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Profile')}>
              {photo ? (
                <Image
                  source={{uri: photo}}
                  style={styles.imgPhoto}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              ) : (
                <Icon
                  name="account-circle"
                  size={55}
                  color={mode == 'light' ? COLORS.mediumGrey : COLORS.Orange}
                />
              )}
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[
                    styles.sectionTitle,
                    {color: colors[mode].textSectionTitleSett},
                  ]}>
                  {userName || t('name_unavailable')}
                </Text>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    {color: colors[mode].textSectionDescSett},
                  ]}>
                  {email || ' - '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionHeader}>{t('account_settings')}</Text>
          <View section={true} style={styles.contentMenu}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('PrivasiSetting')}>
              <Icon name="lock-outline" size={28} color={COLORS.goldenOrange} />
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[
                    styles.sectionTitle,
                    {color: colors[mode].textSectionTitleSett},
                  ]}>
                  {t('setting_account')}
                </Text>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    {color: colors[mode].textSectionDescSett},
                  ]}>
                  {t('privacy_description')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Gap height={5} />
          <View section={true} style={styles.contentMenu}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('ChangePassword')}>
              <Icon name="lock-reset" size={28} color={COLORS.goldenOrange} />
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[
                    styles.sectionTitle,
                    {color: colors[mode].textSectionTitleSett},
                  ]}>
                  {t('change_password')}
                </Text>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    {color: colors[mode].textSectionDescSett},
                  ]}>
                  {t('change_password_description')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionHeader}>{t('help_support')}</Text>
          <View section={true} style={styles.contentMenu}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('HelpSetting')}>
              <Icon
                name="help-circle-outline"
                size={28}
                color={COLORS.goldenOrange}
              />
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[
                    styles.sectionTitle,
                    {color: colors[mode].textSectionTitleSett},
                  ]}>
                  {t('help')}
                </Text>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    {color: colors[mode].textSectionDescSett},
                  ]}>
                  {t('faq_description')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Gap height={5} />

          <View section={true} style={styles.contentMenu}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('AboutApplication')}>
              <Icon
                name="information-outline"
                size={28}
                color={COLORS.goldenOrange}
              />
              <View style={styles.sectionTextContainer} section={true}>
                <Text
                  style={[
                    styles.sectionTitle,
                    {color: colors[mode].textSectionTitleSett},
                  ]}>
                  {t('about_app')}
                </Text>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    {color: colors[mode].textSectionDescSett},
                  ]}>
                  1.0 sidaq-rc
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Gap height={15} />
          <View
            style={[
              styles.contentMenu,
              {backgroundColor: colors[mode].buttonLogout},
            ]}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.8}
              onPress={() => setLogoutModalVisible(true)}>
              <Icon
                name="logout"
                size={28}
                color={mode == 'light' ? COLORS.black : COLORS.goldenOrange}
              />
              <View style={styles.sectionTextContainer} useSectionLogout={true}>
                <Text style={styles.sectionTitle}>{t('logout')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Gap height={50} />
        </ScrollView>
      </View>

      <ModalCustom
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
        ColorIcon={COLORS.red}
        title={t('logout_confirmation')}
        BackgroundButtonAction={COLORS.red}
        description={
          loadingLogout
            ? t('logout_processing')
            : t('logout_confirmation_message')
        }
        buttonSubmit={handleLogout}
        buttonTitle={t('logout')}
        iconModalName={'logout'}
        buttonLoading={loadingLogout}
        TextColorButton={COLORS.white}
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
  contentMenu: {
    elevation: 3,
    borderRadius: 10,
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.33,
    shadowRadius: 3.2,
    margin: 3,
  },
  imgPhoto: {
    height: 54,
    width: 54,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: COLORS.goldenOrange,
  },
  navbar: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: '11%',
  },
  navbarTitle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 55 : 45,
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
    marginTop: 60,
  },
  sectionHeader: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginVertical: 5,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  sectionTextContainer: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
  },
  sectionSubtitle: {
    fontSize: DIMENS.m,
    fontWeight: '300',
  },
});
