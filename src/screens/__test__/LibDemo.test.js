// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {COLORS} from '../../utils';

// export default function LibDemo() {
//   return (
//     <View style={{flex: 1}}>
//       <StatusBar backgroundColor={'gold'} />
//       <View style={styles.header}>
//         <Text>Header</Text>
//       </View>

//       <ScrollView contentContainerStyle={{padding: 20}}>
//         {[1, 2, 3].map((_, i) => (
//           <View style={styles.containerAmalan} key={i}>
//             <Text style={styles.textAmalan}>Nama Amalan {i + 1}</Text>
//             <View style={{height: 10}} />
//             <View
//               style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//               <TouchableOpacity style={styles.btnOption}>
//                 <View style={styles.box} />
//                 <View style={{height: 5}} />
//                 <Text>Opsi Satu</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.btnOption}>
//                 <View style={styles.box} />
//                 <View style={{height: 5}} />
//                 <Text>Opsi Dua</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}

//         <View style={styles.containerAmalan}>
//           <Text style={styles.textAmalan}>Nama Amalan</Text>
//           <View style={{height: 10}} />
//           {[1, 2, 3].map((_, i) => (
//             <TouchableOpacity style={styles.btnOptionPicker} key={i}>
//               <View style={styles.circle} />
//               <View style={{width: 5}} />
//               <Text>Opsi {i + 1}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {[1, 2, 3, 4].map((_, i) => (
//           <View style={styles.containerAmalan} key={i}>
//             <Text style={styles.textAmalan}>Nama Amalan</Text>
//             <View style={{height: 5}} />
//             <View style={styles.textInput}>
//               <TextInput
//                 placeholder="Input amalan..."
//                 style={{height: 50, paddingHorizontal: 20}}
//               />
//             </View>
//           </View>
//         ))}

//         <View style={styles.containerAmalan}>
//           <Text style={styles.textAmalan}>Nama Amalan</Text>
//           <View style={{height: 10}} />
//           {[1, 2, 3].map((_, i) => (
//             <TouchableOpacity style={styles.btnOptionPicker} key={i}>
//               <View style={styles.circle} />
//               <View style={{width: 5}} />
//               <Text>Opsi {i + 1}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.containerAmalan}>
//           <Text style={styles.textAmalan}>Nama Amalan</Text>
//           <View style={{height: 5}} />
//           <View style={styles.textInput}>
//             <TextInput
//               placeholder="Input amalan..."
//               placeholderTextColor={COLORS.black}
//               style={{height: 50, paddingHorizontal: 20, color: COLORS.black}}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   textInput: {
//     height: 50,
//     backgroundColor: 'white',
//     borderRadius: 50 / 2,
//     elevation: 3,
//   },
//   btnOptionPicker: {
//     minHeight: 50,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     elevation: 3,
//     padding: 15,
//     borderRadius: 20,
//     flexDirection: 'row',
//     marginVertical: 5,
//   },
//   containerAmalan: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     paddingVertical: 20,
//   },
//   textAmalan: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: COLORS.black,
//   },
//   btnOption: {
//     minHeight: 50,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//     elevation: 3,
//     padding: 15,
//     borderRadius: 20,
//   },
//   box: {
//     width: 25,
//     height: 25,
//     borderWidth: 3,
//     borderRadius: 5,
//     borderColor: 'grey',
//   },
//   circle: {
//     width: 25,
//     height: 25,
//     borderWidth: 3,
//     borderRadius: 25 / 2,
//     borderColor: 'grey',
//   },
//   header: {
//     height: 50,
//     backgroundColor: 'gold',
//     elevation: 3,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
// });

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
//         console.log('File terpilih:', result[0].uri);
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
//       console.error('Error membuka PDF:', error);
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
//               File: {file[0]?.name}
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
//   },
// });

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LibDemo() {
  return (
    <View>
      <Text>LibDemo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
