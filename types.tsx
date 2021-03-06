/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  LawAndProphets: undefined;
  Wisdom: undefined;
  Gospels: undefined;
  Epistles: undefined;
  Settings: undefined;
};

// should enable normal routes and modal
export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// export enum ReadingCategory {
//   LawAndProphets = 'lawAndProphets',
//   Wisdom = 'wisdom',
//   Gospels = 'gospels',
//   Epistles = 'epistles'
// }

export const ReadingCategory = {
  LawAndProphets : 'lawAndProphets',
  Wisdom : 'wisdom',
  Gospels : 'gospels',
  Epistles : 'epistles'
} as const;

export type CategoryProgress = { month: number, day: number }

export type ReadingState = {
  lawAndProphets: CategoryProgress,
  wisdom: CategoryProgress,
  gospels: CategoryProgress,
  epistles: CategoryProgress
}

export type ReadingProgress = {
  readingProgress: ReadingState
  getReadingProgress: (readingCategory: ReadingState) => CategoryProgress,
  updateReadingProgress: (readingCategory: ReadingState, month: number, day: number) => void,
  incrementReadingByCategory: (readingCategory: ReadingState) => void,
  decrementReadingByCategory: (readingCategory: ReadingState) => void,
  nextReadingCategory: (readingCategory: ReadingState) => string
}

export type GlobalState = {
  readingState: ReadingProgress
};

export type BibleTextVerse = {
  book: string,
  chapter: string,
  verse: string,
  text: string
}