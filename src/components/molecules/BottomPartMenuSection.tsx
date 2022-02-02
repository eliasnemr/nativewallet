import {View} from 'react-native';
import React, {FC, useState} from 'react';
import {MenuBalanceSection} from '../atoms/MenuBalanceSection';
import {MenuBackupButton} from '../atoms/MenuBackupButton';
import {MenuPoweredBySection} from '../atoms/MenuPoweredBySection';
import {Balance} from '../../types';
import {useFocusEffect} from '@react-navigation/native';
import {callBalance} from '../../api/rpc-commands';

const BottomPartMenuSection: FC = () => {
  const [balance, setBalance] = useState<Balance | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      callBalance()
        .then(data => {
          data.response.forEach((el: Balance) =>
            el.tokenid === '0x00' ? setBalance(el) : null,
          );
        })
        .catch(err => {
          console.log(`ERROR: ${err}`);
        });
      // let didCallBalanceOnce = false;
      // if (!didCallBalanceOnce) {
      //   // then call balance once
      //   callBalance()
      //     .then(data => {
      //       data.response.forEach((el: Balance) =>
      //         el.tokenid === '0x00' ? setBalance(el) : null,
      //       );
      //     })
      //     .catch(err => {
      //       console.log(`ERROR: ${err}`);
      //     });
      // }
      // setInterval(() => {
      //   callBalance()
      //     .then(data => {
      //       data.response.forEach((el: Balance) =>
      //         el.tokenid === '0x00' ? setBalance(el) : null,
      //       );
      //     })
      //     .catch(err => {
      //       console.log(`ERROR: ${err}`);
      //     });
      // }, 20000);
      return () => {};
    }, []),
  );
  return (
    <View style={{justifyContent: 'space-evenly', flex: 1}}>
      <MenuBalanceSection
        minima={
          balance?.confirmed ? balance?.confirmed : 'unavailable'
        }></MenuBalanceSection>
      {/* <MenuBackupButton></MenuBackupButton> */}
      <MenuPoweredBySection></MenuPoweredBySection>
    </View>
  );
};

export default BottomPartMenuSection;
