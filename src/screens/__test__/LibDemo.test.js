// ! Upload Pdf
// import {pick, types} from '@react-native-documents/picker';
// import {viewDocument} from '@react-native-documents/viewer';
// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   const [file, setFile] = useState(null);
//   console.log('file', file);

//   const pickDocument = async () => {
//     try {
//       const result = await pick({
//         mode: 'open',
//         // requestLongTermAccess: true,
//         type: [types.pdf],
//       });

//       console.log('data pdf', result[0].name);
//       console.log('data pdf', result);
//       if (result) {
//         setFile(result[0]);
//       }
//     } catch (error) {
//       console.log('Error picking document: ', error);
//     }
//   };

//   const openPDF = async () => {
//     if (!file) {
//       ToastAndroid.show('Pilih file terlebih dahulu', ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       await viewDocument({uri: file.uri});
//     } catch (error) {
//       console.log('Error membuka PDF:', error);
//       ToastAndroid.show('Terjadi kesalah', ToastAndroid.SHORT);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pilih File PDF</Text>

//       <TouchableOpacity style={styles.button} onPress={pickDocument}>
//         <Text style={styles.buttonText}>Upload PDF</Text>
//       </TouchableOpacity>

//       {file && (
//         <View style={styles.fileContainer}>
//           <TouchableOpacity>
//             <Text style={styles.fileName} onPress={() => setFile(file)}>
//               File: {file.name}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.viewButton} onPress={openPDF}>
//             <Text style={styles.viewButtonText}>Buka PDF</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   viewButton: {
//     marginTop: 10,
//     backgroundColor: '#ff5722',
//     padding: 10,
//     borderRadius: 5,
//   },
//   viewButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: COLORS.black,
//   },
//   button: {
//     backgroundColor: '#6200ea',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   fileContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//   },
//   fileName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.black,
//   },
// });

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LibDemo() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>LibDemo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
