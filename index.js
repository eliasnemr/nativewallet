/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {name as appName} from './app.json';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';
import {useColorScheme} from 'react-native';

// Wrapping react-native-paper as a top level component.
// If there is another provider (like redux)
/**
  If you have another provider (such as Redux), wrap it outside PaperProvider so that 
  the context is available to components rendered inside a Modal from the library:
 */
const darkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#000000',
    backgroundColor: '#000',
    color: '#fff',
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: '#fff',
    backgroundColor: '#fff',
    color: '000',
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function Main() {
  const scheme = useColorScheme();
  console.log('User has ' + scheme + ' theme on.');
  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : theme}>
      <SelectProvider>
        <NavigationContainer theme={scheme === 'dark' ? darkTheme : theme}>
          <App />
        </NavigationContainer>
      </SelectProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
