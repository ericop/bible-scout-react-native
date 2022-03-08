
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useStoredState from './useAsyncStorage'

export default function useReadingProgress() {
    enum ReadingCategory {
        lawAndProphets = 'lawAndProphets',
        wisdom = 'wisdom',
        gospels = 'gospels',
        epistles = 'epistles'
    }
    type ReadingState = {
        lawAndProphets: { month: number, day: number },
        wisdom: { month: number, day: number },
        gospels: { month: number, day: number },
        epistles: { month: number, day: number }
    }

    const defaultReadingState: ReadingState = {
        lawAndProphets: { month: 1, day: 1 },
        wisdom: { month: 1, day: 1 },
        gospels: { month: 1, day: 1 },
        epistles: { month: 1, day: 1 }
    }

    const [readingProgress, setReadingProgress, synced] = useStoredState("readingProgress", defaultReadingState)

    const getReadingProgress = (readingCategory: ReadingCategory) => {
        // TODO look into https://github.com/react-native-async-storage/async-storage/issues/32#issuecomment-798922343
        // or https://github.com/sampennington/use-async-storage/blob/master/src/index.ts
        // this is to tie the useHook to the AsyncStorage
        console.log('getReadingProgress', readingProgress)
        return readingProgress[readingCategory] // TODO limit to enum
    }
    const updateReadingProgress = (readingCategory: ReadingCategory, month: number, day: number) => {
        let progress = readingProgress // all categories
        let updatedProgress = { ...progress as unknown as ReadingState,
            [readingCategory] : {month: month, day: day}
        }
        console.log('setReadingProgress', updatedProgress)
        setReadingProgress(updatedProgress)
        //return updatedProgress
    }

    const incrementReadingByCategory = (readingCategory: ReadingCategory) => {
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
        updateReadingProgress(readingCategory, readingMonth, readingDay)
    }
    const decrementReadingByCategory = (readingCategory: ReadingCategory) => {
        let progress = getReadingProgress(readingCategory)

        let { month: readingMonth, day: readingDay } = progress

        let shouldGoBackAMonth = readingDay === 1 && readingMonth > 1

        if (shouldGoBackAMonth) {
            readingMonth--
            readingDay = 25
        } else {
            readingDay--
        }
        updateReadingProgress(readingCategory, readingMonth, readingDay)
    }
    const nextReadingCategory =  (readingCategory: ReadingCategory) : string =>  {
        switch (readingCategory) {
            case ReadingCategory.lawAndProphets:
                return 'Wisdom'
            case ReadingCategory.wisdom:
                return 'Gospels'
            case ReadingCategory.gospels:
                return 'Epistles'
            case ReadingCategory.epistles:
                return 'Home'
        }
    }

    return {
        readingProgress,
        getReadingProgress,
        updateReadingProgress,
        incrementReadingByCategory,
        decrementReadingByCategory,
        nextReadingCategory
    }
}