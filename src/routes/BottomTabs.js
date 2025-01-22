import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {getAllNotifications} from '../features/Notification';
import {Dashboard, Notification, Settings} from '../screens';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation}) {
  const [unreadCount, setUnreadCount] = useState(0);

  // Fungsi untuk mendapatkan jumlah notifikasi yang belum dibaca
  const fetchUnreadCount = async () => {
    try {
      const response = await getAllNotifications();
      if (response?.data) {
        const lisences = Array.isArray(response.data.lisences)
          ? response.data.lisences
          : [];
        const payrol = Array.isArray(response.data.payrol)
          ? response.data.payrol
          : [];
        const unreadNotifications = [...lisences, ...payrol].filter(
          item => item?.is_read === '0',
        );
        return unreadNotifications.length;
      }
      return 0;
    } catch (error) {
      console.log('Failed to fetch unread notifications:', error);
      return 0;
    }
  };

  // Gunakan useFocusEffect untuk memperbarui jumlah badge saat layar fokus
  useFocusEffect(
    useCallback(() => {
      const updateUnreadCount = async () => {
        const count = await fetchUnreadCount();
        setUnreadCount(count);
      };

      updateUnreadCount();
    }, []),
  );

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Tab.Screen
        name="Beranda"
        component={Dashboard}
        options={{
          tabBarLabel: 'Beranda',
        }}
      />
      <Tab.Screen
        name="bell-outline"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarBadge: unreadCount > 0 ? unreadCount : null,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarLabel: 'Setting',
        }}
      />
    </Tab.Navigator>
  );
}
