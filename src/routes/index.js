import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  CreateFormulirPerizinan,
  CreateFormulirPerizinanExit,
  EditFormulirPerizinan,
} from '../features/Perizinan';
import {
  QrCodeAdmin,
  ScannerQrCodeByCategoryAbsensi,
} from '../features/PresenceEmployee';
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
  Presensi,
  PrivasiSetting,
  Profile,
  QrCodePresense,
  SignIn,
  SignUp,
  SplashScreen,
} from '../screens';
import BottomTabs from './BottomTabs';
import TopTapBar from './TopTapBar';
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
      <Stack.Screen
        name="ScannerQrCodeByCategoryAbsensi"
        component={ScannerQrCodeByCategoryAbsensi}
      />
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
        name="CreateFormulirPerizinanExit"
        component={CreateFormulirPerizinanExit}
      />
      <Stack.Screen
        name="EditFormulirPerizinan"
        component={EditFormulirPerizinan}
      />

      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
      <Stack.Screen name="QrCodePresense" component={QrCodePresense} />
      <Stack.Screen name="QrCodeAdmin" component={QrCodeAdmin} />
      <Stack.Screen name="TopTabBar" component={TopTapBar} />
    </Stack.Navigator>
  );
}
