import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DetailNewInformation} from '../features/Dasboard';
import {CheckOtpEmail, OtpForgotPassword} from '../features/ForgotPassword';
import {
  CreateFormulirPerizinan,
  CreateFormulirPerizinanExit,
  EditFormulirPerizinan,
} from '../features/Perizinan';
import {
  QrCodeAdmin,
  ScannerQrCodeByCategoryAbsensi,
} from '../features/PresenceEmployee';
import {CreateProfile, DetailDataPribadi} from '../features/Profile';
import {
  AboutApplication,
  ChangePassword,
  FaceScaanPresence,
  ForgotPassword,
  HelpSetting,
  LibDemo,
  Notification,
  NotificationDetail,
  NotificationFromCategory,
  OnBoarding,
  Perizinan,
  Presensi,
  PrivasiSetting,
  Profile,
  QrCodePresense,
  Settings,
  SignIn,
  SignUp,
  SplashScreen,
} from '../screens';
import BottomTabs from './BottomTabs';
import TopTapBar from './TopTapBar';

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
      <Stack.Screen name="Dasboard" component={BottomTabs} />
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
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="DetailDataPribadi" component={DetailDataPribadi} />
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
      <Stack.Screen
        name="DetailNewInformation"
        component={DetailNewInformation}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CheckOtpEmail" component={CheckOtpEmail} />
      <Stack.Screen name="OtpForgotPassword" component={OtpForgotPassword} />
    </Stack.Navigator>
  );
}
