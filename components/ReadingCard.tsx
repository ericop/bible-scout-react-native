import * as React from 'react';
import { StyleSheet, ImageBackground, ScrollView, Dimensions, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { IconButton, Card, FAB } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RootTabScreenProps, ReadingCategory, BibleTextVerse } from '../types';
//import navigation from '../navigation';
import {useRoute} from '@react-navigation/native';
import globalState from '../hooks/globalState';
import {BibleMediaService} from '../assets/services/BibleMediaService';

export default function ReadingCard({ navigation }:RootTabScreenProps<'Epistles'>) {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<BibleTextVerse[]>([]);
  const [reading, setReading] = useState<{month: number, day: number}>([]);
  const route = useRoute();
  // Note: the empty deps array [] means ...3DENGESVN1ET
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    console.log('globalState.readingProgress:',globalState.readingProgress)
    console.log('route:',route)
    let bibleService = BibleMediaService()
    let audioBibleVersion = ''
    let textBibleVersion = ''
    let reading = globalState.readingProgress.getReadingProgress(ReadingCategory[route.name])
    setReading(reading)
    console.log('reading:', reading)

    let verseInfo: {day: number, type: string, verse: string } = bibleService.getDiscipleShipJournalVerse(ReadingCategory[route.name], reading.month, reading.day, )
    console.log('verseInfo',verseInfo)

    switch (ReadingCategory[route.name]) {
      case ReadingCategory.LawAndProphets:
      case ReadingCategory.Wisdom:
        audioBibleVersion = "ENGESVO1DA";
        textBibleVersion = "ENGESVO1ET";
        break;
      case ReadingCategory.Gospels:
      case ReadingCategory.Epistles:
        audioBibleVersion = "ENGESVN1DA";
        textBibleVersion = "ENGESVN1ET";
        break;
    }

    bibleService.getText(textBibleVersion, verseInfo.verse)
    .then((...responsesArray) => {
      let responses = responsesArray.flat()
      let textItems = new Array<BibleTextVerse>()

      console.log('zresponses',responses)
        responses.forEach((resp: AxiosResponse<any>) => {
          setIsLoaded(true);
          console.log('axios resp:', resp)
          console.log('axios resp.data:', resp.data)
          if (!resp.data){
            return setError({message:`no 'resp.data' returned from API. If error continues please create an issue at https://github.com/ericop/bible-scout-react-native/issues`})
          }
          const versesTemp = resp.data.map((x:{book_name: string, chapter_id: string, verse_id: string, verse_text: string}) => {
            const obj: BibleTextVerse = {
              book: x.book_name,
              chapter: x.chapter_id,
              verse: x.verse_id,
              text: x.verse_text.replace(/\n/g, '').replace(/\t/g, '') // remove newline and indent from all text
            }
            return obj;
          })
          textItems.push(versesTemp)
        })
      setItems(textItems.flat())

    })
    .catch((err: any) => {
        setIsLoaded(true);
        console.error('call failed with error:', err)
        setError({message:`${err} If error continues please create an issue at https://github.com/ericop/bible-scout-react-native/issues`})
    })
  }, 
  [])

  if (error !== null) {
    return <Text>Error: {error.message}</Text>;
  } else if (!isLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container} >
        <ImageBackground source={require('./../assets/images/bible-open-to-john.jpg')} resizeMode="cover" style={styles.background}>
          <ScrollView>

            <Card style={styles.card}>
              <Card.Title title={items[0] ? `${items[0].book} ${items[0].chapter}:${items[0].verse} - ${items[items.length-1].book} ${items[items.length-1].chapter}:${items[items.length-1].verse}`: ''} subtitle={`${route.name}: Month ${reading.month}, Day ${reading.day}`} style={styles.titleContainer}
              titleStyle={styles.title} 
              subtitleStyle={styles.subtitle}
               />
              <Card.Content style={styles.cardContent}>
                {/* <Paragraph> */}
                <Text>
                {items.map((v: { verse: string, chapter: string, text: string }, idx: number) => {
                    return (
                      <Text key={idx + 'verse-container'} style={styles.verseContainer}>
                        {idx > 0 && v.verse === '1' ? <Text key={idx + 'ch-br'} style={styles.chapterNumber}>{'\n'}</Text> : null}
                        {v.verse === '1' ? <Text key={idx + 'ch'} style={styles.chapterNumber}>{v.chapter}</Text> : null}
                        <Text key={idx + 'num'} style={styles.verseNumber}>{v.verse}</Text>
                        <Text key={idx + 'words'} style={styles.verseText}>{v.text}</Text>
                      </Text>
                    )}
                )}
                </Text>
                {/* </Paragraph> */}
              </Card.Content>
            </Card>
          </ScrollView>
          <View style={styles.bottomAppBar}>
            <IconButton icon="home" style={styles.bottomAppBarButton} labelStyle={styles.bottomAppBarButtonContent} color='rgba(0,0,0,0.87)'
            mode="text" onPress={() => navigation.navigate('Home')}>
            </IconButton>
            <IconButton icon="page-previous" style={styles.bottomAppBarButton} labelStyle={styles.bottomAppBarButtonContent} color='rgba(0,0,0,0.87)'
            mode="text" onPress={() => navigation.navigate('Home')}>
            </IconButton>
            <IconButton icon="page-next" style={styles.bottomAppBarButton} labelStyle={styles.bottomAppBarButtonContent} color='rgba(0,0,0,0.87)'
            mode="text" onPress={() => navigation.navigate('Home')}>
            </IconButton>
            <IconButton icon="playlist-check" style={styles.bottomAppBarButton} labelStyle={styles.bottomAppBarButtonContent} color='rgba(0,0,0,0.87)'
              mode="text" onPress={() => navigation.navigate('Home')}>
            </IconButton>
            <IconButton icon="note-text" style={styles.bottomAppBarButton} labelStyle={styles.bottomAppBarButtonContent} color='rgba(0,0,0,0.87)'
            mode="text" onPress={() => navigation.navigate('Home')}>
            </IconButton>
          </View>
          <FAB style={styles.fab}
            icon="play"
            onPress={() => console.log('fab wisdom')}
          />
          <View style={styles.bottomAppBarHole}>
            <Image source={require('./../assets/images/bottom-app-bar-hole-orange-big5.png')} style={styles.bottomAppBarHoleImage} />
          </View>
          <View style={styles.bottomAppBar2}>
          </View>
          {/* <View style={styles.bottomAppBarHole}><Text>hole</Text> </View>
          <View style={styles.bottomAppBar2}><Text>2</Text> </View>  */}
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: "center"
  },
  card: {
    backgroundColor: '#37474f',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 10,
    margin: 10,
    marginBottom: 60
  },
  titleContainer: {
    backgroundColor: '#1de9b6',
  },
  title: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.87)',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.57)',
  },
  cardContent: {
    marginTop: 15,
  },
  chapterNumber: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold',
    lineHeight: 28,
    marginRight: 10,
   // backgroundColor: 'pink'
  },
  verseContainer: {
    flexDirection: 'row',
    color: 'white'
  },
  verseNumber: {
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
    textAlignVertical: 'top' // android, but seems to only work for web
  },
  verseText: {
    fontSize: 18,
    flexShrink: 1,
    color: 'white',
  },
  bottomAppBar: {
    backgroundColor: '#ff9800',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 80,
    height: 44,
    zIndex: 5, // iOS
    elevation: 5, // android
  },
  bottomAppBarButton: {
    backgroundColor:  '#ff9800',
  },
  bottomAppBar2: {
    backgroundColor: '#ff9800',
    position: 'absolute',
    bottom: 0,
    left: Dimensions.get('window').width - 10,
    right: 0,
    height: 44,
    zIndex: 5, // iOS
    elevation: 5, // android
    shadowColor: "#000",
  },
  bottomAppBarHole: {
    // backgroundColor: 'hotpink',
    backgroundColor: 'transparent',

    position: 'absolute',
    bottom: 0,
    left: Dimensions.get('window').width - 80,
    borderRadius: -30,
    height: 50,
    width: 70,
    zIndex: 5, // iOS
    elevation: 5, // android
  },
  bottomAppBarHoleImage: {
    flex: 1,
    width: 'auto',
    resizeMode: 'cover'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#8ef4da',
    zIndex: 8, // iOS
    elevation: 8, // android
  },
});
