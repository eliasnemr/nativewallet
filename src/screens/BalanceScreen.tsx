import React, {FC} from 'react';
import {appLayout} from '../styles';
import {NavigationState} from '@react-navigation/native';
import {ImageBackground, useColorScheme} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BalanceSearchBar from '../components/atoms/BalanceSearchBar';
import Balance from '../components/organisms/Balance';

interface iProps {
  navigation: NavigationState;
}
const BalanceScreen: FC = () => {
  const scheme = useColorScheme();
  return (
    <ImageBackground
      source={
        scheme === 'dark'
          ? require('../assets/images/DM.jpg')
          : require('../assets/images/LM.jpg')
      }
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ScrollView style={appLayout.sv}>
        <BalanceSearchBar></BalanceSearchBar>
        <Balance></Balance>
      </ScrollView>
    </ImageBackground>
  );
};

export default BalanceScreen;
