import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {callBalance} from '../../api/rpc-commands';
import {MinimaToken} from '../../types';
import BalanceSearchBar from '../atoms/BalanceSearchBar';
import BalanceTokenList from '../molecules/BalanceTokenList';
import ServiceUnavailable from './ServiceUnavailable';

const Balance: FC = () => {
  const [balance, setBalance] = useState<MinimaToken[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [loading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      callBalance()
        .then(data => {
          setBalance(data.response);
          setLoading(false);
        })
        .catch(err => {
          console.log(`ERROR: ${err}`);
          setLoading(false);
          setFailed(true);
        });
      return () => {
        // setBalance([]);
      };
    }, []),
  );

  return (
    <>
      {balance ? (
        <>
          <BalanceSearchBar
            onChangeSearch={onChangeSearch}
            placeholder="Search for a token"
            searchQuery={searchQuery}
            mb={30}></BalanceSearchBar>
          <BalanceTokenList
            loading={loading}
            failed={failed}
            filter={searchQuery}
            balance={balance}></BalanceTokenList>
        </>
      ) : !loading && failed ? (
        <ActivityIndicator
          animating={true}
          color="#317AFF"
          style={{margin: 20}}
        />
      ) : (
        <ServiceUnavailable />
      )}
    </>
  );
};

export default Balance;
