import React, {FC} from 'react';
import {Caption} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuPoweredBySectionProps} from '../../types';
import {Image, StyleSheet} from 'react-native';

export const MenuPoweredBySection: FC<MenuPoweredBySectionProps> = props => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',

        paddingStart: 20,
        paddingEnd: 20,
        marginTop: props?.top ? props?.top : 0,
        marginLeft: props?.left ? props?.left : 0,
        marginRight: props?.right ? props?.right : 0,
        marginBottom: props?.bottom ? props?.bottom : 0,
      }}>
      <Caption>Powered By</Caption>
      <Image
        style={style.image}
        source={require('../../assets/images/icon.png')}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {maxWidth: 70, maxHeight: 60},
});
