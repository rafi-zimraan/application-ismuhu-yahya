// import React, {useState} from 'react';
// import {useForm} from 'react-hook-form';
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Background, Gap} from '../../Component';
// import {IMG_PROFILE_FAKE} from '../../assets';
// import {DropdownPicker} from '../../features/Notification';
// import {COLORS} from '../../utils';

// export default function Notification() {
//   const {control} = useForm();
//   const [selectedMessages, setSelectedMessages] = useState([]);
//   const [messageState, setMessageState] = useState([
//     {
//       id: 1,
//       sender: 'Fulan bin fulanah',
//       message: 'Izin cuti ya bro!',
//       time: '07.00',
//       count: 3,
//     },
//     {
//       id: 2,
//       sender: 'fulanah bin fulan',
//       message: 'Izin melahirkan ya bro!',
//       time: '17.30',
//       count: 2,
//     },
//     {
//       id: 3,
//       sender: 'Fulan bin fulan',
//       message: 'Izin makan ya bro!',
//       time: '13.00',
//       count: 1,
//     },
//   ]);

//   const handleAlert = () => {
//     Alert.alert('Perhatian', 'Doakan Agar fitur segera selesai');
//   };

//   const handleDelete = () => {
//     setMessageState(
//       messageState.filter(msg => !selectedMessages.includes(msg.id)),
//     );
//     setSelectedMessages([]);
//   };

//   const handleMessageLongPress = id => {
//     setSelectedMessages(
//       selectedMessages.includes(id)
//         ? selectedMessages.filter(message => message !== id)
//         : [...selectedMessages, id],
//     );
//   };

//   const pickerData = [
//     {label: 'Item 1', value: 'item1'},
//     {label: 'Item 2', value: 'item2'},
//     {label: 'Item 3', value: 'item3'},
//   ];

//   return (
//     <View style={{flex: 1}}>
//       <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
//       <Background />
//       <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
//         {/* Navbar */}
//         <View
//           style={[
//             styles.containernavbar,
//             selectedMessages.length > 0 && styles.navbarIconSelected,
//           ]}>
//           <Gap height={25} />
//           <View style={styles.viewNavbar}>
//             {selectedMessages.length > 0 ? (
//               <TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
//                 <Icon name="delete" size={37} color={COLORS.black} />
//               </TouchableOpacity>
//             ) : (
//               <>
//                 <Text style={styles.txtNotif}>Notification</Text>
//                 <TouchableOpacity activeOpacity={0.5} onPress={handleAlert}>
//                   <Icon name="magnify" size={37} color={COLORS.black} />
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>

//         {/* Button Filter */}
//         <DropdownPicker
//           title="filter"
//           picker={{
//             data: pickerData,
//             onSelect: value => console.log(value),
//           }}
//         />

//         <View style={{padding: 10}}>
//           {/* Menu */}
//           <View style={styles.contentMenu}>
//             <Text style={styles.txtTitleMenu}>Obrolan Baru-baru ini</Text>
//             <Gap width={15} />
//             <Text style={styles.txtTitleMenuMonth}>Nov</Text>
//           </View>
//           <Gap height={15} />

