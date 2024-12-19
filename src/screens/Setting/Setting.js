import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {Background, Gap, ModalCustom} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';
import {logout} from '../../features/authentication';
import {COLORS} from '../../utils';
import {DIMENS} from '../../utils/dimens';

export default function Settings({navigation}) {
  const dispatch = useDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleLogout = async () => {
    setLoadingLogout(true); // Set loading to true
    try {
      await logout(navigation, dispatch);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoadingLogout(false); // Set loading to false
      setLogoutModalVisible(false); // Close modal
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightGray}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Settings</Text>
      </View>
      <Background />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Gap height={15} />

        {/* Bagian Profil */}
        <Text style={styles.sectionHeader}>Profile</Text>
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Profile')}>
          <Image source={IMG_PROFILE_FAKE} style={{height: 55, width: 55}} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Fulan Bin Fulanah</Text>
            <Text style={styles.sectionSubtitle}>
              fulanahbinfulan@gmail.com
            </Text>
          </View>
        </TouchableOpacity>

        {/* Pengaturan Akun */}
        <Text style={styles.sectionHeader}>Pengaturan Akun</Text>
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('PrivasiSetting')}>
          <Icon name="lock-outline" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Privasi</Text>
            <Text style={styles.sectionSubtitle}>Atur pengaturan privasi</Text>
          </View>
        </TouchableOpacity>

        {/* Ganti Password */}
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Icon name="lock-reset" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Ganti Password</Text>
            <Text style={styles.sectionSubtitle}>
              Ubah password untuk keamanan Anda
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Icon name="bell-outline" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Notifikasi</Text>
            <Text style={styles.sectionSubtitle}>
              Atur preferensi notifikasi
            </Text>
          </View>
          <Gap width={50} />
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{false: COLORS.lightGray, true: COLORS.goldenOrange}}
            thumbColor={notificationsEnabled ? COLORS.primary : COLORS.gray}
          />
        </View>

        {/* Dukungan */}
        <Text style={styles.sectionHeader}>Bantuan & Dukungan</Text>
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
            <Text style={styles.sectionTitle}>Bantuan</Text>
            <Text style={styles.sectionSubtitle}>
              Pertanyaan yang sering ditanyakan
            </Text>
          </View>
        </TouchableOpacity>

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
            <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
            <Text style={styles.sectionSubtitle}>1.0 sidaq-rc</Text>
          </View>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.section, {backgroundColor: '#f66'}]}
          activeOpacity={0.8}
          onPress={() => setLogoutModalVisible(true)}>
          <Icon name="logout" size={28} color={COLORS.white} />
          <View style={styles.sectionTextContainer}>
            <Text style={[styles.sectionTitle, {color: COLORS.white}]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>

        <Gap height={50} />
      </ScrollView>

      {/* Modal untuk konfirmasi logout */}
      <ModalCustom
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
        ColorIcon={COLORS.red}
        title={'Konfirmasi Logout'}
        BackgroundButtonAction={COLORS.red}
        description={
          loadingLogout
            ? 'Harap tunggu, sedang memproses logout...'
            : 'Apakah Anda yakin ingin keluar dari aplikasi?'
        }
        buttonSubmit={handleLogout}
        buttonTitle={'Keluar'}
        iconModalName={'logout'}
        TextColorButton={COLORS.white}
        buttonLoading={loadingLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
  },
  sectionTextContainer: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: DIMENS.m,
    color: '#888',
  },
});
