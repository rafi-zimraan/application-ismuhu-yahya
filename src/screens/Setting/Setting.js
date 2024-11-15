import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background, Gap} from '../../Component';
import {COLORS} from '../../utils';

export default function Settings({navigation}) {
  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <Gap height={25} />

        {/* Bagian Profil */}
        <Text style={styles.sectionHeader}>Profil Karyawan</Text>
        <TouchableOpacity
          style={styles.section}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Profile')}>
          <Icon name="account" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Profil Saya</Text>
            <Text style={styles.sectionSubtitle}>
              Lihat dan ubah profil Anda
            </Text>
          </View>
        </TouchableOpacity>

        {/* Pengaturan Akun */}
        <Text style={styles.sectionHeader}>Pengaturan Akun</Text>
        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon name="lock-outline" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Privasi</Text>
            <Text style={styles.sectionSubtitle}>Atur pengaturan privasi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon name="bell-outline" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Notifikasi</Text>
            <Text style={styles.sectionSubtitle}>
              Atur preferensi notifikasi
            </Text>
          </View>
        </TouchableOpacity>

        {/* Pengaturan Aplikasi */}
        <Text style={styles.sectionHeader}>Pengaturan Aplikasi</Text>
        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon name="theme-light-dark" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Tampilan</Text>
            <Text style={styles.sectionSubtitle}>Tema, ukuran font, dll.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon name="earth" size={28} color={COLORS.goldenOrange} />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Bahasa</Text>
            <Text style={styles.sectionSubtitle}>Ubah bahasa aplikasi</Text>
          </View>
        </TouchableOpacity>

        {/* Dukungan */}
        <Text style={styles.sectionHeader}>Bantuan & Dukungan</Text>
        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
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

        <TouchableOpacity style={styles.section} activeOpacity={0.6}>
          <Icon
            name="information-outline"
            size={28}
            color={COLORS.goldenOrange}
          />
          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
            <Text style={styles.sectionSubtitle}>Informasi aplikasi</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 5,
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
