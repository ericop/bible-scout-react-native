import * as React from 'react';
import { StyleSheet, ImageBackground, ScrollView, Dimensions, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { IconButton, Card, FAB } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RootTabScreenProps } from '../types';
//import navigation from '../navigation';

export default function EpistlesScreen({ navigation }:RootTabScreenProps<'Epistles'>) {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<{ book: string, verse: string, chapter: string, text: string }[]>([]);

  // Note: the empty deps array [] means ...3DENGESVN1ET
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    axios({
      url: 'https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy',
      params: {
        urlText: 'https://dbt.io/text/verse?reply=json&v=2&dam_id=ENGESVN1ET&book_id=Acts&chapter_id=1&verse_start=12&verse_end=26'
      },
      method: 'GET',
      headers: { 'x-api-key': 'Genesis1-2InTheBeginningGodCreated' }
    }).then(resp => {
      setIsLoaded(true);
      console.log('axios resp:', resp.data)
      const versesTemp = resp.data.map((x:{book_name: string, chapter_id: string, verse_id: string, verse_text: string}) => {

        const obj = {
          book: x.book_name,
          chapter: x.chapter_id,
          verse: x.verse_id,
          text: x.verse_text.replace(/\n/g, '').replace(/\t/g, '') // remove newline and indent from all text
        }
        console.log('my obj', obj)
        return obj;
      })
      setItems(versesTemp)
    }).catch((err: any) => {
      setIsLoaded(true);
      //console.error('call failed with error:', err)
      setError(err)
    })
  }, [])

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
              <Card.Title title={items[0] ? items[0].book: ''} subtitle='Month 1, Day 1' style={styles.titleContainer}
              titleStyle={styles.title} 
              subtitleStyle={styles.subtitle}
               />
              <Card.Content style={styles.cardContent}>
                {/* <Paragraph> */}
                <Text>
                {items.map((v: { verse: string, chapter: string, text: string }, idx: number) => {
                    return (
                      <Text key={idx + 'verse-container'} style={styles.verseContainer}>
                        {v.verse === '1' ? <Text style={styles.chapterNumber}>{v.chapter}</Text> : null}
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
            <IconButton icon="page-last" style={styles.bottomAppBarButton} labelStyle={styles.bottomAppBarButtonContent} color='rgba(0,0,0,0.87)'
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
    // lineHeight: 28,
    marginRight: 10,
   // backgroundColor: 'pink'
  },
  verseContainer: {
    flexDirection: 'row',
  },
  verseNumber: {
    fontSize: 12,
    lineHeight: 18,
    textAlignVertical: 'top' // android, but seems to only work for web
  },
  verseText: {
    fontSize: 18,
    flexShrink: 1,
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
