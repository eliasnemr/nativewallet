import React, {FC, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {NavigationState, useFocusEffect} from '@react-navigation/native';
import {Balance, Status} from '../types';
import {
  callAddress,
  callBalance,
  callStatus,
  tokencreate,
  send,
} from '../api/rpc-commands';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

import {
  Button,
  List,
  Searchbar,
  Text,
  Card,
  Paragraph,
  Avatar,
  Divider,
} from 'react-native-paper';

import {TokenItem} from './tokens';
import {bStyles, tokenStyle} from '../styles';
import {Alert} from 'react-native';
import {StatusRow} from './statusRow';
import {ScrollView} from 'react-native-gesture-handler';
import {MenuHeader} from './atoms/MenuHeader';
import {MenuNavigation} from './atoms/MenuNavigation';

import {NavigationItem} from '../types';
import {MenuBalanceSection} from './atoms/MenuBalanceSection';
import {MenuBackupButton} from './atoms/MenuBackupButton';
import {MenuPoweredBySection} from './atoms/MenuPoweredBySection';
const Drawer = createDrawerNavigator();

const NavigationItems: NavigationItem[] = [
  {
    title: 'Balance',
    path: 'Balance',
    active: true,
  },
  {
    title: 'Send',
    path: 'Send',
    active: false,
  },
  {
    title: 'Receive',
    path: 'Address',
    active: false,
  },
  {
    title: 'Status',
    path: 'Status',
    active: false,
  },
  {
    title: 'Token',
    path: 'Token',
    active: false,
  },
];

const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const [currentScreen, setCurrentScreen] = useState('Balance');
  function toggleNavigation(route: string) {
    props.navigation.navigate(route);
    setCurrentScreen(route);
  }
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <View>
        <MenuHeader
          title="Wallet"
          top={49}
          left={28}
          right={21.2}
          bottom={49}></MenuHeader>
        <MenuNavigation
          goto={toggleNavigation}
          currentState={currentScreen}
          navigationItems={NavigationItems}></MenuNavigation>
      </View>
      <View style={{justifyContent: 'space-evenly', flex: 1}}>
        <MenuBalanceSection minima="99"></MenuBalanceSection>
        <MenuBackupButton></MenuBackupButton>
        <MenuPoweredBySection></MenuPoweredBySection>
      </View>
    </ScrollView>
  );
};

