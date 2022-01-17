import {View} from 'react-native';
import React, {FC, useState} from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {MenuNavigation} from '../atoms/MenuNavigation';
import {MenuHeader} from '../atoms/MenuHeader';
import {NavigationItems} from '../../objects/shared';

const TopPartMenuSection: FC<DrawerContentComponentProps> = props => {
  const [currentScreen, setCurrentScreen] = useState('Balance');

  function toggleNavigation(route: string) {
    props.navigation.navigate(route);
    setCurrentScreen(route);
  }

  return (
    <View>
      <MenuHeader
        title="Wallet"
        top={49}
        left={28}
        right={21.2}
        bottom={49}></MenuHeader>
      <MenuNavigation
        goto={toggleNavigation}
        currentState={currentScreen}
        navigationItems={NavigationItems}></MenuNavigation>
    </View>
  );
};

export default TopPartMenuSection;
