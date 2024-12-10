import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  CreateFormulirPerizinan,
  EditFormulirPerizinan,
} from '../features/Perizinan';
import CategoryPresence from '../features/PresenceEmployee/components/CategoryPresence';
import {EditProfile} from '../features/Profile';
import {
  AboutApplication,
  ChangePassword,
  FaceScaanPresence,
  HelpSetting,
  LibDemo,
  NotificationDetail,
  NotificationFromCategory,
  OnBoarding,
  Perizinan,
  PerizinanByCategory,
  PerizinanLongTerm,
  Presensi,
  PrivasiSetting,
  Profile,
  QrCodePresense,
  SignIn,
  SignUp,
  SplashScreen,
} from '../screens';
import BottomTabs from './BottomTabs';
import DrawerNavigation from './drawer';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}
      initialRouteName={'SplashScreen'}>
      <Stack.Screen name="LibDemo" component={LibDemo} />
      <Stack.Screen name="Onboarding" component={OnBoarding} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Dasboard" component={DrawerNavigation} />
      <Stack.Screen name="CategoryPresence" component={CategoryPresence} />
      <Stack.Screen name="Presensi" component={Presensi} />
      <Stack.Screen name="FaceScaanPresence" component={FaceScaanPresence} />
      <Stack.Screen name="Perizinan" component={Perizinan} />
      <Stack.Screen
        name="NotificationFromCategory"
        component={NotificationFromCategory}
      />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="PrivasiSetting" component={PrivasiSetting} />
      <Stack.Screen name="AboutApplication" component={AboutApplication} />
      <Stack.Screen name="HelpSetting" component={HelpSetting} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="CreateFormulirPerizinan"
        component={CreateFormulirPerizinan}
      />
      <Stack.Screen
        name="EditFormulirPerizinan"
        component={EditFormulirPerizinan}
      />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
      <Stack.Screen name="QrCodePresense" component={QrCodePresense} />
      <Stack.Screen
        name="PerizinanByCategory"
        component={PerizinanByCategory}
      />
      <Stack.Screen name="PerizinanLongTerm" component={PerizinanLongTerm} />
    </Stack.Navigator>
  );
}