const CreateTokenScreen = () => {
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

const SendScreen = () => {
  // const [address, setAddress] = useState('');
  // const [amount, setAmount] = useState('');
  // const [tokenid, setTokenid] = useState('');
  const [balance, setBalance] = useState([]);
  const [btnText, setBtnText] = useState('Send');

  const {control, setFocus, handleSubmit, reset} = useForm({
    defaultValues: {
      tokenid: '',
      address: '',
      amount: '',
    },
    mode: 'onChange',
  });

  useFocusEffect(
    React.useCallback(() => {
      callBalance()
        .then(data => {
          // console.log(data);
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

  const tokens = balance.map((t: Balance) => {
    return {
      value: t.tokenid,
      label: typeof t.token === 'string' ? t.token : t.token.name,
    };
  });

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'select',
              name: 'tokenid',

              rules: {
                required: {
                  value: true,
                  message: 'A token must be selected',
                },
              },
              textInputProps: {
                label: 'Token',
              },
              options: tokens,
            },
            {
              type: 'text',
              name: 'address',

              rules: {
                required: {
                  value: true,
                  message: 'Address is required',
                },
              },
              textInputProps: {
                label: 'Address',
              },
            },
            {
              type: 'text',
              name: 'amount',
              rules: {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              },
              textInputProps: {
                label: 'Amount',
              },
            },
          ]}
        />
        <Button
          mode={'contained'}
          disabled={btnText !== 'Send' ? true : false}
          onPress={handleSubmit((data: any) => {
            console.log('form data', data);
            setBtnText('Creating Transaction...');

            send(data)
              .then(res => {
                if (res.status) {
                  setBtnText('Send');
                  Alert.alert('Transaction successful!');
                  reset(); // reset form?
                } else {
                  throw new Error(res.message);
                }
                console.log(res);
              })
              .catch(err => {
                setBtnText('Failed');
                Alert.alert(`${err}`);
                setTimeout(() => {
                  setBtnText('Send');
                }, 2000);
              });
          })}>
          {btnText}
        </Button>
      </ScrollView>
    </View>
  );
  /**
   * Old Form
   * <View style={bStyles.view}>
      <Select
        selectControlStyle={bStyles.selectItem}
        optionStyle={bStyles.selectOption}
        placeholderText="Select a token"
        onSelect={token => {
          setTokenid(token.value);
        }}
        options={tokens}
      />
      <TextInput
        style={bStyles.listItem}
        label="Address"
        value={address}
        onChangeText={text => setAddress(text)}></TextInput>
      <TextInput
        style={bStyles.listItem}
        label="Amount"
        value={amount}
        onChangeText={text => setAmount(text)}></TextInput>

      <Button onPress={() => handleSubmit()}>Send</Button>
    </View>
   */
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

const AddressScreen = () => {
  const [address, setAddress] = useState('');
  const [copyText, setCopyText] = useState('Copy');

  useFocusEffect(
    React.useCallback(() => {
      callAddress()
        .then(data => {
          if (data && data.response) {
            setAddress(data.response.address);
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

  const copyToClipboard = data => {
    try {
      setCopyText('Copied');
      Clipboard.setString(data);
      setTimeout(() => {
        setCopyText('Copy');
      }, 1000);
    } catch (err) {
      setCopyText('Failed');
      setTimeout(() => {
        setCopyText('Copy');
      }, 1000);
      Alert.alert(err);
    }
  };

  return (
    <View style={bStyles.view}>
      <List.Section style={bStyles.listItem}>
        <List.Item
          title={address ? address : 'No address available'}
          description={'Use this address to receive coins.'}
          titleStyle={bStyles.listTitle}
          titleEllipsizeMode="middle"
          right={props => (
            <Button
              uppercase={false}
              accessibilityLabel="Copy to clipboard"
              compact={true}
              onPress={() => {
                copyToClipboard(address);
              }}>
              {copyText}
            </Button>
          )}></List.Item>
      </List.Section>
    </View>
  );
};

const StatusScreen = () => {
  const [status, setStatus] = useState<Status | null>(null);

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  useFocusEffect(
    React.useCallback(() => {
      callStatus()
        .then(data => {
          if (data && data.response) {
            console.log(data.response);
            setStatus(data.response);
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
    <ScrollView style={bStyles.view}>
      <List.Section
        title={status?.version ? 'Minima v' + status?.version : 'Offline'}>
        <StatusRow data={status?.devices} property={'Devices'}></StatusRow>
        <StatusRow data={status?.length} property={'Length'}></StatusRow>
        <StatusRow data={status?.weight} property={'Weight'}></StatusRow>
        <StatusRow
          data={status?.minima}
          property={'Total Supply of Minima'}></StatusRow>
        <StatusRow
          data={status?.coins}
          property={'Total coins in MMR Database'}></StatusRow>
        <StatusRow data={status?.data} property={'Storage path'}></StatusRow>
        <List.Accordion
          style={bStyles.listItem}
          title="Memory"
          left={props => <List.Icon {...props} icon="folder" />}>
          <StatusRow
            data={status?.memory.disk}
            property={'Disk Usage'}></StatusRow>
          <StatusRow
            data={status?.memory.ram}
            property={'Ram Usage'}></StatusRow>
          <List.Accordion
            style={bStyles.listItemInner}
            title="Files"
            left={props => <List.Icon {...props} icon="folder" />}>
            <StatusRow
              inner={true}
              data={status?.memory.files.txpowdb}
              property={'TxPoW DB'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.memory.files.archivedb}
              property={'Archive DB'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.memory.files.cascade}
              property={'Cascade'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.memory.files.chaintree}
              property={'Chaintree'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.memory.files.wallet}
              property={'Wallet'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.memory.files.userdb}
              property={'User DB'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.memory.files.p2pdb}
              property={'P2P DB'}></StatusRow>
          </List.Accordion>
        </List.Accordion>
        <List.Accordion
          style={bStyles.listItem}
          title="Chain"
          left={props => <List.Icon {...props} icon="folder" />}>
          <StatusRow
            data={status?.chain.block}
            property={'Block Height'}></StatusRow>
          <StatusRow
            data={status?.chain.time}
            property={'Local time'}></StatusRow>
          <StatusRow
            data={status?.chain.hash}
            property={'Block Hash'}></StatusRow>
          <StatusRow
            data={status?.chain.difficulty}
            property={'Difficulty'}></StatusRow>
          <StatusRow data={status?.chain.size} property={'Size'}></StatusRow>
          <StatusRow
            data={status?.chain.length}
            property={'Length'}></StatusRow>
          <StatusRow
            data={status?.chain.weight}
            property={'Weight'}></StatusRow>
          <StatusRow
            data={status?.chain.branches}
            property={'Branches'}></StatusRow>
          <List.Accordion
            style={bStyles.listItemInner}
            title="Cascade"
            left={props => <List.Icon {...props} icon="folder" />}>
            <StatusRow
              inner={true}
              data={status?.chain.cascade.start}
              property={'Start'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.chain.cascade.length}
              property={'Length'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.chain.cascade.weight}
              property={'Weight'}></StatusRow>
          </List.Accordion>
        </List.Accordion>
        <List.Accordion
          style={bStyles.listItem}
          title="TxPoW"
          left={props => <List.Icon {...props} icon="folder" />}>
          <StatusRow
            data={status?.txpow.mempool}
            property={'Mempool'}></StatusRow>
          <StatusRow data={status?.txpow.ramdb} property={'Ram DB'}></StatusRow>
          <StatusRow
            data={status?.txpow.txpowdb}
            property={'TxPoW DB'}></StatusRow>
          <StatusRow
            data={status?.txpow.archivedb}
            property={'Archive DB'}></StatusRow>
        </List.Accordion>
        <List.Accordion
          style={bStyles.listItem}
          title="Network"
          left={props => <List.Icon {...props} icon="folder" />}>
          <StatusRow data={status?.network.host} property={'Host'}></StatusRow>
          <StatusRow
            data={status?.network.hostset ? 'True' : 'False'}
            property={'Host Set'}></StatusRow>
          <StatusRow
            data={status?.network.port}
            property={'Host Port'}></StatusRow>
          <StatusRow
            data={
              status?.network.connecting ? status?.network.connecting : 'None'
            }
            property={'Connecting'}></StatusRow>
          <StatusRow
            data={
              status?.network.connected ? status?.network.connected : 'None'
            }
            property={'Connected'}></StatusRow>
          <StatusRow
            data={status?.network.rpc ? 'Enabled' : 'Disabled'}
            property={'RPC Access'}></StatusRow>
          <StatusRow
            data={status?.network.p2p ? 'Enabled' : 'Disabled'}
            property={'P2P Status'}></StatusRow>

          <List.Accordion
            style={bStyles.listItemInner}
            title="P2P"
            left={props => <List.Icon {...props} icon="folder" />}>
            <StatusRow
              inner={true}
              data={status?.network.p2p.address}
              property={'Address'}></StatusRow>
            <StatusRow
              inner={true}
              data={status?.network.p2p.isAcceptingInLinks ? 'True' : 'False'}
              property={'AcceptingInLinks'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.numInLinks
                  ? status?.network.p2p.numInLinks
                  : '0'
              }
              property={'Number of inLinks'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.numOutLinks
                  ? status?.network.p2p.numOutLinks
                  : '0'
              }
              property={'Number of outLinks'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.numNotAcceptingConnP2PLinks
                  ? status?.network.p2p.numNotAcceptingConnP2PLinks
                  : '0'
              }
              property={'Number not accepting P2P Links'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.numNoneP2PLinks
                  ? status?.network.p2p.numNoneP2PLinks
                  : '0'
              }
              property={'None P2P Links'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.numKnownPeers
                  ? status?.network.p2p.numKnownPeers
                  : '0'
              }
              property={'Number of known Peers'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.numAllLinks
                  ? status?.network.p2p.numAllLinks
                  : '0'
              }
              property={'Number of all Links'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.nio_inbound
                  ? status.network.p2p.nio_inbound
                  : '0'
              }
              property={'NIO Inbound'}></StatusRow>
            <StatusRow
              inner={true}
              data={
                status?.network.p2p.nio_outbound
                  ? status?.network.p2p.nio_outbound
                  : '0'
              }
              property={'Nio Outbound'}></StatusRow>
          </List.Accordion>
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
};

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

interface iProps {
  navigation: NavigationState;
}
const BalanceScreen = (props: iProps) => {
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
    <ScrollView>
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
    </ScrollView>
  );
};

export const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Balance" component={BalanceScreen} />
      <Drawer.Screen name="Status" component={StatusScreen} />
      <Drawer.Screen name="Address" component={AddressScreen} />
      <Drawer.Screen name="Send" component={SendScreen} />
      <Drawer.Screen name="Token" component={CreateTokenScreen} />
      <Drawer.Screen name="TokenDetailScreen" component={TokenDetailScreen} />
    </Drawer.Navigator>
  );
};
