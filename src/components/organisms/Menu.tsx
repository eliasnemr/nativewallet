import TopPartMenuSection from '../molecules/TopPartMenuSection';
import BottomPartMenuSection from '../molecules/BottomPartMenuSection';
import React, {FC} from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';

const Menu: FC<DrawerContentComponentProps> = props => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
      }}>
      <TopPartMenuSection
        descriptors={props.descriptors}
        navigation={props.navigation}
        state={props.state}></TopPartMenuSection>
      <BottomPartMenuSection></BottomPartMenuSection>
    </ScrollView>
  );
};

export default Menu;
