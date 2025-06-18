import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ListAmalYaumi} from '../features/AmalYaumi';
import {
  CreateCarLoan,
  DetailCarLoan,
  LoanTodayDetail,
} from '../features/CarLoan';
import {DetailNewInformation} from '../features/Dasboard';
import {
  Complaints,
  CreateFacilityComplaint,
  DetailFacilityComplaint,
  UpdateFacilityComplaint,
} from '../features/FacilityComplaint';
import {CheckOtpEmail, OtpForgotPassword} from '../features/ForgotPassword';
import {
  CarLoanNotificationListScreen,
  PermissionDetailScreen,
  PermissionNotificationListScreen,
} from '../features/Notification';
import {
  CreateFormulirPerizinan,
  CreateFormulirPerizinanExit,
  EditFormulirPerizinan,
} from '../features/Perizinan';
import {
  AllDataCouple,
  AllDataExperience,
  AllDataTraining,
  CreateCouple,
  CreateExperience,
  CreateFamily,
  CreateTraining,
  DetailDataCouple,
  DetailDataSpa,
  DetailExperience,
  DetailFamily,
  DetailTraining,
  UpdateDataSpa,
} from '../features/Profile';
import {
  CreateTaskManagement,
  FileLinkScreen,
  FilesScreen,
  TaskDetailScreen,
  UpdateTaskManagement,
} from '../features/TaskManagement';
import {
  AboutApplication,
  AmalYaumi,
  CarLoan,
  ChangePassword,
  FacilityComplaint,
  ForgotPassword,
  HelpSetting,
  LibDemo,
  Notification,
  OnBoarding,
  Perizinan,
  PrivasiSetting,
  Profile,
  Settings,
  SignIn,
  SplashScreen,
  TaskManagement,
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

      {/* Auth */}
      <Stack.Screen name="Onboarding" component={OnBoarding} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CheckOtpEmail" component={CheckOtpEmail} />
      <Stack.Screen name="OtpForgotPassword" component={OtpForgotPassword} />
      <Stack.Screen name="Dasboard" component={BottomTabs} />
      <Stack.Screen name="TopTabBar" component={TopTapBar} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />

      {/* Profile */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateCouple" component={CreateCouple} />
      <Stack.Screen name="CreateTraining" component={CreateTraining} />
      <Stack.Screen name="CreateExperience" component={CreateExperience} />
      <Stack.Screen name="CreateFamily" component={CreateFamily} />
      <Stack.Screen name="DetailDataCouple" component={DetailDataCouple} />
      <Stack.Screen name="DetailTraining" component={DetailTraining} />
      <Stack.Screen name="DetailExperience" component={DetailExperience} />
      <Stack.Screen name="DetailDataSpa" component={DetailDataSpa} />
      <Stack.Screen name="DetailFamily" component={DetailFamily} />
      <Stack.Screen name="UpdateDataSpa" component={UpdateDataSpa} />
      <Stack.Screen name="AllDataCouple" component={AllDataCouple} />
      <Stack.Screen name="AllDataTraining" component={AllDataTraining} />
      <Stack.Screen name="AllDataExperience" component={AllDataExperience} />

      {/* Setting  */}
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PrivasiSetting" component={PrivasiSetting} />
      <Stack.Screen name="AboutApplication" component={AboutApplication} />
      <Stack.Screen name="HelpSetting" component={HelpSetting} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      {/* Perizinan */}
      <Stack.Screen name="Perizinan" component={Perizinan} />
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

      {/* Notification */}
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="PermissionDetailScreen"
        component={PermissionDetailScreen}
      />
      <Stack.Screen
        name="PermissionNotificationListScreen"
        component={PermissionNotificationListScreen}
      />
      <Stack.Screen
        name="CarLoanNotificationListScreen"
        component={CarLoanNotificationListScreen}
      />

      {/* News Images */}
      <Stack.Screen
        name="DetailNewInformation"
        component={DetailNewInformation}
      />

      {/* Car Loan */}
      <Stack.Screen name="CarLoan" component={CarLoan} />
      <Stack.Screen name="DetailCarLoan" component={DetailCarLoan} />
      <Stack.Screen name="CreateCarLoan" component={CreateCarLoan} />
      <Stack.Screen name="LoanTodayDetail" component={LoanTodayDetail} />

      {/* Facility Complaint */}
      <Stack.Screen name="FacilityComplaint" component={FacilityComplaint} />
      <Stack.Screen name="Complaints" component={Complaints} />
      <Stack.Screen
        name="UpdateFacilityComplaint"
        component={UpdateFacilityComplaint}
      />
      <Stack.Screen
        name="DetailFacilityComplaint"
        component={DetailFacilityComplaint}
      />
      <Stack.Screen
        name="CreateFacilityComplaint"
        component={CreateFacilityComplaint}
      />

      {/* Amal Yaumi */}
      <Stack.Screen name="AmalYaumi" component={AmalYaumi} />
      <Stack.Screen name="ListAmalYaumi" component={ListAmalYaumi} />

      {/* Task Management */}
      <Stack.Screen name="TaskManagement" component={TaskManagement} />
      <Stack.Screen
        name="CreateTaskManagement"
        component={CreateTaskManagement}
      />
      <Stack.Screen
        name="UpdateTaskManagement"
        component={UpdateTaskManagement}
      />
      <Stack.Screen name="FilesScreen" component={FilesScreen} />
      <Stack.Screen name="FileLinkScreen" component={FileLinkScreen} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}
