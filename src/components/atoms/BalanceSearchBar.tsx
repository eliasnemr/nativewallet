import React, {FC, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {colorPalette} from '../../themes/themes';

const BalanceSearchBar: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  // Generate shadow according to Platform
  generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
  return (
    <Searchbar
      value={searchQuery}
      onChangeText={onChangeSearch}
      placeholder="Search Token"
      iconColor={colorPalette.colors.primary}
      style={[style.sb, style.sb.boxShadow]}
      inputStyle={style.sb.inputStyle}></Searchbar>
  );
};

export default BalanceSearchBar;

const style = StyleSheet.create({
  sb: {
    borderRadius: 8,
    marginBottom: 15,
    inputStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      fontSize: 14,
    },
    boxShadow: {},
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
});

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
    style.sb.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    style.sb.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};
