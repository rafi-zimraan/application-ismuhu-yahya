import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FormulirCuti} from '../features/Perizinan';
import {
  DaftarPresence,
  History,
  LibDemo,
  MenuPresence,
  Perizinan,
  PresenceEmployee,
  SignIn,
  SignUp,
  SplashScreen,
} from '../screens';
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
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Dasboard" component={DrawerNavigation} />
      <Stack.Screen name="PresenceEmployee" component={PresenceEmployee} />
      <Stack.Screen name="MenuPresence" component={MenuPresence} />
      <Stack.Screen name="DaftarPresence" component={DaftarPresence} />
      <Stack.Screen name="Perizinan" component={Perizinan} />
      <Stack.Screen name="FormulirCuti" component={FormulirCuti} />
      <Stack.Screen name="History" component={History} />
      {/* <Stack.Screen name="BottomUser" component={BottomUser} /> */}
      {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
    </Stack.Navigator>
  );
}
