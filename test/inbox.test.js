const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

beforeEach(() => {
  //get a list of all ETH accounts
  web3.eth.getAccounts().then(fetchedAccounts => {
    console.log(fetchedAccounts);
  });

  //use one of these accounts to deploy contract
});

describe('Inbox Contract', () => {
  it('deployed a contract', () => {

  });
});
