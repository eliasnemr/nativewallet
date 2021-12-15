import React from 'react';
import {List} from 'react-native-paper';

export const StatusRow = props => {
  const data = props.data;
  const property = props.property;

  return (
    <List.Item
      title={property}
      description={data}
      titleNumberOfLines={1}
      descriptionNumberOfLines={1}
      titleEllipsizeMode="tail"
      descriptionEllipsizeMode="tail"></List.Item>
  );
};
