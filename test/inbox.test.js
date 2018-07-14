const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');

const test_initial_message = 'hello, world!';
const test_new_message = 'bye, world!';

let accounts;
let inbox;

beforeEach(async () => {
  //get a list of all ETH accounts
  accounts = await web3.eth.getAccounts();

  //use one of these accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [test_initial_message]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox Contract', () => {
  it('deploys a contract', () => {
    //if an address exists, it's likely that the contract was deployed
    assert.ok(inbox.options.address);
  });

  it('sets default message on deployment', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, test_initial_message);
  });

  it('sets new message', async () => {
    await inbox.methods.setMessage(test_new_message).send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, test_new_message);
  });
});
