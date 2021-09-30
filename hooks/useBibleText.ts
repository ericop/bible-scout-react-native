import { useState } from "react";
import navigation from "../navigation";

export default function useCounter() {
  const [bibleText, setBibleText] = useState<any[]>([]);

  //const decrement = () => setCount(count - 1);
  //const increment = () => setCount(count + 1);
  let increment = () => {

    //console.log('increment:isDoneChecked', isDoneChecked)
    // isDoneChecked = false
    // justChecked = false

    // let shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
    // let shouldStartNewYear = readingDay === 25 && readingMonth === 12

    // if (shouldGoForwardAMonth) {
    //     readingMonth++
    //     readingDay = 1
    // } else if (shouldStartNewYear) {
    //     readingDay = 1
    //     readingMonth = 1
    // } else {
    //     readingDay++
    // }

    // setInitialData()
    //TODO preFetchNextReadingMedia()
}



let decrement = () => {
    //console.log('decrement:isDoneChecked', isDoneChecked)
    // isDoneChecked = true
    // justChecked = false

    // let shouldGoBackAMonth = readingDay === 1 && readingMonth > 1

    // if (shouldGoBackAMonth) {
    //     readingMonth--
    //     readingDay = 25
    // } else {
    //     readingDay--
    // }

    // bibleService.setReadingProgress(readingCategory, readingMonth, readingDay)

    // var verseInfo = bibleService.getDiscipleShipJournalVerse(readingMonth, readingDay, readingCategory)
    // bibleVerse = verseInfo.verse

    // var [book, verseString] = verseInfo.verse.split(' ')

    // fetchText(textBibleVersion, book, verseString)
}

let incrementReadingCategory = (currentReadingCategory: string) => {
    let readingCategory = currentReadingCategory
    //TODO incrementLocalStoreOnly()

    // switch (readingCategory) {
    //     case 'law-and-prophets':
    //         navigation.navigate('Wisdom')
    //         break
    //     case 'wisdom':
    //         navigation.navigate('Gospels')
    //         break
    //     case 'gospels':
    //         navigation.navigate('Epistles')
    //         break
    //     case 'epistles':
    //         navigation.navigate('Home')
    //         break
    // }
}

  return {
    bibleText,
    decrement,
    increment,
    incrementReadingCategory
  };
}
