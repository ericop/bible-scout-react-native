import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FAB, Paragraph } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
            urlText: 'https%3A%2F%2Fdbt.io%2Ftext%2Fverse%3Freply%3Djson%26v%3D2%26dam_id%3DENGESVO1ET%26book_id%3DPs%26chapter_id%3D1'
          },
          method: 'GET',
          headers: { 'x-api-key': 'Genesis1-2InTheBeginningGodCreated'}
        }).then(resp => {
          setIsLoaded(true);
          console.log('axios resp:',resp.data)
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
    return <Paragraph>
      {items.map((verse: { verse_id: string, chapter_id: string, verse_text: string }, idx: number) =>
        <Text key={idx}>{verse.verse_id} {verse.verse_text}</Text>
      )}
    </Paragraph>
  }
}
