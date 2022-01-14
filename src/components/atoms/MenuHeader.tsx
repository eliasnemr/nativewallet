import React, {FC} from 'react';
import {Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuHeaderProps} from '../../types';

export const MenuHeader: FC<MenuHeaderProps> = props => {
  return (
    <SafeAreaView
      style={[
        {
          marginTop: props?.top ? props?.top : 0,
          marginLeft: props?.left ? props?.left : 0,
          marginRight: props?.right ? props?.right : 0,
          marginBottom: props?.bottom ? props?.bottom : 0,
        },
      ]}>
      <Title>{props.title ? props.title : ''}</Title>
    </SafeAreaView>
  );
};
