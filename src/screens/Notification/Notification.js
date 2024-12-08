// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Background, Gap, ModalCustom} from '../../Component';
// import {NavbarNotif} from '../../features/Notification';
// import {getAllNotifications} from '../../features/Notification/services/notificationApiSlice';
// import {COLORS} from '../../utils';

// export default function Notification({navigation}) {
//   const [selectedMessages, setSelectedMessages] = useState([]);
//   const [messageState, setMessageState] = useState({lisences: [], payrol: []});
//   const [loading, setLoading] = useState(true);
//   const [tokenExpired, setTokenExpired] = useState(false);

//   const pickerData = [
//     {label: 'Januari', value: 'Jan'},
//     {label: 'Februari', value: 'Feb'},
//     {label: 'Maret', value: 'Mar'},
//     {label: 'April', value: 'Apr'},
//     {label: 'Mei', value: 'May'},
//     {label: 'Juni', value: 'Jun'},
//     {label: 'Juli', value: 'Jul'},
//     {label: 'Agustus', value: 'Aug'},
//     {label: 'September', value: 'Sep'},
//     {label: 'Oktober', value: 'Oct'},
//     {label: 'November', value: 'Nov'},
//     {label: 'Desember', value: 'Dec'},
//   ];

//   const [selectedMonth, setSelectedMonth] = useState(() => {
//     const currentMonthIndex = new Date().getMonth();
//     return pickerData[currentMonthIndex]?.value || null;
//   });

//   // useEffect(() => {
//   //   const fetchNotifications = async () => {
//   //     try {
//   //       const response = await getAllNotifications();
//   //       console.log('response notification', response.data.data);

//   //       if (response?.message === 'Silahkan login terlebih dahulu') {
//   //         // Token Expired, tampilkan modal
//   //         setTokenExpired(true);
//   //       } else if (response?.data?.data) {
//   //         const notifications = response.data.data;
//   //         console.log('data notif', notifications);

//   //         // Kelompokkan notifikasi berdasarkan kategori
//   //         const groupedNotifications = notifications.reduce((acc, curr) => {
//   //           const category = curr.category;
//   //           if (!acc[category]) {
//   //             acc[category] = [];
//   //           }
//   //           acc[category].push(curr);
//   //           return acc;
//   //         }, {});

//   //         // Set state dengan notifikasi yang dikelompokkan
//   //         setMessageState(groupedNotifications);
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch notifications', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchNotifications();
//   // }, []);

//   const countCategoryItems = category => messageState[category]?.length || 0;

//   // const saveUnreadCount = async count => {
//   //   try {
//   //     await EncryptedStorage.setItem('unreadCount', JSON.stringify(count));
//   //   } catch (error) {
//   //     console.error('Failed to save unread count', error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const unreadCount = messageState
//   //     .filter(msg => msg.status === 'delivered')
//   //     .reduce((acc, curr) => acc + curr.count, 0);

//   //   saveUnreadCount(unreadCount);
//   //   navigation.setOptions({
//   //     tabBarBadge: unreadCount > 0 ? unreadCount : null,
//   //   });
//   // }, [messageState, navigation]);

//   // const handleMessageLongPress = id => {
//   //   setSelectedMessages(
//   //     selectedMessages.includes(id)
//   //       ? selectedMessages.filter(message => message !== id)
//   //       : [...selectedMessages, id],
//   //   );
//   // };

//   // const filteredMessages = selectedMonth
//   //   ? messageState.filter(msg => msg.month === selectedMonth)
//   //   : messageState;

//   // const hasNewMessages = messageState.some(
//   //   msg => msg.status === 'delivered' && msg.count > 0,
//   // );

//   // const selectedMonthName =
//   //   pickerData.find(item => item.value === selectedMonth)?.label || 'bulan';

//   // ! hapus notification
//   const handleDelete = () => {
//     setMessageState(
//       messageState.filter(msg => !selectedMessages.includes(msg.id)),
//     );
//     setSelectedMessages([]);
//   };

