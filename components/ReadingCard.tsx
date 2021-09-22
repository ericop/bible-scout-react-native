import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { BibleMediaService } from '../assets/services/bible-media.service';

import Colors from '../constants/Colors';
import Themes from '../constants/Themes';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

let bibleService = BibleMediaService()
let isLoading = false
let text: {verseNum:number,chapter:number,text:string}[] = []

let fetchText = (bibleVerse : string, book: string, verseString:string) => {
  isLoading = true
  text = []

  bibleService.getText(bibleVerse, book, verseString).then((data:any) => {
      text = data.flat().map((item:any) => {
          return { chapter: item.chapter_id, verseNum: item.verse_id, text: item.verse_text, paragraphNum: item.paragraph_number }
      })
      isLoading = false
  })
}

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export default function ReadingCard({ title, cardContent }: { title: string, cardContent: string }) {
  return (
    <Card>
    <Card.Title title={title} subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>{cardContent}</Paragraph>
      <Paragraph>{text}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  );
}

