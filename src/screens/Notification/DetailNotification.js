// import React, {useState} from 'react';
// import {
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import {Background, Gap, HeaderTransparent} from '../../Component';
// import {IMG_PROFILE_FAKE} from '../../assets';
// import {COLORS} from '../../utils';

// export default function DetailNotification({navigation}) {
//   const roleRedux = useSelector(state => state.auth.user.role);
//   const [role, setRole] = useState(roleRedux);
//   console.log('ini role sekarang', role);

//   // useEffect(() => {
//   //   const loadingRoleFromEncryptedStorage = async () => {
//   //     if (!roleRedux) {
//   //       try {
//   //         const getRoleFromStorage = await EncryptedStorage.getItem('user');
//   //         console.log('data user', getRoleFromStorage);

//   //         if (getRoleFromStorage) {
//   //           const user = JSON.parse(getRoleFromStorage);
//   //           setRole(user.role);
//   //         }
//   //       } catch (error) {
//   //         console.log('Error load fole from EncryptedStorage', error);
//   //       }
//   //     }
//   //   };

//   //   loadingRoleFromEncryptedStorage();
//   // }, [roleRedux]);

//   return (
//     <View style={{flex: 1}}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <Background />
//       <HeaderTransparent
//         title="Detail Notification"
//         icon="arrow-left-circle-outline"
//         onPress={() => navigation.goBack()}
//       />
//       {role === 'Staff' ? (
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <Image source={IMG_PROFILE_FAKE} style={styles.profileImage} />
//             <View style={styles.headerTextContainer}>
//               <View style={styles.headerContainerTextNameAndTime}>
//                 <Text style={styles.senderName}>John Doe</Text>
//                 <Gap width={10} />
//                 <Text style={styles.time}>12:30 PM</Text>
//               </View>
//               <Gap height={15} />
//               <Text style={styles.description}>
//                 Izin cuti anda telah teraproval.
//               </Text>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.HcContainer}>
//           <View style={styles.HcBody}>
//             <View style={styles.viewBodyHistory}>
//               {['Nama', 'Divisi', 'Department', 'TTL Cuti', 'TTL Masuk'].map(
//                 (label, index) => (
//                   <View key={index} style={styles.textRow}>
//                     <Text style={styles.label}>{label}</Text>
//                     <Gap width={15} />
//                     <Text style={styles.value}>
//                       : {label === 'Nama' ? 'Fulan bin Fulanah' : 'Dkv'}
//                     </Text>
//                   </View>
//                 ),
//               )}
//               <View style={styles.textRow}>
//                 <Text style={styles.label}>Keterangan</Text>
//                 <Gap width={15} />
//                 <Text style={styles.valueKet}>
//                   : Izin cuti di karenakan besok ke makkah bari rafi zimraan
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.HcViewApproval}>
//               <TouchableOpacity
//                 activeOpacity={0.6}
//                 style={styles.HcContentApproval}>
//                 <Text style={styles.HcTxtApproval}>Approval</Text>
//               </TouchableOpacity>
//               <Gap width={35} />
//               <TouchableOpacity
//                 activeOpacity={0.6}
//                 style={styles.HcContentTolak}>
//                 <Text style={styles.HcTxtTolak}>Tolak</Text>
//               </TouchableOpacity>
//             </View>
//             <Gap height={5} />
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   viewBodyHistory: {
//     width: '90%',
//     padding: 15,
//   },
//   horizontalLine: {
//     borderBottomColor: COLORS.black,
//     borderBottomWidth: 0.5,
//     width: '100%',
//   },
//   textRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: COLORS.black,
//     width: '30%',
//   },
//   valueKet: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: COLORS.black,
//     flex: 1,
//     textAlign: 'left',
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: COLORS.black,
//     flex: 1,
//     textAlign: 'left',
//   },
//   HcTxtTolak: {
//     color: COLORS.white,
//     fontSize: 17,
//     fontWeight: '500',
//   },
//   HcTxtApproval: {
//     color: COLORS.black,
//     fontSize: 17,
//     fontWeight: '500',
//   },
//   HcContentTolak: {
//     backgroundColor: COLORS.greenSoft,
//     height: 55,
//     width: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//   },
//   HcContentApproval: {
//     backgroundColor: COLORS.goldenOrange,
//     height: 55,
//     width: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//   },
//   HcViewApproval: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   HcBody: {
//     backgroundColor: COLORS.champagne,
//     alignItems: 'center',
//     padding: 15,
//     elevation: 5,
//     borderRadius: 15,
//     borderWidth: 0.5,
//     borderColor: COLORS.black,
//     width: '90%',
//     maxWidth: 400,
//   },
//   HcContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerContainerTextNameAndTime: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 15,
//   },
//   header: {
//     flexDirection: 'row',
//     padding: 15,
//     backgroundColor: COLORS.champagne,
//     borderRadius: 15,
//     borderWidth: 0.6,
//     borderColor: COLORS.black,
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//   },
//   headerTextContainer: {
//     flexDirection: 'column',
//     flex: 1,
//   },
//   senderName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     maxWidth: '75%',
//   },
//   time: {
//     fontSize: 14,
//     color: 'grey',
//   },
//   description: {
//     fontSize: 14,
//     color: 'black',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, HeaderTransparent, ModalCustom} from '../../Component';
import {
  deleteNotification,
  getNotificationCategory,
  getNotificationDetail,
} from '../../features/Notification/services/notificationApiSlice';
import {COLORS} from '../../utils';

export default function DetailNotification({route, navigation}) {
  const {category} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  // Fetch notifications by category
  const fetchCategoryNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotificationCategory(category);
      console.log('response fecth', response.data);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else if (response?.data) {
        setData(response.data);
      } else {
        console.warn('Data notifikasi tidak valid:', response?.data);
        setData([]);
      }
    } catch (error) {
      console.error('Failed to fetch notifications by category', error);
      setData([]); // Fallback ke array kosong
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNotifications();
  }, [category]);

  // Handle notification deletion
  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;

    try {
      const success = await deleteNotification(selectedNotification);
      if (success) {
        setData(prevData =>
          prevData.filter(item => item.id !== selectedNotification),
        );
        console.log('Notifikasi berhasil dihapus');
      }
    } catch (error) {
      console.error('Failed to delete notification', error);
    } finally {
      setModalVisible(false);
      setSelectedNotification(null);
    }
  };

  // Open confirmation modal
  const openDeleteModal = id => {
    setSelectedNotification(id);
    setModalVisible(true);
  };

  // Refresh notifications
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchCategoryNotifications();
    } catch (error) {
      console.error('response api', error?.message || error);
    } finally {
      setRefreshing(false);
    }
  };

  // Navigate to detail notification
  const viewNotificationDetail = async id => {
    try {
      const detail = await getNotificationDetail(id);
      navigation.navigate('NotificationRead', {
        notificationDetail: detail?.data[0], // Pastikan hanya objek pertama yang dikirim
      });
    } catch (error) {
      console.error('error detail', error?.message || error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <HeaderTransparent
        title={`Detail Notification (${category})`}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <Text style={styles.loadingText}>Sedang memuat data...</Text>
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.notificationCard}
              onPress={() => viewNotificationDetail(item?.id)}>
              {/* Title Section */}
              <View style={styles.titleSection}>
                <Text style={styles.titleText}>{item?.title}</Text>
                <Text style={styles.dateText}>
                  {new Date(item?.created_at).toLocaleString()}
                </Text>
              </View>

              {/* Message Section */}
              <View style={styles.messageSection}>
                <Text style={styles.messageText}>{item?.message}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsSection}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => openDeleteModal(item?.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>
            Tidak ada notifikasi untuk kategori ini.
          </Text>
        )}
      </ScrollView>

      {/* Modal Custom untuk Konfirmasi Penghapusan */}
      <ModalCustom
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        buttonSubmit={handleDeleteNotification}
        buttonTitle="Hapus"
        iconModalName="trash-can-outline"
        title="Hapus Notifikasi"
        description="Apakah Anda yakin ingin menghapus notifikasi ini?"
      />

      {/* Modal untuk Token Expired */}
      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
  },
  loadingText: {
    fontStyle: 'italic',
    color: COLORS.grey,
    marginTop: 10,
    textAlign: 'center',
  },
  notificationCard: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 4,
    padding: 15,
  },
  titleSection: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  dateText: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.grey,
  },
  messageSection: {
    marginBottom: 10,
    padding: 10,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.black,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: COLORS.redSoft,
    padding: 10,
    borderRadius: 8,
  },
  deleteText: {
    fontSize: 14,
    color: COLORS.red,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.grey,
  },
});
