import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Background, Gap, ModalCustom} from '../../Component';
import {Translations} from '../../features/Language';
import {getAllDataSpa} from '../../features/Profile';
import {FecthMe, logout} from '../../features/authentication';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';

export default function Settings({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.currentLanguage);
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
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>{t('name_settings')}</Text>
      </View>
      <Background />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Gap height={15} />

        <Text style={styles.sectionHeader}>{t('profile')}</Text>
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Profile')}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.imgPhoto} />
          ) : (
            <Icon name="account-circle" size={55} color={COLORS.mediumGrey} />
          )}
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>
              {userName || t('name_unavailable')}
            </Text>
            <Text style={styles.sectionSubtitle}>{email || ' - '}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>{t('account_settings')}</Text>

        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Icon name="lock-reset" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>{t('change_password')}</Text>
            <Text style={styles.sectionSubtitle}>
              {t('change_password_description')}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>{t('help_support')}</Text>
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('HelpSetting')}>
          <Icon
            name="help-circle-outline"
            size={28}
            color={COLORS.goldenOrange}
          />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>{t('help')}</Text>
            <Text style={styles.sectionSubtitle}>{t('faq_description')}</Text>
          </View>
        </TouchableOpacity>
        <Gap height={5} />

        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('AboutApplication')}>
          <Icon
            name="information-outline"
            size={28}
            color={COLORS.goldenOrange}
          />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>{t('about_app')}</Text>
            <Text style={styles.sectionSubtitle}>1.0 sidaq-rc</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.section, {backgroundColor: COLORS.redLight}]}
          activeOpacity={0.8}
          onPress={() => setLogoutModalVisible(true)}>
          <Icon name="logout" size={28} color={COLORS.white} />
          <View style={styles.sectionTextContainer}>
            <Text style={[styles.sectionTitle, {color: COLORS.white}]}>
              {t('logout')}
            </Text>
          </View>
        </TouchableOpacity>
        <Gap height={50} />
      </ScrollView>

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
  imgPhoto: {
    height: 54,
    width: 54,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: COLORS.goldenOrange,
  },
  viewSwitch: {
    position: 'absolute',
    right: 10,
  },
  navbar: {
    backgroundColor: COLORS.goldenOrange,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: '12%',
  },
  navbarTitle: {
    position: 'absolute',
    top: 40,
    fontSize: DIMENS.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
    marginTop: 60,
  },
  sectionHeader: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginVertical: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
  },
  sectionTextContainer: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: DIMENS.m,
    color: COLORS.textSecondary,
  },
});
