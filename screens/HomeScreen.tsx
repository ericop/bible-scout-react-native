import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Appbar, Button } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { Audio } from 'expo-av';


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const _handleSearch = () => console.log('Searching');

  const [testData, setTestData] = useState('');
  const callTextApi = async () => {
    try {
      var resp = await axios({
        url: 'https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy',
        params: {
          urlText: 'https%3A%2F%2Fdbt.io%2Ftext%2Fverse%3Freply%3Djson%26v%3D2%26dam_id%3DENGESVO1ET%26book_id%3DPs%26chapter_id%3D1'
        },
        method: 'GET',
        headers: { 'x-api-key': 'Genesis1-2InTheBeginningGodCreated' }
      })
      console.log('axios resp:', resp.data)
      setTestData(resp.data[2].verse_text)
    }
    catch (err) {
      console.error('call failed with error:', err)
    }
  }
  const [audioData, setAudioData] = useState();

  // async function playSound() {
  //   let audioUrl = 'https://httpbiblereadingpalrequest.azurewebsites.net/api/v2?urlText=http%3A%2F%2Fcloud.faithcomesbyhearing.com%2Fmp3audiobibles2%2FENGESVN1DA%2FB01___01_Matthew_____ENGESVN1DA.mp3&code=UCgA0aEhZUMUtOmZV3WORgpB9EaJ05qLHJZV6EKPu%2FIto84LKpLKsg%3D%3D'
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //     //TODO solve error with https://docs.expo.dev/versions/latest/sdk/audio/#request-recording-permissions
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     require(audioUrl)
  //   );
  //   setAudioData(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  const callAudioApi = async () => {
    try {
      var resp = await axios({
        url: 'https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy',
        params: {
          urlText: 'https%3A%2F%2Fdbt.io%2Ftext%2Fverse%3Freply%3Djson%26v%3D2%26dam_id%3DENGESVO1ET%26book_id%3DPs%26chapter_id%3D1'
        },
        method: 'GET',
        headers: { 'x-api-key': 'Genesis1-2InTheBeginningGodCreated' }
      })
      console.log('axios resp:', resp.data)
      setTestData(resp.data[2].verse_text)
    }
    catch (err) {
      console.error('call failed with error:', err)
    }
  }

  useEffect(() => {
    // audioData
    //   ? () => {
    //     console.log('Unloading Sound');
    //     audioData.unloadAsync();
    //   }
    //   : undefined;
  },
    [audioData])


  return (
    <ImageBackground source={require('./../assets/images/bible-open-to-john.jpg')} resizeMode="cover" style={styles.background}>
      <ScrollView>
        <Card style={styles.card} mode='elevated'>
          <Card.Title title='My Daily Reading' subtitle='Reading links below'
            style={styles.titleContainer}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
          />
          <Card.Content style={styles.cardContent}>
            <Button icon="script-text-outline" mode="outlined" style={styles.readingButton} onPress={() => navigation.navigate('LawAndProphets')}>
              Law And Prophets
            </Button>
            <Button icon="scale-balance" mode="outlined" style={styles.readingButton} onPress={() => navigation.navigate('Wisdom')}>
              Wisdom
            </Button>
            <Button icon="christianity-outline" mode="outlined" style={styles.readingButton} onPress={() => navigation.navigate('Gospels')}>
              Gospels
            </Button>
            <Button icon="email-outline" mode="outlined" style={styles.readingButton} onPress={() => navigation.navigate('Epistles')}>
              Epistles
            </Button>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Button mode="contained" onPress={() => navigation.navigate('Settings')}>
              Go to Settings
            </Button>
            <Button onPress={() => callTextApi()}>
              call text API
            </Button>
            <Text>{testData}</Text>
            {/* <Button onPress={() => playSound()}>
              call audio API
            </Button> */}
          </Card.Content>
        </Card>
      </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: "center"
  },
  titleContainer: {
    backgroundColor: '#ff9800',
    width: '100%'
  },
  title: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.87)',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.57)',
  },
  card: {
    backgroundColor: '#37474f',
    // alignItems: 'center',
    // justifyContent: 'center',
    //padding: 10,
    margin: 10,
    marginBottom: 60
  },
  cardContent: {
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 15,
  },
  readingButton: {
    // backgroundColor: '#ff9800',
    padding: 10,
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
