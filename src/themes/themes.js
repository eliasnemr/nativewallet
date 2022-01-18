import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

/**
 * Theming Objects
 */
export const colorPalette = {
  colors: {
    primary: '#317AFF',
    accent: '#f1c40f',
  },
};
export const darkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#000000',
    backgroundColor: '#000',
    color: '#fff',
    primary: '#317AFF',
    accent: '#f1c40f',
  },
};
export const lightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: '#fff',
    backgroundColor: '#fff',
    color: '000',
    primary: '#317AFF',
    accent: '#f1c40f',
  },
};
