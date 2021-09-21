import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';

const primaryTeal = '#009688';
const accentOrange = '#ff9800';
const darkGrayBackground = '#37474f';
const almostBlackText = 'rgba(0,0,0,0.87)';

export default {
    light: {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      text: darkGrayBackground,
      primary: primaryTeal,
      accent: accentOrange,
    },
  },
  dark: {
    ...DarkTheme,
    roundness: 5,
    colors: {
      ...DarkTheme.colors,
      background: darkGrayBackground,
      primary: primaryTeal,
      accent: accentOrange,
    },
  }
};

