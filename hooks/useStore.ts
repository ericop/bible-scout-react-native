import create from "zustand"
import { CategoryProgress, ReadingCategory, ReadingProgress, ReadingState } from "../types"
import useStoredState from './useAsyncStorage'
import { persist } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'

// const useStore = create<ReadingProgress>((set, get) => ({
const useStore = create(persist(
  (set, get) => ({
    readingState: {
      lawAndProphets: { month: 1, day: 1 },
      wisdom: { month: 1, day: 1 },
      gospels: { month: 1, day: 1 },
      epistles: { month: 1, day: 1 }
    },

    getReadingProgress: (readingCategory: ReadingCategory) => {
      console.log('get().readingState', get().readingState)
      return get().readingState[readingCategory] // TODO limit to enum
    },

    updateReadingProgress: (readingCategory: ReadingCategory, month: number, day: number) => {
      const progress = get().readingState // all categories
      // immutable pattern with spread object operator
      const updatedProgress = {
        ...progress as unknown as ReadingState,
        [readingCategory]: { month: month, day: day }
      }
      console.log('updateReadingProgress => setReadingProgress', progress, updatedProgress)
      set(state => ({ readingState: updatedProgress }))
    },

    incrementReadingByCategory: (readingCategory: ReadingCategory) => {
      const progress = get().getReadingProgress(readingCategory)

      let { month: readingMonth, day: readingDay } = progress

      const shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
      const shouldStartNewYear = readingDay === 25 && readingMonth === 12

      if (shouldGoForwardAMonth) {
        readingMonth++
        readingDay = 1
      } else if (shouldStartNewYear) {
        readingDay = 1
        readingMonth = 1
      } else {
        readingDay++
      }
      console.log('incrementReadingByCategory', readingCategory, readingMonth, readingDay)
      get().updateReadingProgress(readingCategory, readingMonth, readingDay)
    },

    decrementReadingByCategory: (readingCategory: ReadingCategory) => {
      const progress = get().getReadingProgress(readingCategory)

      let { month: readingMonth, day: readingDay } = progress

      const shouldGoBackAMonth = readingDay === 1 && readingMonth > 1

      if (shouldGoBackAMonth) {
        readingMonth--
        readingDay = 25
      } else {
        readingDay--
      }
      get().updateReadingProgress(readingCategory, readingMonth, readingDay)
    },

    nextReadingCategory: (readingCategory: string): string => {
      switch (readingCategory) {
        case ReadingCategory.LawAndProphets:
          return 'Wisdom'
        case ReadingCategory.Wisdom:
          return 'Gospels'
        case ReadingCategory.Gospels:
          return 'Epistles'
        case ReadingCategory.Epistles:
        default:
          return 'Home'
      }
    },

    _hasHydrated: false,
    setHasHydrated: state => {
      set({ _hasHydrated: state });
    }
  }),
  {
    name: 'bibleScoutReadingProgress',
    getStorage: () => AsyncStorage,
    onRehydrateStorage: () => state => state.setHasHydrated(true)
  }
))

export default useStore