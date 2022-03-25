import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from "../types";
import {
  useTheme,
  Avatar,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from "react-native-paper";
import { View } from "react-native";
import * as React from 'react';
import LawAndProphetsScreen from "../screens/LawAndProphetsScreen";
import WisdomScreen from "../screens/WisdomScreen";
import GospelsScreen from "../screens/GospelsScreen";
import EpistlesScreen from "../screens/EpistlesScreen";
import Themes from "../constants/Themes";
import globalState from '../hooks/globalState';

// https://github.com/ChanakaUOMIT/React-Native-Root-boiler-plate/blob/master/src/navigation/drawerNavigation/DrawerNavigator.js

// https://stackoverflow.com/questions/51948040/react-native-drawer-navigation-with-stack-navigator


const MyDrawer = createDrawerNavigator();

export default function DrawerNavigator(props: any) {
  // console.log('DrawerNavigator props', props)
  console.log('DrawerNavigator globalState.readingState.readingProgress', globalState.readingState.readingProgress)
  return (
    <MyDrawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{
      headerStyle: {
        backgroundColor: props.theme === 'dark' ? Themes.dark.colors.accent : Themes.light.colors.primary
      }, headerTitleStyle: {
        color: Themes.light.colors.text
      }  }}>
      <MyDrawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home', ...props }} />
      <MyDrawer.Screen name="LawAndProphets" component={LawAndProphetsScreen} options={{title: 'LawAndProphets', ...props}} />
      <MyDrawer.Screen name="Wisdom" component={WisdomScreen} options={{ title: 'Wisdom', ...props }} />
      <MyDrawer.Screen name="Gospels" component={GospelsScreen} options={{ title: 'Gospels', ...props }} />
      <MyDrawer.Screen name="Epistles" component={EpistlesScreen} options={{ title: 'Epistles', ...props }} />
      {/* with headerShown: false the app bar moves to the top */}
      <MyDrawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings', ...props }} />
    </MyDrawer.Navigator>
  );
}

// https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
export function DrawerContent(props: any) {
  const paperTheme = useTheme();
  const [active, setActive] = React.useState('');

  const navTo = (screen: string) => {
    setActive(screen)
    props.navigation.navigate(screen)
  }

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title='Bible Scout'>
        {/* TODO this could ve pulled out into JSON and mapped over */}
        <Drawer.Item
          label='Home'
          icon='home'
          active={active === 'Home'}
          onPress={() => navTo('Home')}
        />
        <Drawer.Item
          label='Law And Prophets'
          icon='script-text-outline'
          active={active === 'LawAndProphets'}
          onPress={() => navTo('LawAndProphets')}
        />
        <Drawer.Item
          label='Wisdom'
          icon='scale-balance'
          active={active === 'Wisdom'}
          onPress={() => navTo('Wisdom')}
        />
        <Drawer.Item
          label='Gospels'
          icon='christianity-outline'
          active={active === 'Gospels'}
          onPress={() => navTo('Gospels')}
        />
        <Drawer.Item
          label='Epistles'
          icon='email-outline'
          active={active === 'Epistles'}
          onPress={() => navTo('Epistles')}
        />

      </Drawer.Section>
      <Drawer.Section title='Preferences'>
        <Drawer.Item
          label='Settings'
          icon='wrench'
          active={active === 'Settings'}
          onPress={() => navTo('Settings')}
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
    </DrawerContentScrollView >
  );
}

const paramsList = {
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'HomeScreen',
      //drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
  LawAndProphets: {
    screen: LawAndProphetsScreen,
    navigationOptions: {
      drawerLabel: 'LawAndProphetsScreen',
    }
  },
  Wisdom: {
    screen: WisdomScreen,
    navigationOptions: {
      drawerLabel: 'WisdomScreen',
    }
  },
  Gospels: {
    screen: GospelsScreen,
    navigationOptions: {
      drawerLabel: 'GospelsScreen',
    }
  },
  Epistles: {
    screen: EpistlesScreen,
    navigationOptions: {
      drawerLabel: 'EpistlesScreen',
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: 'SettingsScreen',
    }
  },
}
