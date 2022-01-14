/**
 * Minima Objects
 */
export interface Status {
  version: string;
  devices: number;
  length: number;
  weight: number;
  configuration: string;
  minima: number;
  coins: number;
  data: string;
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
    branches: number;
    cascade: {
      start: number;
      length: number;
      weight: string;
    };
  };
  txpow: {
    mempool: number;
    ramdb: number;
    txpowdb: number;
    archivedb: number;
  };
  network: {
    host: string;
    hostset: boolean;
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
      numAllLinks: number;
      nio_inbound: number;
      nio_outbound: number;
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
 * Form Objects
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

/**
 * Functional Component Props
 */
export interface MenuNavigationProps {
  readonly title?: string;
  readonly left?: number;
  readonly right?: number;
  readonly bottom?: number;
  readonly top?: number;
  readonly navigationItems: NavigationItem[];
}
export interface MenuHeaderProps {
  readonly title?: string;
  readonly left?: number;
  readonly right?: number;
  readonly bottom?: number;
  readonly top?: number;
}

/**
 * Functional Component Datatypes
 */
export interface NavigationItem {
  readonly title: string;
  readonly path: string;
}
