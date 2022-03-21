import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './constants/Colors';
import Theme from './constants/Themes';
import globalState from './hooks/globalState';
import useReadingProgress from './hooks/useReadingProgress';
import { GlobalState, ReadingProgress } from './types';

export default function App() {
  globalState.readingState = useReadingProgress() as ReadingProgress;

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
<PaperProvider theme={colorScheme === 'dark'? Theme.dark : Theme.light}>
  <SafeAreaProvider>
  <Navigation colorScheme={colorScheme} />
  <StatusBar />
  </SafeAreaProvider>
</PaperProvider>
    );
  }
};

