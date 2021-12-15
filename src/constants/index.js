export const STATUS = 'status';
export const BALANCE = 'balance';
export const HELP = 'help';
export const SEND = 'send';
export const ADDRESS = 'newaddress';

import {Platform} from 'react-native';

export const RPCHOST =
  Platform.OS === 'ios' ? 'http://localhost:9002/' : 'http://127.0.0.1:9002/';
