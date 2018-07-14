const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  //get a list of all ETH accounts
  accounts = await web3.eth.getAccounts();

  //use one of these accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['hello world!']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox Contract', () => {
  it('deploys a contract', () => {
    //if an address exists, it's likely that the contract was deployed
    assert.ok(inbox.options.address);
  });
});
