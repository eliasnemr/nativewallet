import React, {FC} from 'react';
import {Caption, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {MenuBalanceSectionProps} from '../../types';

export const MenuBalanceSection: FC<MenuBalanceSectionProps> = props => {
  return (
    <SafeAreaView
      style={[
        {
          paddingStart: 20,
          paddingEnd: 20,
          marginTop: props?.top ? props?.top : 0,
          marginLeft: props?.left ? props?.left : 0,
          marginRight: props?.right ? props?.right : 0,
          marginBottom: props?.bottom ? props?.bottom : 0,
        },
      ]}>
      <Caption style={style.caption}>Your Minima Balance</Caption>
      <Text style={style.text}>{props.minima}</Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  caption: {
    fontSize: 16,
    letterSpacing: 2,
  },
  text: {
    fontSize: 16,
    letter: 2,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});
