import React, {FC} from 'react';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuBackupButtonProps} from '../../types';
import {useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export const MenuBackupButton: FC<MenuBackupButtonProps> = props => {
  const {colors} = useTheme();
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
      <Button
        style={style.buttonStyle}
        labelStyle={style.buttonTextStyle}
        color={colors.primary}
        mode="contained"
        onPress={() => {
          console.log('Backing up wallet...');
        }}>
        Back up wallet
      </Button>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonTextStyle: {
    textTransform: 'none',
  },
});
