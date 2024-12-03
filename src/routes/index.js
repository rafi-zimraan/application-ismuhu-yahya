import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CreateFormulirPerizinan, FormulirCuti} from '../features/Perizinan';
import {EditProfile} from '../features/Profile';
import {
  AboutApplication,
  ChangePassword,
  DetailNotification,
  FaceScaanPresence,
  HelpSetting,
  LibDemo,
  OnBoarding,
  Perizinan,
  PresenceFormulir,
  Presensi,
  PrivasiSetting,
  Profile,
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
      <Stack.Screen name="PresenceFormulir" component={PresenceFormulir} />
      <Stack.Screen name="Presensi" component={Presensi} />
      <Stack.Screen name="FaceScaanPresence" component={FaceScaanPresence} />
      <Stack.Screen name="Perizinan" component={Perizinan} />
      <Stack.Screen name="FormulirCuti" component={FormulirCuti} />
      <Stack.Screen name="DetailNotification" component={DetailNotification} />
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
    </Stack.Navigator>
  );
}
