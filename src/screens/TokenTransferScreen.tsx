import React, {FC, useState} from 'react';
import {appLayout, formStyle} from '../styles';
import {Formik} from 'formik';
import {Alert, ImageBackground, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import * as Yup from 'yup';
import {MinimaToken} from '../types';
import {useFocusEffect} from '@react-navigation/native';
import {callBalance, send} from '../api/rpc-commands';

import {useColorScheme} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import ServiceUnavailable from '../components/organisms/ServiceUnavailable';

const TransferTokenSchema = Yup.object().shape({
  tokenid: Yup.string().required('Field Required'),
  address: Yup.string()
    .matches(/0[xX][0-9a-fA-F]+/, 'Invalid Address.')
    .min(66, 'Invalid Address.')
    .max(66, 'Invalid Address.')
    .required('Field Required'),
  amount: Yup.string().required('Field Required'),
});

const TokenTransferScreen: FC = () => {
  const scheme = useColorScheme();
  const [balance, setBalance] = useState<MinimaToken[]>([]);
  const [token, setToken] = useState<string>('');
  const [btnText, setBtnText] = useState('Send');

  useFocusEffect(
    React.useCallback(() => {
      callBalance()
        .then(data => {
          // console.log(data);
          setBalance(data.response);
          // console.log('Calld once.');
          // didCallBalanceOnce = true;
        })
        .catch(err => {
          console.log(`ERROR: ${err}`);
        });
      // let didCallBalanceOnce = false;
      // if (!didCallBalanceOnce) {
      //   // then call balance once
      //   callBalance()
      //     .then(data => {
      //       // console.log(data);
      //       setBalance(data.response);
      //       // console.log('Calld once.');
      //       didCallBalanceOnce = true;
      //     })
      //     .catch(err => {
      //       console.log(`ERROR: ${err}`);
      //     });
      // }
      // setInterval(() => {
      //   callBalance()
      //     .then(data => {
      //       // console.log(data);
      //       setBalance(data.response);
      //     })
      //     .catch(err => {
      //       console.log(`ERROR: ${err}`);
      //     });
      // }, 20000);
    }, []),
  );

  return (
    <Formik
      initialValues={{tokenid: '0x00', address: '', amount: ''}}
      validationSchema={TransferTokenSchema}
      onSubmit={(values, {resetForm}) => {
        setBtnText('Constructing transaction...');

        send(values)
          .then(res => {
            if (res.status) {
              setBtnText('Send');
              Alert.alert(
                'Transaction successful!',
                'The transaction is valid and will be received shortly.',
              );
              resetForm();
            } else {
              throw new Error(res.message);
            }
            console.log(res);
          })
          .catch(err => {
            setBtnText('Failed');
            Alert.alert(`Transaction failed`, `${err}`);
            setTimeout(() => {
              setBtnText('Send');
            }, 2000);
          });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
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
          {balance && balance.length > 0 ? (
            <View style={appLayout.sv}>
              {errors.tokenid && touched.tokenid ? (
                <Text style={formStyle.error}>{errors.tokenid}</Text>
              ) : null}
              <Picker
                style={[formStyle.formInput, {marginTop: 30}]}
                selectedValue={token}
                onValueChange={itemValue => {
                  console.log(itemValue);
                  setToken(itemValue);
                  values.tokenid = itemValue;
                }}>
                {balance
                  ? balance.map((t: MinimaToken) => (
                      <Picker.Item
                        style={formStyle.formInput}
                        label={t.token.name ? t.token.name : t.token}
                        key={t.tokenid}
                        value={t.tokenid}></Picker.Item>
                    ))
                  : null}
              </Picker>

              {errors.address && touched.address ? (
                <Text style={formStyle.error}>{errors.address}</Text>
              ) : null}
              <TextInput
                style={formStyle.formInput}
                placeholder="Recipient's Minima address"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {errors.amount && touched.amount ? (
                <Text style={formStyle.error}>{errors.amount}</Text>
              ) : null}
              <TextInput
                style={formStyle.formInput}
                placeholder="Amount"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
                keyboardType="numeric"
              />
              <Button
                mode="contained"
                style={formStyle.formBtn}
                labelStyle={formStyle.formBtnLabel}
                disabled={btnText !== 'Send' && !touched}
                onPress={handleSubmit}>
                {btnText}
              </Button>
            </View>
          ) : (
            <ServiceUnavailable />
          )}
        </ImageBackground>
      )}
    </Formik>
  );
};

export default TokenTransferScreen;
