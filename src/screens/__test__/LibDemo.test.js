// ! SCREEN BANTUAN & DUKUNGAN-BANTUAN
// import React from 'react';
// import {ScrollView, StyleSheet, Text} from 'react-native';
// import {Gap} from '../../Component';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <ScrollView style={styles.container}>
//       <Gap height={20} />
//       <Text style={styles.header}>Bantuan</Text>
//       <Text style={styles.description}>
//         Temukan jawaban untuk pertanyaan Anda atau hubungi dukungan kami.
//       </Text>
//       <Gap height={20} />
//       <Text style={styles.question}>Bagaimana cara mengganti profil?</Text>
//       <Text style={styles.answer}>
//         Anda dapat mengganti profil Anda di menu "Profil Karyawan".
//       </Text>
//       <Text style={styles.question}>
//         Bagaimana cara mengubah pengaturan bahasa?
//       </Text>
//       <Text style={styles.answer}>
//         Anda dapat mengubah bahasa aplikasi melalui menu "Bahasa".
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   description: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginTop: 15,
//   },
//   answer: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginTop: 5,
//   },
// });

// ! BANTUAN & DUKUNGAN - TENTANG APLIKASI
// import React from 'react';
// import {ScrollView, StyleSheet, Text} from 'react-native';
// import {Gap} from '../../Component';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <ScrollView style={styles.container}>
//       <Gap height={20} />
//       <Text style={styles.header}>Tentang Aplikasi</Text>
//       <Text style={styles.description}>
//         Aplikasi ini dirancang untuk membantu pengelolaan pengaturan pengguna
//         secara efisien.
//       </Text>
//       <Text style={styles.detail}>
//         Versi: 1.0.0{'\n'}
//         Developer: Nama Developer{'\n'}
//         Hak Cipta: © 2024 Nama Perusahaan.
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   description: {
//     fontSize: 16,
//     color: COLORS.gray,
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   detail: {
//     fontSize: 16,
//     color: COLORS.darkGray,
//     lineHeight: 24,
//   },
// });

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
import {Background, Gap} from '../../Component';
import {COLORS} from '../../utils';

export default function HelpScreen({navigation}) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = index => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const helpData = [
    {
      title: 'Bagaimana cara melakukan logout?',
      description:
        'Untuk melakukan logout, buka menu Pengaturan, gulir ke bawah, dan tekan tombol "Logout". Konfirmasi jika diminta.',
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
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView style={styles.container}>
        <Gap height={25} />
        <Text style={styles.titleText}>Bantuan & Panduan</Text>
        <Gap height={20} />

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
    backgroundColor: COLORS.beige, // Warna background untuk deskripsi
    padding: 15,
    marginTop: -10, // Supaya terlihat rapi
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
