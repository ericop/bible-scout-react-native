/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
          LawAndProphets: {
            screens: {
              LawAndProphetsScreen: 'LawAndProphets',
            },
          },
          Wisdom: {
            screens: {
              WisdomScreen: 'Wisdom',
            },
          },
          Gospels: {
            screens: {
              GospelsScreen: 'Gospels',
            },
          },
          Epistles: {
            screens: {
              EpistlesScreen: 'Epistles',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'Settings',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
