import React, {FC} from 'react';

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import Menu from '../components/organisms/Menu';
import BalanceScreen from '../screens/BalanceScreen';
import TokenTransferScreen from '../screens/TokenTransferScreen';
import ReceiveFundsScreen from '../screens/ReceiveFundsScreen';
import NodeStatusScreen from '../screens/NodeStatusScreen';
import CreateTokenScreen from '../screens/CreateTokenScreen';
import {useColorScheme} from 'react-native';
const Drawer = createDrawerNavigator();

const DrawerContent: FC<DrawerContentComponentProps> = props => {
  return (
    <Menu
      state={props.state}
      navigation={props.navigation}
      descriptors={props.descriptors}></Menu>
  );
};

export const RootNavigator = () => {
  const scheme = useColorScheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: scheme === 'dark' ? '#FFFFFF' : '#000000',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Balance" component={BalanceScreen} />
      <Drawer.Screen name="Status" component={NodeStatusScreen} />
      <Drawer.Screen name="Address" component={ReceiveFundsScreen} />
      <Drawer.Screen name="Send" component={TokenTransferScreen} />
      <Drawer.Screen name="Token" component={CreateTokenScreen} />
    </Drawer.Navigator>
  );
};
