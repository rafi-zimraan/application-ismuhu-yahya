import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSelector} from 'react-redux';
import {Dashboard, Notification, Settings} from '../screens';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation}) {
  const unreadCount = useSelector(state => state.notification.unreadCount);
  // const [unreadCount, setUnreadCount] = useState(0);
  // const unreadCount = route.params?.unreadCount || 0;
  console.log('log', unreadCount);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: unreadCount > 0 ? unreadCount : null,
    });
  }, [navigation, unreadCount]);

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
        // initialParams={{setUnreadCount}}
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
