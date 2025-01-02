import {DrawerContent, createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation({route}) {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      initialRouteName={'DasboardPublic'}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="DasboardPublic" component={BottomTabs} />
    </Drawer.Navigator>
  );
}