//   if (loading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Gap height={10} />
//         <Text style={styles.textLoading}>Sedang memuat formulir</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{flex: 1}}>
//       <StatusBar barStyle="default" backgroundColor="transparent" />
//       <Background />
//       <NavbarNotif
//         selectedMessages={selectedMessages}
//         handleDelete={handleDelete}
//         pickerData={pickerData}
//         selectedMonth={selectedMonth}
//         setSelectedMonth={setSelectedMonth}
//       />
//       <View style={{padding: 15, flex: 1}}>
//         <View>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             {/* <Text
//               style={{fontSize: 22, fontWeight: '800', color: COLORS.black}}>
//               {hasNewMessages
//                 ? 'Obrolan Baru-baru ini'
//                 : `Obrolan ${selectedMonthName}`}
//             </Text> */}
//             {/* <Text style={{fontSize: 13, color: 'grey', marginLeft: 15}}>
//               {selectedMonthName}
//             </Text> */}
//           </View>
//         </View>

//         <Gap height={10} />
//         <View style={{padding: 15, flex: 1}}>
//           {/* licences */}
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.categoryCard}
//             onPress={() =>
//               navigation.navigate('DetailNotification', {category: 'lisences'})
//             }>
//             <View>
//               <Text style={styles.categoryHeader}>Perizinan</Text>
//               <Gap height={5} />
//               <Text style={styles.categoryDescription}>
//                 Kumpulan notifikasi berkaitan {'\n'}dengan perizinan.
//               </Text>
//             </View>
//             <View style={styles.countBadge}>
//               <Text style={styles.countText}>
//                 {countCategoryItems('lisences')}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <Gap height={15} />
//           {/* Payrol */}
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.categoryCard}
//             onPress={() =>
//               navigation.navigate('DetailNotification', {category: 'payrol'})
//             }>
//             <View>
//               <Text style={styles.categoryHeader}>Slip Gaji</Text>
//               <Text style={styles.categoryDescription}>
//                 Kumpulan notifikasi berkaitan {'\n'}dengan Slip Gaji.
//               </Text>
//             </View>
//             <View style={styles.countBadge}>
//               <Text style={styles.countText}>
//                 {countCategoryItems('payrol')}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//         {/* <FlatList
//             data={filteredMessages}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 key={item.id}
//                 activeOpacity={0.7}
//                 onPress={() => navigation.navigate('DetailNotification')}
//                 style={[
//                   styles.notificationItem,
//                   selectedMessages.includes(item.id) &&
//                     styles.selectedNotification,
//                 ]}
//                 onLongPress={() => handleMessageLongPress(item.id)}>
//                 {selectedMessages.includes(item.id) && (
//                   <Icon
//                     name="check-decagram-outline"
//                     size={51}
//                     color={COLORS.black}
//                   />
//                 )}
//                 <Gap width={13} />
//                 <Image source={IMG_PROFILE_FAKE} style={styles.image} />
//                 <Gap width={13} />
//                 <View style={styles.messageContainer}>
//                   <Text style={styles.sender}>{item.sender}</Text>
//                   <Text style={styles.message}>{item.message}</Text>
//                 </View>
//                 <View style={styles.timeContainer}>
//                   <Text style={styles.time}>{item.time}</Text>
//                   <View style={styles.countContainer}>
//                     <Text style={styles.count}>{item.count}</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           /> */}
//       </View>

