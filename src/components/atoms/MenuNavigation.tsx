import React, {FC} from 'react';
import {Menu} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuNavigationProps} from '../../types';

export const MenuNavigation: FC<MenuNavigationProps> = props => {
  console.log(props);
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
      {props.navigationItems.map((n, index) => {
        return (
          <Menu.Item
            key={index}
            title={n.title}
            onPress={() => {
              console.log(n.path);
            }}></Menu.Item>
        );
      })}

      {/* props.navigation.map()
      <Menu.Item icon={props?.icon} onPress={() => {}} title=""></Menu.Item> */}
    </SafeAreaView>
  );
};
