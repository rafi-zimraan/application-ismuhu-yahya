import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background, HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function HelpSetting({navigation}) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = index => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const helpData = [
    {
      title: 'Bagaimana cara melakukan logout?',
      description:
        'Untuk melakukan logout, buka menu Setting, gulir ke bawah, dan tekan tombol "Logout". Konfirmasi jika diminta.',
    },
    {
      title: 'Bagaimana cara mengubah kata sandi?',
      description:
        'Buka menu Pengaturan > Pengaturan Akun > Privasi. Pilih opsi "Ubah Kata Sandi" dan ikuti instruksi.',
    },
    {
      title: 'Bagaimana cara mengatur notifikasi?',
      description:
        'Pergi ke menu Pengaturan > Pengaturan Aplikasi. Aktifkan atau nonaktifkan notifikasi sesuai preferensi Anda.',
    },
    {
      title: 'Bagaimana cara menggunakan fitur notifikasi?',
      description:
        '1. Notifikasi akan muncul di halaman Notifikasi berdasarkan kategori (Perizinan, Slip Gaji).\n' +
        '2. Anda dapat menyegarkan notifikasi dengan menarik layar ke bawah.\n' +
        '3. Klik salah satu notifikasi untuk melihat detailnya.\n' +
        '4. Anda dapat menghapus notifikasi dengan menekan tombol "Delete".\n' +
        '5. Jika sesi Anda berakhir, login ulang untuk memuat ulang notifikasi.',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Pusat Bantuan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={styles.container}>
        {helpData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.section}
              activeOpacity={0.6}
              onPress={() => toggleDescription(index)}>
              <Icon
                name="help-circle-outline"
                size={28}
                color={COLORS.goldenOrange}
              />
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{item.title}</Text>
              </View>
              <Icon
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={COLORS.goldenOrange}
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
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
    elevation: 3,
    justifyContent: 'space-between',
  },
  sectionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  descriptionContainer: {
    backgroundColor: COLORS.beige,
    padding: 15,
    marginTop: -10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
});
