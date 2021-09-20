import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from "../types";

// https://github.com/ChanakaUOMIT/React-Native-Root-boiler-plate/blob/master/src/navigation/drawerNavigation/DrawerNavigator.js

// https://stackoverflow.com/questions/51948040/react-native-drawer-navigation-with-stack-navigator

const paramsList = {
    HomeScreen: {
  screen: HomeScreen,
  navigationOptions: {
    drawerLabel: 'HomeScreen',
    //drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
  }   },
Settings: {
  screen: SettingsScreen,
  navigationOptions: {
    drawerLabel: 'SettingsScreen',
  }   }
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings Screen' }} />
    </Drawer.Navigator>
  );
}