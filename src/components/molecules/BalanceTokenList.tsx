import React, {FC} from 'react';
import {BalanceTokenListProps, MinimaToken} from '../../types';
import BalanceToken from '../atoms/BalanceToken';
import {List, Text} from 'react-native-paper';

const BalanceTokenList: FC<BalanceTokenListProps> = props => {
  const allBalance = props.balance;
  const searchQuery = props.filter;

  return (
    <List.Section>
      {allBalance && allBalance.length > 0 ? (
        allBalance
          .filter((token: MinimaToken) =>
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
          .map((tok: MinimaToken) => (
            <BalanceToken t={tok} key={tok.tokenid}></BalanceToken>
          ))
      ) : (
        <Text>
          No balance available, please check the status of your Minima Node or
          enable your rpc by typing `rpc enable:true` in the apk terminal.
        </Text>
      )}
    </List.Section>
  );
};

export default BalanceTokenList;
