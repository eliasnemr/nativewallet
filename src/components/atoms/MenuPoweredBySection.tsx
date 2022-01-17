import React, {FC} from 'react';
import {Caption} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuPoweredBySectionProps} from '../../types';
import {Image, StyleSheet} from 'react-native';

export const MenuPoweredBySection: FC<MenuPoweredBySectionProps> = props => {
  return (
    <SafeAreaView
      style={{
        paddingStart: 20,
        paddingEnd: 20,
        flexDirection: 'row',
        marginTop: props?.top ? props?.top : 0,
        marginLeft: props?.left ? props?.left : 0,
        marginRight: props?.right ? props?.right : 0,
        marginBottom: props?.bottom ? props?.bottom : 0,
      }}>
      <Caption style={{flex: 2}}>Powered By</Caption>
      <Image
        style={style.image}
        source={require('../../assets/images/minima-landscape.png')}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {width: 120, height: 23, flex: 3},
});
