import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Dashboard, Message, Profile} from '../screens';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Beranda"
        component={Dashboard}
        options={{tabBarLabel: 'Beranda'}}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{tabBarLabel: 'Message'}}
      />
      <Tab.Screen
        name="Setting"
        component={Profile}
        options={{tabBarLabel: 'Setting'}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
