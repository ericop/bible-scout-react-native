/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
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

export type ReadingState = {
  lawAndProphets: { month: number, day: number },
  wisdom: { month: number, day: number },
  gospels: { month: number, day: number },
  epistles: { month: number, day: number }
}

export type GlobalState = {
    readingProgress: () => {
        getReadingProgress: (readingCategory: ReadingState) => { month: number, day: number },
        updateReadingProgress: (readingCategory: ReadingState, month: number, day: number) => void,
        incrementReadingByCategory: (readingCategory: ReadingState) => void,
        decrementReadingByCategory: (readingCategory: ReadingState) => void,
        nextReadingCategory: (readingCategory: ReadingState) => string
    }
  };