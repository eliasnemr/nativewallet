import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  configureFonts,
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
    accent: '#21252B',
  },
};
const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Manrope-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Manrope-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Manrope-Light',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Manrope-Bold',
      fontWeight: 'normal',
    },
    extraBold: {
      fontFamily: 'Manrope-ExtraBold',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Manrope-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Manrope-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Manrope-Light',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Manrope-Bold',
      fontWeight: 'normal',
    },
    extraBold: {
      fontFamily: 'Manrope-ExtraBold',
      fontWeight: 'normal',
    },
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
  fonts: configureFonts(fontConfig),
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
    color: '#363A3F',
    primary: '#317AFF',
    accent: '#f1c40f',
  },
  fonts: configureFonts(fontConfig),
};
