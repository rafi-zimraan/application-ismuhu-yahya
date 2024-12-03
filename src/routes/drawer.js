import {createDrawerNavigator} from '@react-navigation/drawer';
import {DasboardMaster} from '../screens';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation({route}) {
  const initialRouteName =
    route.params?.role == 'Master' ? 'DasboardMaster' : 'DasboardPublic';

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      initialRouteName={initialRouteName}
      // drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="DasboardPublic" component={BottomTabs} />
      <Drawer.Screen name="DasboardMaster" component={DasboardMaster} />
    </Drawer.Navigator>
  );
}
