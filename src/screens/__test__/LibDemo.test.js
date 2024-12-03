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

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LibDemo() {
  return (
    <View style={{flex: 1}}>
      <Text>LibDemo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
