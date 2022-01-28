import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Button, List} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import {callAddress} from '../api/rpc-commands';
import {useFocusEffect} from '@react-navigation/native';
import {appLayout, bStyles} from '../styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {formStyle} from '../styles';
import ServiceUnavailable from '../components/organisms/ServiceUnavailable';

const storeAddress = async (value: string) => {
  try {
    await AsyncStorage.setItem('hexaddress', value);
  } catch (e) {
    // saving error
    console.log(`${e}`);
  }
};

const ReceiveFundsScreen = () => {
  const scheme = useColorScheme();
  const [address, setAddress] = useState('');
  const [copyText, setCopyText] = useState('Copy');
  const [genText, setGenText] = useState('Generate');

  const generateAddress = () => {
    setGenText('Generating...');
    callAddress()
      .then(data => {
        if (data && data.response) {
          setAddress(data.response.address);
          storeAddress(data.response.address);
          setTimeout(() => {
            setGenText('Generate');
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
        setGenText('Generate');
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('hexaddress')
        .then((data: string | null) => {
          if (data !== null) {
            console.log('Found address: ' + data);
            setAddress(data);
            storeAddress(address);
          } else {
            throw new Error('Did not find an address');
          }
        })
        .catch(err => {
          generateAddress();
          console.log(`${err}`);
        });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  const copyToClipboard = (data: string) => {
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
      {address ? (
        <View style={appLayout.sv}>
          <List.Section style={style.li}>
            <List.Item
              title={address ? address : 'No address available'}
              description={'Use this address to receive coins.'}
              titleStyle={bStyles.listTitle}
              titleEllipsizeMode="middle"></List.Item>
          </List.Section>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <Button
              uppercase={false}
              accessibilityLabel="Copy to clipboard"
              mode="contained"
              style={[formStyle.formBtn, {marginBottom: 10}]}
              labelStyle={formStyle.formBtnLabel}
              disabled={copyText !== 'Copy'}
              onPress={() => {
                copyToClipboard(address);
              }}>
              {copyText}
            </Button>
            <Button
              uppercase={false}
              accessibilityLabel="Copy to clipboard"
              mode="contained"
              style={[formStyle.formBtn]}
              labelStyle={formStyle.formBtnLabel}
              disabled={genText !== 'Generate'}
              onPress={() => {
                generateAddress();
              }}>
              {genText}
            </Button>
          </View>
        </View>
      ) : (
        <ServiceUnavailable />
      )}
    </ImageBackground>
  );
};

export default ReceiveFundsScreen;

const style = StyleSheet.create({
  li: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 16,
    minHeight: 82,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
  },
  title: {
    fontWeight: '700',
    lineHeight: 15,
    fontSize: 14,
  },
  leftIcon: {
    borderRadius: 6,
    height: 50,
    width: 50,
    maxWidth: 50,
    maxHeight: 50,
    marginRight: 5,
    paddingRight: 0,
  },
  description: {fontWeight: '400', fontSize: 16},
});
