import * as React from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useTheme,
  Avatar,
  Drawer,
  TouchableRipple,
  Switch, FAB, Paragraph, Card, Title
} from "react-native-paper";

export default function WisdomScreen() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<{ verse_id: string, chapter_id: string, verse_text: string }[]>([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    axios({
      url: 'https://dcu73qiiyi.execute-api.us-east-2.amazonaws.com/default/bible-scout-proxy',
      params: {
        urlText: 'https%3A%2F%2Fdbt.io%2Ftext%2Fverse%3Freply=json%26v=2%26dam_id=ENGESVO1ET%26book_id=Ps%26chapter_id=3'
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
          <Card style={styles.card}>
            <ScrollView>
              <Card.Title title='Ps 3' subtitle='Month 1, Day 1' style={styles.title} />
              <Card.Content>
                {/* <Paragraph> */}
                {items.map((verse: { verse_id: string, chapter_id: string, verse_text: string }, idx: number) => {
                    return (
                      <View style={styles.verseContainer}>
                        {verse.verse_id === '1' ? <Text style={styles.chapterNumber}>{verse.chapter_id}</Text> : null}
                        <Text key={idx + 'num'} style={styles.verseNumber}>{verse.verse_id}</Text>
                        <Text key={idx + 'words'} style={styles.verseText}>{verse.verse_text}</Text>
                      </View>
                    )
                  }
                )}
                {/* </Paragraph> */}
              </Card.Content>
            </ScrollView>
          </Card>
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
    margin: 10
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
    backgroundColor: '#ff9800'
  },
});
