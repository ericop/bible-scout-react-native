import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Appbar, Button } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { useState } from 'react';


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const _handleSearch = () => console.log('Searching');

const [testData, setTestData] = useState('');
const callTestApi = () => fetch("https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy?urlText=https%3A%2F%2Fdbt.io%2Ftext%2Fverse%3Freply%3Djson%26v%3D2%26dam_id%3DENGESVO1ET%26book_id%3DPs%26chapter_id%3D1", {
  "headers": {
    "accept": "application/json, text/*",
    "x-api-key": "Genesis1-2InTheBeginningGodCreated"
  },
  "referrer": "https://biblescout.app/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
})
//fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(json => {
  console.log(json);
  setTestData(json[0].verse_text)
})


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
      <Button icon="receipt" mode="contained" onPress={() => navigation.navigate('LawAndProphets')}>
      Law And Prophets
    </Button>
    <Button icon="teach" mode="contained" onPress={() => navigation.navigate('Wisdom')}>
    Wisdom
    </Button>
    <Button icon="celtic-cross" mode="contained" onPress={() => navigation.navigate('Gospels')}>
    Gospels
    </Button>
    <Button icon="email-outline" mode="contained" onPress={() => navigation.navigate('Epistles')}>
    Epistles
    </Button>
    <Button  onPress={() => navigation.navigate('Settings')}>
    Go to Settings   
    </Button>
    <Button  onPress={() => callTestApi()}>
    call test API   
    </Button>
    <Text>{testData}</Text>
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
