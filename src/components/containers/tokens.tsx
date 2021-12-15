import React from 'react';
import {List} from 'react-native-paper';
import {bStyles} from '../../styles';

function isToken(token) {
  return token.token &&
    typeof token.token === 'object' &&
    typeof token.token.name === 'string'
    ? token.token.name
    : token.token;
}
function hasDescription(token) {
  return token.token &&
    typeof token.token === 'object' &&
    typeof token.token.name === 'string'
    ? token.token.description
    : '';
}
function hasIcon(token) {
  return token.token &&
    typeof token.token === 'object' &&
    typeof token.token.icon === 'string'
    ? token.token.icon
    : 'folder';
}

export const TokenItem = props => {
  const tokenClicked = {
    tokenName: isToken(props.token),
    description: hasDescription(props.token),
    icon: hasIcon(props.token),
  };
  return (
    <List.Item
      style={bStyles.listItem}
      titleStyle={bStyles.listTitle}
      descriptionStyle={bStyles.listDescription}
      titleNumberOfLines={1}
      descriptionNumberOfLines={1}
      titleEllipsizeMode="tail"
      descriptionEllipsizeMode="tail"
      onPress={() => {
        props.navigation.navigate('TokenDetailScreen', tokenClicked);
      }}
      title={isToken(props.token)}
      description={props.token.confirmed}
      left={props => (
        <List.Icon
          {...props}
          style={bStyles.listIcon}
          icon="alpha-m-circle-outline"
        />
      )}
    />
  );
};
