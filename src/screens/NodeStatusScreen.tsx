import React, {FC, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';
import {callStatus} from '../api/rpc-commands';
import {StatusRow} from '../components/statusRow';
import {Status} from '../types';
import {appLayout} from '../styles';
import {ImageBackground, useColorScheme} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ServiceUnavailable from '../components/organisms/ServiceUnavailable';

const NodeStatusScreen: FC = () => {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);
  const scheme = useColorScheme();

  // const [expanded, setExpanded] = React.useState(true);

  // const handlePress = () => setExpanded(!expanded);

  useFocusEffect(
    React.useCallback(() => {
      callStatus()
        .then(data => {
          if (data && data.response) {
            setStatus(data.response);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setFailed(true);
        });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  return (
    <ImageBackground
      source={
        scheme === 'dark'
          ? require('../assets/images/DM.jpg')
          : require('../assets/images/LM.jpg')
      }
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      {status && status.chain.block > 0 ? (
        <ScrollView style={appLayout.sv}>
          <List.Section
            style={{paddingBottom: 30}}
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
            <StatusRow
              data={status?.data}
              property={'Storage path'}></StatusRow>
            <List.Accordion
              theme={{
                colors: {
                  background: 'rgba(255, 255, 255, 0.5)',
                },
              }}
              title="Memory"
              left={props => <List.Icon {...props} icon="folder" />}>
              <StatusRow
                data={status?.memory.disk}
                property={'Disk Usage'}></StatusRow>
              <StatusRow
                data={status?.memory.ram}
                property={'Ram Usage'}></StatusRow>
              <List.Accordion
                theme={{
                  colors: {
                    background: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
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
              theme={{
                colors: {
                  background: 'rgba(255, 255, 255, 0.5)',
                },
              }}
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
              <StatusRow
                data={status?.chain.size}
                property={'Size'}></StatusRow>
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
                theme={{
                  colors: {
                    background: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
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
              theme={{
                colors: {
                  background: 'rgba(255, 255, 255, 0.5)',
                },
              }}
              title="TxPoW"
              left={props => <List.Icon {...props} icon="folder" />}>
              <StatusRow
                data={status?.txpow.mempool}
                property={'Mempool'}></StatusRow>
              <StatusRow
                data={status?.txpow.ramdb}
                property={'Ram DB'}></StatusRow>
              <StatusRow
                data={status?.txpow.txpowdb}
                property={'TxPoW DB'}></StatusRow>
              <StatusRow
                data={status?.txpow.archivedb}
                property={'Archive DB'}></StatusRow>
            </List.Accordion>
            <List.Accordion
              theme={{
                colors: {
                  background: 'rgba(255, 255, 255, 0.5)',
                },
              }}
              title="Network"
              left={props => <List.Icon {...props} icon="folder" />}>
              <StatusRow
                data={status?.network.host}
                property={'Host'}></StatusRow>
              <StatusRow
                data={status?.network.hostset ? 'True' : 'False'}
                property={'Host Set'}></StatusRow>
              <StatusRow
                data={status?.network.port}
                property={'Host Port'}></StatusRow>
              <StatusRow
                data={
                  status?.network.connecting
                    ? status?.network.connecting
                    : 'None'
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
                theme={{
                  colors: {
                    background: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
                title="P2P"
                left={props => <List.Icon {...props} icon="folder" />}>
                <StatusRow
                  inner={true}
                  data={status?.network.p2p.address}
                  property={'Address'}></StatusRow>
                <StatusRow
                  inner={true}
                  data={
                    status?.network.p2p.isAcceptingInLinks ? 'True' : 'False'
                  }
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
      ) : !loading && failed ? (
        <ServiceUnavailable />
      ) : (
        <ActivityIndicator
          animating={true}
          color="#317AFF"
          style={{margin: 20}}
        />
      )}
    </ImageBackground>
  );
};

export default NodeStatusScreen;
