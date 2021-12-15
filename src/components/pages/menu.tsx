import React, {useState} from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import {Balance, Status} from '../../types';
import {callBalance, callStatus} from '../../api/rpc-commands';
import {Button, Searchbar, Text} from 'react-native-paper';
import {TokenItem} from '../containers/tokens';
import {bStyles} from '../../styles';

const Drawer = createDrawerNavigator();

const DrawerContent = ({navigation}: any) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Drawer content</Text>
      <Button
        onPress={() => {
          navigation.navigate('Balance');
        }}>
        Navigate To Home
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Status');
        }}>
        Navigate To Status
      </Button>
    </View>
  );
};

const StatusScreen = () => {
  const [status, setStatus] = useState<Status>();

  useFocusEffect(
    React.useCallback(() => {
      console.log('Calling Status...');
      // load(logIt);
      // Do something when the screen is focused
      // setBalance(data);
      callStatus()
        .then(data => {
          //alert(JSON.stringify(data));
          if (data && data.response) {
            // console.log('Found status...');
            console.log(data.response);
            // setBalance(data.response);
          }
        })
        .catch(err => {
          console.log(err);
        });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>Change of text?</Text>
    </View>
  );
};

const TokenDetailScreen = ({route, navigation}) => {
  const {tokenName, icon, description} = route.params;
  return (
    <View>
      <Text>Token name: {tokenName}</Text>
      <Text>Token description: {description}</Text>
      <Text>Token icon: {icon}</Text>
    </View>
  );
};

const BalanceScreen = props => {
  const [balance, setBalance] = useState<Balance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  useFocusEffect(
    React.useCallback(() => {
      callBalance()
        .then(data => {
          console.log(data);
          setBalance(data.response);
        })
        .catch(err => {
          console.log(`ERROR: ${err}`);
        });
      return () => {
        // setBalance([]);
      };
    }, []),
  );

  return (
    <View style={bStyles.view}>
      <Searchbar
        style={bStyles.searchbar}
        inputStyle={bStyles.searchbar.inputStyle}
        placeholder="Search Token"
        onChangeText={onChangeSearch}
        value={searchQuery}></Searchbar>

      {balance ? (
        balance
          .filter(token =>
            searchQuery.length > 0
              ? token.tokenid.includes(searchQuery) ||
                (token.token &&
                  typeof token.token === 'string' &&
                  token.token.includes(searchQuery)) ||
                (token.token.name &&
                  typeof token.token.name === 'string' &&
                  token.token.name.includes(searchQuery))
              : true,
          )
          .map(t => (
            <TokenItem
              navigation={props.navigation}
              key={t.tokenid}
              token={t}></TokenItem>
          ))
      ) : (
        <Text>No Balance available</Text>
      )}
    </View>
  );
};

export const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Balance" component={BalanceScreen} />
      <Drawer.Screen name="Status" component={StatusScreen} />
      <Drawer.Screen name="TokenDetailScreen" component={TokenDetailScreen} />
    </Drawer.Navigator>
  );
};
