import React, {FC, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

import BalanceScreen from '../screens/BalanceScreen';
import TokenTransferScreen from '../screens/TokenTransferScreen';

import {
  Button,
  List,
  Text,
  Card,
  Paragraph,
  Avatar,
  Divider,
} from 'react-native-paper';

import {Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Clipboard from '@react-native-clipboard/clipboard';
import Menu from '../components/organisms/Menu';
import ReceiveFundsScreen from '../screens/ReceiveFundsScreen';
import NodeStatusScreen from '../screens/NodeStatusScreen';
import CreateTokenScreen from '../screens/CreateTokenScreen';
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
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Balance" component={BalanceScreen} />
      <Drawer.Screen name="Status" component={NodeStatusScreen} />
      <Drawer.Screen name="Address" component={ReceiveFundsScreen} />
      <Drawer.Screen name="Send" component={TokenTransferScreen} />
      <Drawer.Screen name="Token" component={CreateTokenScreen} />
      <Drawer.Screen name="TokenDetailScreen" component={TokenDetailScreen} />
    </Drawer.Navigator>
  );
};

const CreateTokenScreen_Old = () => {
  const {control, setFocus, handleSubmit, reset} = useForm({
    defaultValues: {
      name: '',
      amount: '',
      description: '',
      icon: '',
    },
    mode: 'onChange',
  });

  const [btnText, setBtnText] = useState('Create Token');

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'name',

              rules: {
                required: {
                  value: true,
                  message: 'A token name is required.',
                },
              },
              textInputProps: {
                label: 'Name',
              },
            },
            {
              type: 'text',
              name: 'amount',

              rules: {
                required: {
                  value: true,
                  message: 'Amount is required',
                },
              },
              textInputProps: {
                label: 'Amount',
              },
            },
            {
              type: 'text',
              name: 'description',
              rules: {
                required: {
                  value: false,
                  message: '',
                },
              },
              textInputProps: {
                label: 'Description',
              },
            },
            {
              type: 'text',
              name: 'icon',
              rules: {
                required: {
                  value: false,
                  message: '',
                },
              },
              textInputProps: {
                label: 'Icon',
              },
            },
          ]}
        />
        <Button
          mode={'contained'}
          disabled={btnText !== 'Create Token' ? true : false}
          onPress={handleSubmit((data: any) => {
            setBtnText('Minting...');

            const customToken = {
              name: {
                name: data.name,
                description: data.description,
                icon: data.icon,
              },
              amount: data.amount,
            };

            tokencreate(customToken)
              .then(res => {
                if (res.status) {
                  Alert.alert('Transaction successful!');

                  setBtnText('Create Token');

                  reset(); // reset form?
                } else {
                  throw new Error(res.message);
                }
                console.log(res);
              })
              .catch(err => {
                setBtnText('Failed.');
                Alert.alert(`${err}`);
                setTimeout(() => {
                  setBtnText('Create Token');
                }, 2000);
              });
            console.log('form data', data);
          })}>
          {btnText}
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start',
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
});

const TokenDetailScreen = ({route}) => {
  const tokenSelectedDetails = route.params;
  const [copyIcon, setCopyIcon] = useState('clipboard');

  function isToken(token) {
    return token.token &&
      typeof token.token === 'object' &&
      typeof token.token.name === 'string'
      ? token.token.name
      : token.token;
  }
  const copyToClipboard = data => {
    try {
      setCopyIcon('check-outline');
      Clipboard.setString(data);
      setTimeout(() => {
        setCopyIcon('clipboard');
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setCopyIcon('clipboard');
      }, 1000);
      Alert.alert(err);
    }
  };

  return (
    <ScrollView>
      <View style={tokenStyle.view}>
        {tokenSelectedDetails.tokenid === '0x00' ? (
          <Image
            style={{
              padding: 0,
              height: 114,
              width: 125,
              alignSelf: 'center',
              margin: 14,
              marginBottom: 0,
            }}
            source={require('../assets/images/icon.png')}
          />
        ) : (
          <Avatar.Image
            style={{
              alignSelf: 'center',
              margin: 14,
              marginBottom: 0,
            }}
            size={112}
            source={{
              uri: tokenSelectedDetails.token.icon
                ? tokenSelectedDetails.token.icon
                : '../assets/images/icon.png',
            }}
          />
        )}

        <Card.Title
          title={isToken(tokenSelectedDetails)}
          titleStyle={tokenStyle.tokenTitle}></Card.Title>

        <View style={{marginLeft: 14, marginRight: 14}}>
          <Divider />
        </View>

        <Card.Content>
          {tokenSelectedDetails.token.description ? (
            <Paragraph numberOfLines={5} style={{textAlign: 'left'}}>
              {tokenSelectedDetails.token.description}
            </Paragraph>
          ) : null}
          {tokenSelectedDetails.tokenid === '0x00' ? (
            <Paragraph style={{textAlign: 'center'}}>
              Minima's Official Token
            </Paragraph>
          ) : null}
        </Card.Content>
      </View>

      <View style={tokenStyle.view}>
        <List.Item
          title="Name"
          description={isToken(tokenSelectedDetails)}
          descriptionStyle={tokenStyle.listDescription}
          titleStyle={tokenStyle.listTitle}
          descriptionNumberOfLines={2}
          descriptionEllipsizeMode="tail"></List.Item>
        <List.Item
          title="Token ID"
          description={() => {
            return (
              <View
                style={[
                  tokenStyle.listDescriptionCopy,
                  tokenStyle.listDescription,
                ]}>
                <Text style={tokenStyle.listDescriptionCopyText}>
                  {tokenSelectedDetails.tokenid}
                </Text>

                <Button
                  onPress={() => {
                    copyToClipboard(tokenSelectedDetails.tokenid);
                  }}
                  color="#fff"
                  icon={copyIcon}
                  style={tokenStyle.listDescriptionCopyBtn}></Button>
              </View>
            );
          }}
          descriptionStyle={tokenStyle.listDescription}
          titleStyle={tokenStyle.listTitle}
          descriptionNumberOfLines={2}
          descriptionEllipsizeMode="middle"></List.Item>
        <List.Item
          title="Total Amount Minted"
          description={tokenSelectedDetails.total}
          descriptionStyle={tokenStyle.listDescription}
          titleStyle={tokenStyle.listTitle}
          descriptionNumberOfLines={2}
          descriptionEllipsizeMode="middle"></List.Item>
      </View>

      <View style={tokenStyle.view}>
        <List.Item
          title="Confirmed Amount"
          description={tokenSelectedDetails.confirmed}
          descriptionStyle={tokenStyle.listDescription}
          titleStyle={tokenStyle.listTitle}
          descriptionNumberOfLines={2}
          descriptionEllipsizeMode="tail"></List.Item>
        <List.Item
          title="Unconfirmed Amount"
          description={tokenSelectedDetails.unconfirmed}
          descriptionStyle={tokenStyle.listDescription}
          titleStyle={tokenStyle.listTitle}
          descriptionNumberOfLines={2}
          descriptionEllipsizeMode="tail"></List.Item>
      </View>
    </ScrollView>
  );
};