//       {/* Modal untuk Token Expired */}
//       <ModalCustom
//         visible={tokenExpired}
//         onClose={() => setTokenExpired(false)}
//         iconModalName="alert-circle-outline"
//         title="Sesi Berakhir"
//         description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
//         buttonSubmit={() => {
//           setTokenExpired(false);
//           navigation.navigate('SignIn');
//         }}
//         buttonTitle="Login Ulang"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   textLoading: {
//     fontStyle: 'italic',
//     color: COLORS.black,
//     marginTop: 10,
//   },
//   viewPerizinan: {
//     alignItems: 'center',
//   },
//   categoryCard: {
//     backgroundColor: COLORS.white,
//     borderRadius: 15,
//     elevation: 5,
//     padding: 15,
//     marginBottom: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   categoryHeader: {
//     fontSize: 21,
//     fontWeight: '500',
//     color: COLORS.black,
//   },
//   categoryDescription: {
//     fontSize: 12,
//     fontWeight: '400',
//     color: COLORS.grey,
//   },
//   countBadge: {
//     backgroundColor: COLORS.goldenOrange,
//     borderRadius: 20,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     right: 0,
//     bottom: 15,
//     right: 15,
//   },
//   countText: {
//     fontSize: 16,
//     color: COLORS.white,
//     fontWeight: '700',
//   },
//   notificationItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.champagne,
//     borderRadius: 15,
//     elevation: 5,
//     padding: 15,
//     marginVertical: 7,
//   },
//   selectedNotification: {
//     backgroundColor: COLORS.red,
//   },
//   image: {
//     height: 55,
//     width: 55,
//   },
//   messageContainer: {
//     flex: 1,
//   },
//   sender: {
//     fontSize: 16,
//     color: '#333',
//   },
//   message: {
//     fontSize: 14,
//     color: '#888',
//   },
//   timeContainer: {
//     alignItems: 'center',
//   },
//   time: {
//     fontSize: 13,
//     color: COLORS.black,
//   },
//   countContainer: {
//     marginTop: 8,
//     backgroundColor: COLORS.goldenOrange,
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   count: {
//     fontSize: 12,
//     color: COLORS.white,
//   },
// });

import {useFocusEffect} from '@react-navigation/native';
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
import {Background, Gap, ModalCustom} from '../../Component';
import {getAllNotifications} from '../../features/Notification/services/notificationApiSlice';
import {COLORS} from '../../utils';

export default function Notification({navigation}) {
  const [notifications, setNotifications] = useState({
    lisences: [],
    payrol: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, []),
  );

  const fetchNotifications = async () => {
    try {
      const response = await getAllNotifications();

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        setNotifications({
          lisences: Array.isArray(response?.data?.lisences)
            ? response.data.lisences
            : [],
          payrol: Array.isArray(response?.data?.payrol)
            ? response.data.payrol
            : [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error?.message || error);
      setNotifications({lisences: [], payrol: []}); // Fallback ke nilai default
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchNotifications();
    } catch (error) {
      console.error(
        'Failed to refresh notifications:',
        error?.message || error,
      );
    } finally {
      setRefreshing(false);
    }
  };

  const countCategoryItems = category => {
    console.log(
      `Counting items for category: ${category}`,
      notifications?.[category],
    );
    return Array.isArray(notifications?.[category])
      ? notifications[category].filter(item => item?.is_read === '0').length
      : 0;
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <View style={styles.navbarContainer}>
        <Text style={styles.navbarTitle}>Notification</Text>
      </View>
      <ScrollView
        contentContainerStyle={{padding: 15}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Licenses */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.categoryCard}
          onPress={() =>
            navigation.navigate('DetailNotification', {
              category: 'lisences',
              // data: notifications.lisences,
            })
          }>
          <View>
            <Text style={styles.categoryHeader}>Perizinan</Text>
            <Gap height={5} />
            <Text style={styles.categoryDescription}>
              Kumpulan notifikasi berkaitan {'\n'}dengan perizinan.
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {countCategoryItems('lisences')}
            </Text>
          </View>
        </TouchableOpacity>

        <Gap height={15} />

        {/* Payroll */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.categoryCard}
          onPress={() =>
            navigation.navigate('DetailNotification', {
              category: 'payrol',
              // data: notifications.payrol,
            })
          }>
          <View>
            <Text style={styles.categoryHeader}>Slip Gaji</Text>
            <Text style={styles.categoryDescription}>
              Kumpulan notifikasi berkaitan {'\n'}dengan Slip Gaji.
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{countCategoryItems('payrol')}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal untuk Token Expired */}
      <ModalCustom
        visible={tokenExpired}
        onClose={() => setTokenExpired(false)}
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
  textLoading: {
    fontStyle: 'italic',
    color: COLORS.black,
    marginTop: 10,
  },
  navbarContainer: {
    backgroundColor: COLORS.goldenOrange,
    padding: 15,
    height: '12%',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    top: 30,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryHeader: {
    fontSize: 21,
    fontWeight: '500',
    color: COLORS.black,
  },
  categoryDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.grey,
  },
  countBadge: {
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 15,
    right: 15,
  },
  countText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '700',
  },
});
