// import React from 'react';
// import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
// import {Background, Gap, HeaderTransparent} from '../../Component';
// import {COLORS} from '../../utils';

// export default function PrivasiSetting({navigation}) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <Background />
//       <HeaderTransparent
//         title="Pengaturan Privasi"
//         icon="arrow-left-circle-outline"
//         onPress={() => navigation.goBack()}
//       />
//       <View style={{padding: 15}}>
//         <Text style={styles.header}>Pengaturan Privasi</Text>
//         <Text style={styles.description}>
//           Kelola pengaturan privasi Anda untuk memastikan data Anda aman dan
//           sesuai dengan preferensi Anda.
//         </Text>
//         <Gap height={20} />
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Sembunyikan Profil</Text>
//           <Text style={styles.sectionSubtitle}>
//             Pilih siapa yang dapat melihat profil Anda.
//           </Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Kelola Data</Text>
//           <Text style={styles.sectionSubtitle}>
//             Lihat dan hapus data pribadi yang tersimpan.
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   description: {
//     fontSize: 16,
//     color: COLORS.gray,
//     lineHeight: 24,
//   },
//   section: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.lightGray,
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: COLORS.primary,
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     color: COLORS.gray,
//     marginTop: 5,
//   },
// });

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {Background, HeaderTransparent} from '../../Component';
import {COLORS} from '../../utils';

export default function PrivasiSetting({navigation}) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <HeaderTransparent
        title="Pengaturan Aplikasi"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{padding: 15}}>
        {/* Tema */}
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Tema Gelap</Text>
            <Text style={styles.sectionSubtitle}>Aktifkan mode gelap .</Text>
          </View>
          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            trackColor={{false: COLORS.lightGray, true: COLORS.goldenOrange}}
            thumbColor={darkTheme ? COLORS.primary : COLORS.gray}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.white,
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
});
