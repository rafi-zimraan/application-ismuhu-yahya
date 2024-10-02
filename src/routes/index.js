// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SignIn, SplashScreen} from '../screens';
import DrawerNavigation from './drawer';

const Stack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

export default function Navigator() {
  const [initialRouteName, setinitialRouteName] = useState('SplashScreen');

  // function BottomUser() {
  //   return (
  //     <Tab.Navigator
  //       initialRouteName="Home"
  //       activeColor="#000000"
  //       inactiveColor="#fff"
  //       barStyle={{backgroundColor: '#00AF81'}}>
  //       <Tab.Screen
  //         name="Home"
  //         component={Home}
  //         options={{
  //           tabBarLabel: 'Home',
  //           tabBarIcon: ({color}) => (
  //             <Icon name="home-variant-outline" color={color} size={26} />
  //           ),
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Phonebook"
  //         component={PhoneBook}
  //         options={{
  //           tabBarLabel: 'Phonebook',
  //           tabBarIcon: ({color}) => (
  //             <Icon name="book-open-outline" color={color} size={26} />
  //           ),
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Label"
  //         component={Label}
  //         options={{
  //           tabBarLabel: 'Label',
  //           tabBarIcon: ({color}) => (
  //             <Icon name="label-outline" color={color} size={26} />
  //           ),
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Setting"
  //         component={SettingUser}
  //         options={{
  //           tabBarLabel: 'Setting',
  //           tabBarIcon: ({color}) => (
  //             <Icon name="cog-outline" color={color} size={26} />
  //           ),
  //         }}
  //       />
  //     </Tab.Navigator>
  //   );
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}
      initialRouteName={initialRouteName}>
      {/* <Stack.Screen name="LibDemo" component={LibDemo} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Dasboard" component={DrawerNavigation} />
      {/* <Stack.Screen name="BottomUser" component={BottomUser} /> */}
      {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
      {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
    </Stack.Navigator>
  );
}
