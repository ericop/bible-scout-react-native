import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from "../types";
import {   useTheme,
    Avatar,
    Drawer,
    Text,
    TouchableRipple,
    Switch} from "react-native-paper";
import { View } from "react-native";
import * as React from 'react';

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

const MyDrawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <MyDrawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
      <MyDrawer.Screen name="Home" component={HomeScreen} 
      // options={{ headerShown: false }} 
      />
      {/* with headerShown: false the app bar moves to the top */}
      <MyDrawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings Screenz'}} />
    </MyDrawer.Navigator>
  );
}

// https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
export function DrawerContent(props: any) {
    const paperTheme = useTheme();
    const [active, setActive] = React.useState('');
  

    const toHome = () => {
      setActive('Home')
      console.log('to home')
      //console.log(props)
      props.navigation.navigate('Home')
    }

    const toSettings = () => {
        setActive('Settings')
        console.log('to setting')
        //console.log(props)
        props.navigation.navigate('Settings')
    }

    return (
      <DrawerContentScrollView {...props}>
            <Drawer.Section title="Bible Scout">
        <Drawer.Item
            label="Home"
            icon='home'
            active={active === 'Home'}
            onPress={() => toHome()}
        />
        <Drawer.Item
            label="Settings"
            icon='wrench'
            active={active === 'Settings'}
            onPress={() => toSettings()}
        />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
            <Drawer.Item
                label="Color Theme"
                icon='camera'
            >
            <TouchableRipple onPress={props.toggleTheme}>
                {/* <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                    <Switch value={theme.dark} />
                </View>
                </View> */}
            </TouchableRipple>
          </Drawer.Item>
        </Drawer.Section>
      </DrawerContentScrollView>
    );
  }
