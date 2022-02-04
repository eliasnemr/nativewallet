import React, {FC} from 'react';
import {BalanceTokenListProps, MinimaToken} from '../../types';
import BalanceToken from '../atoms/BalanceToken';
import {ActivityIndicator, List, Text} from 'react-native-paper';
import ServiceUnavailable from '../organisms/ServiceUnavailable';

const BalanceTokenList: FC<BalanceTokenListProps> = props => {
  const allBalance = props.balance;
  const searchQuery = props.filter;
  const loading = props.loading;
  const failed = props.failed;

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
      ) : !loading && failed ? (
        <ServiceUnavailable />
      ) : (
        <ActivityIndicator
          animating={true}
          color="#317AFF"
          style={{margin: 20}}
        />
      )}
    </List.Section>
  );
};

export default BalanceTokenList;
