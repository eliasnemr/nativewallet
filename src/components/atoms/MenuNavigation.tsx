import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {List, RadioButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuNavigationProps} from '../../types';

export const MenuNavigation: FC<MenuNavigationProps> = props => {
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
      {props.navigationItems.map((n, index) => {
        if (n.path === props.currentState) {
          n.active = true;
        } else {
          n.active = false;
        }

        return (
          <List.Item
            style={[
              style.list,
              n.active ? {borderBottomColor: '#317AFF'} : null,
            ]}
            left={() => {
              return (
                <RadioButton
                  color="#317AFF"
                  value={n.title}
                  status={n.active ? 'checked' : 'unchecked'}
                  onPress={() => {
                    props.goto(n.path);
                  }}
                />
              );
            }}
            key={index}
            title={n.title}
            onPress={() => {
              props.goto(n.path);
            }}></List.Item>
        );
      })}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  list: {
    paddingStart: 0,
    borderBottomColor: '#D3D3D8',
    borderBottomWidth: 1,
  },
});
