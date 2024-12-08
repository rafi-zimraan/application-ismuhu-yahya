import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {getAllNotifications} from '../features/Notification/services/notificationApiSlice';
import {Dashboard, Notification, Settings} from '../screens';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation}) {
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    try {
      const response = await getAllNotifications();
      console.log('Fetched Notifications:', response.data); // Debugging respons API

      if (response?.data) {
        // Combine all notifications and filter unread items
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
      console.error('Failed to fetch unread notifications:', error);
      return 0;
    }
  };

  // Fetch unread count when component mounts
  useEffect(() => {
    const updateUnreadCount = async () => {
      const count = await fetchUnreadCount();
      console.log('Unread Notifications Count:', count); // Debugging jumlah notifikasi
      setUnreadCount(count);
    };

    updateUnreadCount();
  }, []);

  // Update unread count when the Notification tab is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const count = await fetchUnreadCount();
      setUnreadCount(count);
    });

    return unsubscribe;
  }, [navigation]);

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
