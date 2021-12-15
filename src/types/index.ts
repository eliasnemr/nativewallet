/**
 * All Minima Objects
 */
export interface Status {
  version: string;
  devices: number;
  length: number;
  weight: number;
  configuration: string;
  memory: {
    ram: string;
    disk: string;
    files: {
      txpowdb: string;
      archivedb: string;
      cascade: string;
      chaintree: string;
      wallet: string;
      userdb: string;
      p2pdb: string;
    };
  };
  chain: {
    block: number;
    time: string;
    hash: string;
    speed: string;
    difficulty: string;
    size: number;
    length: number;
    weight: number;
  };
  txpow: {
    mempool: number;
    ramdb: number;
    txpowdb: number;
    archivedb: number;
  };
  network: {
    host: string;
    port: number;
    connecting: number;
    connected: number;
    rpc: boolean;
    p2p: {
      address: string;
      isAcceptingInLinks: boolean;
      numInLinks: number;
      numOutLinks: number;
      numNotAcceptingConnP2PLinks: number;
      numNoneP2PLinks: number;
      numKnownPeers: number;
    };
    sshtunnel: {
      enabled: boolean;
    };
  };
}

interface Token {
  name: string;
}

export interface Balance {
  token: any;
  tokenid: string;
  confirmed: string;
  unconfirmed: string;
  total: string;
}
/**
 * All Form Objects
 */
export interface SendTokensForm {
  address: string;
  tokenid: string;
  amount: string;
}
export interface FormAlertMessage {
  status: string;
  header: string;
  message: string;
}
