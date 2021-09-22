import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { BibleMediaService } from '../assets/services/bible-media.service';

import Colors from '../constants/Colors';
import Themes from '../constants/Themes';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';



const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export default function ReadingCard({ title, cardContent }: { title: string, cardContent: string }) {
  let bibleService = BibleMediaService()
  let isLoading = false
  //let text: {verseNum:number,chapter:number,text:string}[] = []
  const [text, setText] = useState([]);

  let fetchText = (bibleVerse : string, book: string, verseString:string) => {
    isLoading = true

    bibleService.getText(bibleVerse, book, verseString)
      .then((response: any) => response.json())
      .then((data: any) => {
        const results: {chapter_id: string, verse_id: string, verse_text: string, paragraph_number: string }[] = data
        console.log('results=>',results)
        setText(data.flat().map((item:any) => {
            return { chapter: item.chapter_id, verseNum: item.verse_id, text: item.verse_text, paragraphNum: item.paragraph_number }
        }))
        console.log('ReadingCard,fetchText,bibleService.getText >',text)
        isLoading = false
    })
  }

  // onInit
  useEffect(() => {
    fetchText('ENGESVO1ET','Gen','1')
  },[])

  return (
    <Card style={styles.card}>
    <Card.Title title={title} subtitle="Card Subtitle" left={LeftContent} />
    <Card.Cover source={require('./../assets/images/bible-open-to-john.jpg')} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>{cardContent}</Paragraph>
      {text.map((verse: {verseNum:number,chapter:number,text:string}, idx:number) => 
        <Paragraph key={idx}>{verse.verseNum} {verse.text}</Paragraph>
        )}
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  );
}

// docs https://reactnative.dev/docs/view-style-props
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    height:'90%',
    width: '90%',
  },
  cardTitle: {
    marginVertical: 7,
  },
  cardContent: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  // docs https://reactnative.dev/docs/text-style-props
  cardContentParagraph: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  cardCover: {
    width: '100%'
  },
  cardActions: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  }
});

