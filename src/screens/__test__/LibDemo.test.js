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

import {pick, types} from '@react-native-documents/picker';
import {viewDocument} from '@react-native-documents/viewer';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FloatingButton, Gap, HeaderTransparent} from '../../Component';
import {UploadFileModal, UploadLinkModal} from '../../features/TaskManagement';
import {COLORS, DIMENS} from '../../utils';

const tasks = [
  {
    title: 'Desain Dasbor untuk Admin',
    date: '3 Feb 2025',
    comments: 5,
    team: 2,
  },
  {
    title: 'Aplikasi Web Konom',
    date: '1 Feb 2025',
    comments: 4,
    team: 2,
  },
  {
    title: 'Riset dan Pengembangan',
    date: '2 Feb 2025',
    comments: 6,
    team: 2,
  },
  {
    title: 'Aplikasi Pemesanan Acara',
    date: '4 Feb 2045',
    comments: 5,
    team: 5,
  },
  {
    title: 'Pengembangan Proyek Baru',
    date: '4 Feb 2045',
    comments: 3,
    team: 4,
  },
];

export default function LibDemo({navigation}) {
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTaskIndex, setModalTaskIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [modalUploadVisible, setModalUploadVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileTitle, setFileTitle] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileUri, setFileUri] = useState(null);
  const [modalLinkVisible, setModalLinkVisible] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDescription, setLinkDescription] = useState('');

  const filterTasks = filter => {
    switch (filter) {
      case 'Hari Ini':
        return tasks.filter(task => task.date === '4 Feb 2045');
      case 'Tambahan':
        return tasks.filter(task => task.comments > 4);
      case 'Selesai':
        return tasks.filter(task => task.team > 2);
      default:
        return tasks;
    }
  };

  const filteredTasks = filterTasks(selectedFilter);

  const handleLongPress = index => {
    setModalTaskIndex(index);
    setModalVisible(true);
  };

  const handleOptionSelect = option => {
    if (option === 'Selesai' && modalTaskIndex !== null) {
      setCompletedTasks(prevTasks => [...prevTasks, modalTaskIndex]);
    }
    setModalVisible(false);
  };

  const handleFileUpload = async () => {
    const options = {quality: 0.5, mediaType: 'photo'};
    Alert.alert('Pilih sumber gambar', '', [
      {
        text: 'Kamera',
        onPress: async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            launchCamera(options, response => {
              const imageFile = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              };
              setFileUri(imageFile);
              setFileType('image');
            });
          } else {
            ToastAndroid.show('Izin kamera ditolak', ToastAndroid.SHORT);
          }
        },
      },
      {
        text: 'Galeri',
        onPress: () => {
          launchImageLibrary(options, response => {
            if (!response.didCancel && !response.error) {
              console.log('Gambar dipilih:', response.assets[0].uri);
              const imageFile = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              };
              setFileUri(imageFile);
              setFileType('image');
            }
          });
        },
      },
      {
        text: 'Batal',
        style: 'cancel',
      },
    ]);
  };

  const pickPDFDocument = async ({visible, onClose, onFileUploaded}) => {
    try {
      const result = await pick({
        mode: 'open',
        type: [types.pdf],
      });
      if (result && result[0]) {
        const pdfFile = {
          uri: result[0].uri,
          name: result[0].name,
          type: 'application/pdf',
        };
        setFileUri(pdfFile);
        setFileType('pdf');
      }
    } catch (error) {
      ToastAndroid.show('Gagal memilih file PDF', ToastAndroid.SHORT);
    }
  };

  const openPDF = async uri => {
    try {
      await viewDocument({uri});
    } catch (error) {
      ToastAndroid.show('Terjadi kesalahan membuka PDF', ToastAndroid.SHORT);
    }
  };

  const handleFileUploadSuccess = file => {
    setUploadedFiles(prevFiles => [...prevFiles, file]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} component={'transparent'} />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title={'Task Management'}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {['Semua', 'Hari Ini', 'Tambahan', 'Selesai'].map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedFilter === filter && {backgroundColor: COLORS.black},
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.viewTextLoopMenu,
                  selectedFilter === filter && {color: COLORS.white},
                ]}>
                {filter}
                <View style={styles.countBadge}>
                  <Text style={styles.countTextBadge}>
                    {filterTasks(filter).length}
                  </Text>
                </View>
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1, padding: 15}}>
        <FlatList
          data={filteredTasks}
          style={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              // onPress={() => handleItemPress(index)}
              onLongPress={() => handleLongPress(index)}
              activeOpacity={0.3}>
              <View
                style={[
                  styles.card,
                  completedTasks.includes(index) && {
                    backgroundColor: '#66CC66',
                  },
                ]}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Gap height={10} />
                <View style={styles.leftContainer}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => setModalUploadVisible(true)}>
                    <Icon name="cloud-upload" size={20} color={COLORS.black} />
                    <Text style={styles.buttonText}>Upload</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => setModalLinkVisible(true)}>
                    <Icon name="link" size={20} color={COLORS.black} />
                    <Text style={styles.buttonText}>Link</Text>
                  </TouchableOpacity>
                </View>
                <Gap height={3} />
                <View style={styles.footer}>
                  <View style={styles.countContainer}>
                    <TouchableOpacity style={styles.countButton}>
                      <Icon name="file" size={16} color={COLORS.black} />
                      <Text style={styles.countText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.countButton}>
                      <Icon name="attachment" size={16} color={COLORS.black} />
                      <Text style={styles.countText}>0</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightContainer}>
                    <Icon
                      name="calendar-month"
                      size={16}
                      color={COLORS.black}
                    />
                    <Gap width={5} />
                    <Text style={styles.textDate}>{item.date}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <UploadFileModal
        visible={modalUploadVisible}
        onClose={() => setModalUploadVisible(false)}
        fileTitle={fileTitle}
        setFileTitle={setFileTitle}
        fileType={fileType}
        setFileType={setFileType}
        fileDescription={fileDescription}
        setFileDescription={setFileDescription}
        handleFileUpload={handleFileUpload}
        handlePdfUpload={pickPDFDocument}
        fileUri={fileUri}
        loading={loading}
        setFileUri={setFileUri}
      />

      <UploadLinkModal
        visible={modalLinkVisible}
        onClose={() => setModalLinkVisible(false)}
        linkTitle={linkTitle}
        setLinkTitle={setLinkTitle}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        linkDescription={linkDescription}
        setLinkDescription={setLinkDescription}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBubble}>
            {['Selesai', 'Edit', 'Delete'].map((option, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleOptionSelect(option)}>
                <Text style={styles.modalText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <FloatingButton
        label={'Tambah Tugas'}
        iconName="plus"
        backgroundColor={COLORS.goldenOrange}
        onPress={() => navigation.navigate('CreateTaskManagement')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBubble: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: COLORS.white,
  },
  countTextBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  countBadge: {
    backgroundColor: '#A5D6A7',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginLeft: 6,
    alignItems: 'center',
  },
  countButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    padding: 5,
    borderRadius: 5,
  },
  countContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countText: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonText: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.creem,
    padding: 5,
    borderRadius: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textDate: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 1,
  },
  viewTextLoopMenu: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    elevation: 1,
    borderWidth: 0.4,
    borderColor: COLORS.black,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
