import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {callBalance} from '../../api/rpc-commands';
import {MinimaToken} from '../../types';
import BalanceSearchBar from '../atoms/BalanceSearchBar';
import BalanceTokenList from '../molecules/BalanceTokenList';

const Balance: FC = () => {
  const [balance, setBalance] = useState<MinimaToken[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useFocusEffect(
    React.useCallback(() => {
      setInterval(() => {
        callBalance()
          .then(data => {
            console.log(data);
            setBalance(data.response);
          })
          .catch(err => {
            console.log(`ERROR: ${err}`);
          });
      }, 20000);
      return () => {
        // setBalance([]);
      };
    }, []),
  );

  return (
    <>
      <BalanceSearchBar
        onChangeSearch={onChangeSearch}
        placeholder="Search for a token"
        searchQuery={searchQuery}
        mb={30}></BalanceSearchBar>
      <BalanceTokenList
        filter={searchQuery}
        balance={balance}></BalanceTokenList>
    </>
  );
};

export default Balance;
