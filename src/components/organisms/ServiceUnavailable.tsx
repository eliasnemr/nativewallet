import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {appLayout} from '../../styles';

const ServiceUnavailable = () => {
  return (
    <View style={appLayout.svna}>
      <Text style={appLayout.na503}>503</Text>
      <Text style={appLayout.na503s}>Service unavailable</Text>
      <Text style={appLayout.na}>
        Try checking the status of your Minima Node, enabling your rpc by typing
        `rpc enable:true` in the apk terminal or simply refreshing this page.
      </Text>
    </View>
  );
};

export default ServiceUnavailable;
