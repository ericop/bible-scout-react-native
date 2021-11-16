
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useReadingProgress() {
    type ReadingState = {
        "law-and-prophets": { month: number, day: number },
        wisdom: { month: number, day: number },
        gospels: { month: number, day: number },
        epistles: { month: number, day: number }
    }


    const getObjAsync = async (key: string) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key)
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          console.error('getObjAsync', e)
        }
      }

      const storeObjAsync = async (key: string, value: {}) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.error('storeObjAsync', e)
        }
      }

    const defaultReadingState: ReadingState = {
        "law-and-prophets": { month: 1, day: 1 },
        wisdom: { month: 1, day: 1 },
        gospels: { month: 1, day: 1 },
        epistles: { month: 1, day: 1 }
    }

    let initialReadingState = await getObjAsync('readingProgress') || defaultReadingState

    const [readingProgress, setReadingProgress] = useState<ReadingState>(initialReadingState)

    const getReadingProgress = (readingCategory: string) => {
        // TODO look into https://github.com/react-native-async-storage/async-storage/issues/32#issuecomment-798922343
        // or https://github.com/sampennington/use-async-storage/blob/master/src/index.ts
        // this is to tie the useHook to the AsyncStorage
        console.log('getReadingProgress', readingProgress)
        return readingProgress[readingCategory] // TODO limit to enum
    }
    const updateReadingProgress = (readingCategory: string, month: number, day: number) => {
        let progress = getReadingProgress(readingCategory)
        let updatedProgress = { ...progress,
            readingCategory : {month: month, day: day}
        }
        console.log('setReadingProgress', updatedProgress)
        storeObjAsync('readingProgress', updatedProgress)
        setReadingProgress(updatedProgress)
        return updatedProgress
    }

    const incrementReadingByCategory = (readingCategory: string) => {
        let progress = getReadingProgress(readingCategory)

        let {month: readingMonth, day: readingDay } = progress

        let shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
        let shouldStartNewYear = readingDay === 25 && readingMonth === 12

        if (shouldGoForwardAMonth) {
            readingMonth++
            readingDay = 1
        } else if (shouldStartNewYear) {
            readingDay = 1
            readingMonth = 1
        } else {
            readingDay++
        }
        //TODO re-save the reading month and day
    }
    const decrementReadingByCategory = (readingCategory: string) => {
        let progress = getReadingProgress(readingCategory)

        let {month: readingMonth, day: readingDay } = progress

        let shouldGoBackAMonth = readingDay === 1 && readingMonth > 1

        if (shouldGoBackAMonth) {
            readingMonth--
            readingDay = 25
        } else {
            readingDay--
        }
        //TODO re-save the reading month and day
    }
    const incrementToNextReadingCategory =  (readingCategory: string) => {
        //let readingCategory = m.route.get().split('/')[1]
        //incrementLocalStoreOnly()
    
            switch (readingCategory) {
                case 'law-and-prophets':
                    //m.route.set('/wisdom')
                    break
                case 'wisdom':
                // m.route.set('/gospels')
                    break
                case 'gospels':
                    //m.route.set('/epistles')
                    break
                case 'epistles':
                    //m.route.set('/home')
                    break
            }
        }

    return {
        getReadingProgress,
        updateReadingProgress,
        incrementReadingByCategory,
        decrementReadingByCategory,
        incrementToNextReadingCategory
    }
}