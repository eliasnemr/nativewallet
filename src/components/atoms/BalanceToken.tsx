import React, {FC} from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {BalanceTokenProps} from '../../types';

const BalanceToken: FC<BalanceTokenProps> = props => {
  //box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit;
  //box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  generateBoxShadowStyle(
    0,
    4,
    'rgba(0, 0, 0, 0.1)',
    0.2,
    3,
    4,
    'rgba(0, 0, 0, 0.1)',
  );

  return (
    <List.Item
      key={props.t.tokenid}
      title={props.t.token.name ? props.t.token.name : props.t.token}
      description={props.t.confirmed}
      left={() => {
        return (
          <Image
            style={style.leftIcon}
            source={
              props.t.token.icon && props.t.token.icon.length > 0
                ? {uri: props.t.token.icon}
                : require('../../assets/images/icon.png')
            }
          />
        );
      }}
      style={[style.li, styles.boxShadow]}
      titleStyle={style.title}
      descriptionStyle={style.description}
      titleNumberOfLines={1}
      descriptionNumberOfLines={1}
      titleEllipsizeMode="tail"
      descriptionEllipsizeMode="tail"></List.Item>
  );
};

export default BalanceToken;

const style = StyleSheet.create({
  li: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 16,
    minHeight: 82,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontWeight: '700',
    lineHeight: 15,
    fontSize: 14,
  },
  leftIcon: {
    borderRadius: 6,
    height: 50,
    width: 50,
    maxWidth: 50,
    maxHeight: 50,
    marginRight: 5,
    paddingRight: 0,
  },
  description: {fontWeight: '400', fontSize: 16},
});

/** using a non-Stylesheet as a quickfix to a readonly property for styles in generic StyleSheet */
const styles = {
  boxShadow: {},
};

/** BoxShadow both iOS & Android */
const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};
