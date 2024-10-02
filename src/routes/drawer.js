import {createDrawerNavigator} from '@react-navigation/drawer';
import {DasboardMaster, Dashboard, DrawerContent} from '../screens';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation({route}) {
  const initialRouteName =
    route.params?.role == 'Master' ? 'DasboardMaster' : 'DasboardPublic';

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="DasboardPublic" component={Dashboard} />
      <Drawer.Screen name="DasboardMaster" component={DasboardMaster} />
    </Drawer.Navigator>
  );
}
