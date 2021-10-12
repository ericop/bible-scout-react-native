import * as React from 'react';
import { StyleSheet, ImageBackground, ScrollView, Dimensions, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Card, FAB } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EpistlesScreen() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<{ verse_id: string, chapter_id: string, verse_text: string }[]>([]);

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
      setItems(resp.data)
    }).catch((err: any) => {
      setIsLoaded(true);
      console.error('call failed with error:', err)
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
              <Card.Title title='Acts 1' subtitle='Month 1, Day 1' style={styles.title} />
              <Card.Content>
                {/* <Paragraph> */}
                {items.map((verse: { verse_id: string, chapter_id: string, verse_text: string }, idx: number) => {
                  return (
                    <Text key={idx +'verse-container'}>{verse.verse_id === '1' ? verse.chapter_id:null} {verse.verse_id} {verse.verse_text}

                    </Text>
                  )
                }
                )}
                {/* </Paragraph> */}
              </Card.Content>
            </Card>
          </ScrollView>
          <View style={styles.bottomAppBar}>
            <Text>🏠 ◀ ▶ ☑ ⏯</Text>
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
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    marginBottom: 60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ff9800'
  },
  chapterNumber: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold',
    // lineHeight: 28,
    marginRight: 10,
    backgroundColor: 'pink'
  },
  verseContainer: {
    flexDirection: 'row',
    // flexWrap:'wrap',
    backgroundColor: 'hotpink'
  },
  verseNumber: {
    fontSize: 12,
    lineHeight: 18,
    backgroundColor: 'gold'
  },
  verseText: {
    fontSize: 18,
    backgroundColor: 'tan',
    flexShrink: 1
  },
  bottomAppBar: {
    backgroundColor: '#ff9800',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 80,
    height: 44,
    zIndex: 5, // iOS
    elevation: 5, // android
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
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
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
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
