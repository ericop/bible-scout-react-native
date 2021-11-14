import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FAB } from 'react-native-paper';
import ReadingCard from '../components/ReadingCard';

export default function GospelsScreen() {

  var count = 0
  var crossIt = () => {
    count += 1    
  }

  var cardContextGospels = {bibleVersion:'ENGESVN1ET', bibleBook:'Matt', bibleChapterAndVerse:'1'};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gospels</Text>

      <ReadingCard title='Gospels' cardContent={cardContextGospels} />
      <FAB style={styles.fab}
    icon="christianity-outline"
    onPress={() => crossIt()}
  />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/GospelsScreen.tsx" /> */}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
