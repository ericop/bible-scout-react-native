import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Appbar, FAB } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { RootTabScreenProps } from '../types';

export default function SettingsScreen({ navigation }: RootTabScreenProps<'Settings'>) {
  var count = 0
  var crossIt = () => {
    count += 1


    console.log('cross it',count)
  }
  const _handleSearch = () => console.log('Searching');

  return (
    <View style={styles.container}>
      <Appbar>
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      <Appbar.Header>
        <Appbar.Content title="Settings" subtitle="Light or Dark Mode" />
        <Appbar.Action icon="book" onPress={_handleSearch} />
      </Appbar.Header>
      </Appbar>
      <Text style={styles.title}>Pick your settings bro</Text>
      <FAB style={styles.fab}
    icon="celtic-cross"
    onPress={() => crossIt()}
  />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/SettingsScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
