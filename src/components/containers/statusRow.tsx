import React from 'react';
import {List} from 'react-native-paper';
import {bStyles} from '../../styles';

export const StatusRow = props => {
  // console.log(props);
  const data = props.data;
  const property = props.property;
  const inner = props.inner;
  // console.log(`${property}: ${data}`);
  return (
    <List.Item
      title={property}
      description={data}
      titleNumberOfLines={1}
      descriptionNumberOfLines={1}
      titleStyle={bStyles.listTitle}
      descriptionStyle={bStyles.listDescription}
      style={inner ? bStyles.listItemInner : bStyles.listItem}
      titleEllipsizeMode="tail"
      descriptionEllipsizeMode="tail"></List.Item>
  );
};
