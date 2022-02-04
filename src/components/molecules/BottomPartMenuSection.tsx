import {View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {MenuBalanceSection} from '../atoms/MenuBalanceSection';
import {MenuPoweredBySection} from '../atoms/MenuPoweredBySection';
import {MinimaToken} from '../../types';
import {callBalance} from '../../api/rpc-commands';
import {useDrawerStatus} from '@react-navigation/drawer';
const BottomPartMenuSection: FC = () => {
  const [balance, setBalance] = useState<MinimaToken | null>(null);
  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    callBalance()
      .then(data => {
        console.log('CAlling balance');
        data.response.forEach((el: MinimaToken) =>
          el.tokenid === '0x00' ? setBalance(el) : null,
        );
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }, [isDrawerOpen]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     callBalance()
  //       .then(data => {
  //         console.log('CAlling balance');
  //         data.response.forEach((el: MinimaToken) =>
  //           el.tokenid === '0x00' ? setBalance(el) : null,
  //         );
  //       })
  //       .catch(err => {
  //         console.log(`ERROR: ${err}`);
  //       });
  //     // let didCallBalanceOnce = false;
  //     // if (!didCallBalanceOnce) {
  //     //   // then call balance once
  //     //   callBalance()
  //     //     .then(data => {
  //     //       data.response.forEach((el: Balance) =>
  //     //         el.tokenid === '0x00' ? setBalance(el) : null,
  //     //       );
  //     //     })
  //     //     .catch(err => {
  //     //       console.log(`ERROR: ${err}`);
  //     //     });
  //     // }
  //     // setInterval(() => {
  //     //   callBalance()
  //     //     .then(data => {
  //     //       data.response.forEach((el: Balance) =>
  //     //         el.tokenid === '0x00' ? setBalance(el) : null,
  //     //       );
  //     //     })
  //     //     .catch(err => {
  //     //       console.log(`ERROR: ${err}`);
  //     //     });
  //     // }, 20000);
  //     return () => {};
  //   }, []),
  // );
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
