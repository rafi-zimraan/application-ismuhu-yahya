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
import {Background, Gap} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';
import {COLORS} from '../../utils';

export default function Settings({navigation}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <Gap height={35} />
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
          <Gap width={80} />
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{false: COLORS.lightGray, true: COLORS.goldenOrange}}
            thumbColor={notificationsEnabled ? COLORS.primary : COLORS.gray}
          />
        </View>

        {/* Pengaturan Aplikasi */}
        {/* <Text style={styles.sectionHeader}>Pengaturan Aplikasi</Text>
        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon name="theme-light-dark" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Tampilan</Text>
            <Text style={styles.sectionSubtitle}>Tema, ukuran font, dll.</Text>
          </View>
        </TouchableOpacity> */}
        {/* 
        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon name="earth" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Bahasa</Text>
            <Text style={styles.sectionSubtitle}>Ubah bahasa aplikasi</Text>
          </View>
        </TouchableOpacity> */}

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
          onPress={() => {
            console.log('User logged out');
          }}>
          <Icon name="logout" size={28} color={COLORS.white} />
          <View style={styles.sectionTextContainer}>
            <Text style={[styles.sectionTitle, {color: COLORS.white}]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginVertical: 8,
  },
  sectionHeader: {
    fontSize: 18,
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
    fontSize: 16,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
});
