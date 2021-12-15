/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';

// Wrapping react-native-paper as a top level component.
// If there is another provider (like redux)
/**
  If you have another provider (such as Redux), wrap it outside PaperProvider so that 
  the context is available to components rendered inside a Modal from the library:
 */
export default function Main() {
  return (
    <PaperProvider>
      <SelectProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </SelectProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
