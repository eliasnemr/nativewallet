import {STATUS, BALANCE, RPCHOST, SEND, HELP, ADDRESS} from '../constants';

export const callStatus = () => {
  return retryPromise(callStatusSingle, MAX_RETRIES);
};

export const callBalance = () => {
  return retryPromise(callBalanceSingle, MAX_RETRIES);
};

export const callHelp = () => {
  return retryPromise(callHelpSingle, MAX_RETRIES);
};

export const callAddress = () => {
  return retryPromise(callAddressSingle, MAX_RETRIES);
};

// send ${address} ${amount} ${tokenid}
export const send = (data: any) => {
  return retryPromise(callSendSingle(data), MAX_RETRIES);
};

///// private functions //////

const MAX_RETRIES = 2;

const callSendSingle = (data: any) => () => {
  const url = `${RPCHOST}${SEND}+address:${data.address}+amount:${data.amount}+tokenid:${data.tokenid}`;
  return fetch(url, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => result.json());
};

const callAddressSingle = () => {
  const url = `${RPCHOST}${ADDRESS}`;
  return fetch(url, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => result.json());
};

const callStatusSingle = () => {
  const url = `${RPCHOST}${STATUS}`;
  return fetch(url, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => result.json());
};

const callBalanceSingle = () => {
  const url = `${RPCHOST}${BALANCE}`;
  return fetch(url, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => result.json());
};

const callHelpSingle = () => {
  const url = `${RPCHOST}${HELP}`;
  return fetch(url, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => result.json());
};

// allows you to call a promise recursively
// with a max number of attempts (attemptsLeft)
// will retry until the promise succeeds
// or until max attempts is reached, in which case it will reject
const retryPromise = (myProm, attemptsLeft) => {
  const newAttemptsLeft = attemptsLeft - 1;
  return new Promise((resolve, reject) => {
    console.log(`attempt ${attemptsLeft} to call ${myProm.name}`);
    myProm().then(
      successData => {
        console.log(`attempt ${attemptsLeft} success`);
        resolve(successData);
      },
      failureData => {
        console.log(`attempt ${attemptsLeft} failure`);
        if (newAttemptsLeft < 1) {
          reject(failureData);
        } else {
          return retryPromise(myProm, newAttemptsLeft).then(resolve, reject);
        }
      },
    );
  });
};