//           {/* Body Message */}
//           {messageState.map(({id, sender, message, time, count}) => (
//             <TouchableOpacity
//               key={id}
//               activeOpacity={0.7}
//               style={[
//                 styles.bodyNotification,
//                 selectedMessages.includes(id) &&
//                   styles.selectedBodyNotification,
//               ]}
//               onLongPress={() => handleMessageLongPress(id)}>
//               {selectedMessages.includes(id) && (
//                 <View style={styles.iconContainer}>
//                   <Icon
//                     name="check-decagram-outline"
//                     size={30}
//                     color={COLORS.green}
//                   />
//                 </View>
//               )}
//               <Gap width={13} />
//               <Image source={IMG_PROFILE_FAKE} style={styles.imgNotif} />
//               <Gap width={13} />
//               <View style={styles.viewMessage}>
//                 <Text style={styles.txtTitle}>{sender}</Text>
//                 <Gap height={8} />
//                 <Text style={styles.txtDes}>{message}</Text>
//               </View>
//               <View style={styles.rightContainer}>
//                 <Text style={styles.txtTime}>{time}</Text>
//                 <View style={styles.msgCountContainer}>
//                   <Text style={styles.msgCountText}>{count}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navbarIconSelected: {
//     backgroundColor: COLORS.red,
//   },
//   containernavbar: {
//     backgroundColor: COLORS.goldenOrange,
//     padding: 15,
//   },
//   viewNavbar: {
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   txtNotif: {
//     fontSize: 25,
//     color: COLORS.black,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   contentMenu: {
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   txtTitleMenu: {
//     fontSize: 22,
//     color: COLORS.black,
//     fontWeight: '800',
//   },
//   txtTitleMenuMonth: {
//     fontSize: 13,
//     color: COLORS.grey,
//     fontWeight: '600',
//   },
//   bodyNotification: {
//     backgroundColor: COLORS.blueLight,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 15,
//     elevation: 5,
//     padding: 15,
//     height: 80,
//     marginVertical: 5,
//   },
//   selectedBodyNotification: {
//     backgroundColor: COLORS.red,
//   },
//   iconContainer: {
//     backgroundColor: COLORS.green,
//     padding: 5,
//     borderRadius: 8,
//   },
//   imgNotif: {
//     height: 55,
//     width: 55,
//   },
//   viewMessage: {
//     flexDirection: 'column',
//     alignSelf: 'center',
//     height: 50,
//     flex: 1,
//   },
//   rightContainer: {
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     alignSelf: 'flex-end',
//   },
//   txtTime: {
//     fontSize: 13,
//     color: COLORS.grey,
//     fontWeight: '600',
//     alignSelf: 'flex-end',
//   },
//   msgCountContainer: {
//     marginTop: 8,
//     backgroundColor: COLORS.goldenOrange,
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   msgCountText: {
//     fontSize: 12,
//     color: COLORS.white,
//     fontWeight: 'bold',
//   },
//   txtDes: {
//     fontSize: 12,
//     color: COLORS.softGrey,
//     fontWeight: '500',
//   },
//   txtTitle: {
//     fontSize: 17,
//     color: COLORS.black,
//     fontWeight: '700',
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Background, Gap} from '../../Component';
import {IMG_PROFILE_FAKE} from '../../assets';
import {DropdownPicker} from '../../features/Notification';
import {setUnreadCount} from '../../features/Notification/services/notificationSlice';
import {COLORS} from '../../utils';

export default function Notification({navigation}) {
  const dispatch = useDispatch();
  const unreadCount = useSelector(state => state.notification.unreadCount);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  console.log('ini data bulan', selectedMonth);

  const [messageState, setMessageState] = useState([
    {
      id: 1,
      sender: 'Fulan bin fulanah',
      message: 'Izin cuti ya bro!',
      time: '07.00',
      count: 3,
      status: 'read',
      month: 'Nov',
    },
    {
      id: 2,
      sender: 'fulanah bin fulan',
      message: 'Izin melahirkan ya bro!',
      time: '17.30',
      count: 2,
      status: 'delivered',
      month: 'Dec',
    },
    {
      id: 3,
      sender: 'Fulan bin fulan',
      message: 'Izin makan ya bro!',
      time: '13.00',
      count: 1,
      status: 'delivered',
      month: 'Oct',
    },
  ]);

  useEffect(() => {
    const count = messageState
      .filter(msg => msg.status === 'delivered')
      .reduce((acc, curr) => acc + curr.count, 0);
    dispatch(setUnreadCount(count));
  }, [messageState, dispatch]);

  const handleDelete = () => {
    setMessageState(
      messageState.filter(msg => !selectedMessages.includes(msg.id)),
    );
    setSelectedMessages([]);
  };

  const handleMessageLongPress = id => {
    setSelectedMessages(
      selectedMessages.includes(id)
        ? selectedMessages.filter(message => message !== id)
        : [...selectedMessages, id],
    );
  };

  // Data bulan untuk filter
  const pickerData = [
    {label: 'Oktober', value: 'Oct'},
    {label: 'November', value: 'Nov'},
    {label: 'Desember', value: 'Dec'},
  ];

  // Pesan yang difilter berdasarkan bulan yang dipilih
  const filteredMessages = selectedMonth
    ? messageState.filter(msg => msg.month === selectedMonth)
    : messageState;

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View
          style={[
            styles.containernavbar,
            selectedMessages.length > 0 && styles.navbarIconSelected,
          ]}>
          <Gap height={25} />
          <View style={styles.viewNavbar}>
            {selectedMessages.length > 0 ? (
              <TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
                <Icon name="delete" size={37} color={COLORS.black} />
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.txtNotif}>Notification</Text>
                <TouchableOpacity activeOpacity={0.5}>
                  <View style={styles.viewIconMagnify}>
                    <Icon name="magnify" size={30} color={COLORS.primary} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Button Filter */}
        <DropdownPicker
          title="Filter"
          picker={{
            data: pickerData,
            onSelect: value => setSelectedMonth(value),
          }}
        />

        <View style={{padding: 10}}>
          <View style={styles.contentMenu}>
            <Text style={styles.txtTitleMenu}>Obrolan Baru-baru ini</Text>
            <Gap width={15} />
            <Text style={styles.txtTitleMenuMonth}>
              {selectedMonth || 'Bulan'}
            </Text>
          </View>
          <Gap height={15} />

          {filteredMessages.map(({id, sender, message, time, count}) => (
            <TouchableOpacity
              key={id}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('DetailNotification')}
              style={[
                styles.bodyNotification,
                selectedMessages.includes(id) &&
                  styles.selectedBodyNotification,
              ]}
              onLongPress={() => handleMessageLongPress(id)}>
              {selectedMessages.includes(id) && (
                <Icon
                  name="check-decagram-outline"
                  size={51}
                  color={COLORS.black}
                />
              )}
              <Gap width={13} />
              <Image source={IMG_PROFILE_FAKE} style={styles.imgNotif} />
              <Gap width={13} />
              <View style={styles.viewMessage}>
                <Text style={styles.txtTitle}>{sender}</Text>
                <Gap height={8} />
                <Text style={styles.txtDes}>{message}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.txtTime}>{time}</Text>
                <View style={styles.msgCountContainer}>
                  <Text style={styles.msgCountText}>{count}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  viewIconMagnify: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    padding: 2,
    alignItems: 'center',
    elevation: 5,
  },
  navbarIconSelected: {
    backgroundColor: COLORS.red,
  },
  containernavbar: {
    backgroundColor: COLORS.goldenOrange,
    padding: 15,
  },
  viewNavbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtNotif: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentMenu: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitleMenu: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '800',
  },
  txtTitleMenuMonth: {
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '600',
  },
  bodyNotification: {
    backgroundColor: COLORS.champagne,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    height: 80,
    marginVertical: 7,
  },
  selectedBodyNotification: {
    backgroundColor: COLORS.red,
  },

  imgNotif: {
    height: 55,
    width: 55,
  },
  viewMessage: {
    flexDirection: 'column',
    alignSelf: 'center',
    height: 50,
    flex: 1,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  txtTime: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  msgCountContainer: {
    marginTop: 8,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  msgCountText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  txtDes: {
    fontSize: 14,
    color: '#888',
  },
  txtTitle: {
    fontSize: 16,
    color: '#333',
  },
});
