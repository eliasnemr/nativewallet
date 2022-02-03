import React, {FC} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {colorPalette} from '../../themes/themes';
import {BalanceSearchBarProps} from '../../types';

const BalanceSearchBar: FC<BalanceSearchBarProps> = props => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const onChangeSearch = (query: string) => setSearchQuery(query);
  // Generate shadow according to Platform
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
    <Searchbar
      value={props.searchQuery}
      onChangeText={props.onChangeSearch}
      placeholder={props.placeholder}
      iconColor={colorPalette.colors.primary}
      style={[style.sb, styles.boxShadow, {marginBottom: props.mb}]}
      inputStyle={style.sb.inputStyle}></Searchbar>
  );
};

export default BalanceSearchBar;

const style = StyleSheet.create({
  sb: {
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    inputStyle: {
      backgroundColor: 'transparent',
      fontSize: 14,
    },
    boxShadow: {},
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
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
