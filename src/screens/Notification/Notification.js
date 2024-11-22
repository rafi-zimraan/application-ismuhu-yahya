// Notification.js
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Background} from '../../Component';
import {
  FilterDropdown,
  NavbarNotif,
  NotificationList,
} from '../../features/Notification';
import {COLORS} from '../../utils';

export default function Notification({navigation}) {
  const [selectedMessages, setSelectedMessages] = useState([]);

  const pickerData = [
    {label: 'Januari', value: 'Jan'},
    {label: 'Februari', value: 'Feb'},
    {label: 'Maret', value: 'Mar'},
    {label: 'April', value: 'Apr'},
    {label: 'Mei', value: 'May'},
    {label: 'Juni', value: 'Jun'},
    {label: 'Juli', value: 'Jul'},
    {label: 'Agustus', value: 'Aug'},
    {label: 'September', value: 'Sep'},
    {label: 'Oktober', value: 'Oct'},
    {label: 'November', value: 'Nov'},
    {label: 'Desember', value: 'Dec'},
  ];

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonthIndex = new Date().getMonth();
    return pickerData[currentMonthIndex]?.value || null;
  });

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
      sender: 'Fulanah bin fulan',
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
      count: 9,
      status: 'delivered',
      month: 'Oct',
    },
    {
      id: 4,
      sender: 'Mitoma',
      message: 'Mau futsal kawan',
      time: '07.00',
      count: 4,
      status: 'delivered',
      month: 'Nov',
    },
  ]);

  const saveUnreadCount = async count => {
    try {
      await EncryptedStorage.setItem('unreadCount', JSON.stringify(count));
    } catch (error) {
      console.error('Failed to save unread count', error);
    }
  };

  useEffect(() => {
    const unreadCount = messageState
      .filter(msg => msg.status === 'delivered') // Pesan yang belum dibaca
      .reduce((acc, curr) => acc + curr.count, 0); // Total jumlah pesan yang belum dibaca

    saveUnreadCount(unreadCount); // Simpan ke EncryptedStorage

    // Perbarui tabBarBadge di BottomTabs
    navigation.setOptions({
      tabBarBadge: unreadCount > 0 ? unreadCount : null,
    });
  }, [messageState, navigation]);

  const handleDelete = () => {
    setMessageState(
      messageState.filter(msg => !selectedMessages.includes(msg.id)),
    );
    setSelectedMessages([]);
  };

  const filteredMessages = selectedMonth
    ? messageState.filter(msg => msg.month === selectedMonth)
    : messageState;

  const selectedMonthName =
    pickerData.find(item => item.value === selectedMonth)?.label || 'bulan';

  const hasNewMessages = messageState.some(
    msg => msg.status === 'delivered' && msg.count > 0,
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <NavbarNotif
          selectedMessages={selectedMessages}
          handleDelete={handleDelete}
        />

        <FilterDropdown
          pickerData={pickerData}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        <View style={{padding: 15}}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{fontSize: 22, fontWeight: '800', color: COLORS.black}}>
                {hasNewMessages
                  ? 'Obrolan Baru-baru ini'
                  : `Obrolan ${selectedMonthName}`}
              </Text>
              <Text style={{fontSize: 13, color: 'grey', marginLeft: 15}}>
                {selectedMonthName}
              </Text>
            </View>
          </View>

          <NotificationList
            messages={filteredMessages}
            selectedMessages={selectedMessages}
            setSelectedMessages={setSelectedMessages}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
}
