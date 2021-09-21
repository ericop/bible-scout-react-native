import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Appbar, Button } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const _handleSearch = () => console.log('Searching');
  return (
    
    <View style={styles.container}>
      {/* <Appbar>
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      <Appbar.Header>
        <Appbar.Content title="Home" subtitle="Reading Plans Below!" />
        <Appbar.Action icon="book" onPress={_handleSearch} />
      </Appbar.Header>
      </Appbar> */}
      <Text style={styles.title}>Title of home screen</Text>
      <Text style={styles.container}>Eop</Text>
      <Button icon="receipt" mode="contained" onPress={() => console.log('Pressed law')}>
      Law And Prophets
    </Button>
    <Button icon="teach" mode="contained" onPress={() => console.log('Wisdom')}>
    Wisdom
    </Button>
    <Button icon="celtic-cross" mode="contained" onPress={() => console.log('Gospels')}>
    Gospels
    </Button>
    <Button icon="email-outline" mode="contained" onPress={() => console.log('Epistles')}>
    Epistles
    </Button>
    <Button  onPress={() => navigation.navigate('Settings')}>
    Go to Settings   
    </Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
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
});
