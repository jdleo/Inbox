const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

//connect to infura API with our rinkeby account
const provider = new HDWalletProvider(
  'faculty drink cradle october host captain reflect buyer toast album desert program',
  'https://rinkeby.infura.io/UawBd2Uf27LzaCleE8j0'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('attempting to deploy from account', accounts[0]);

  const res = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['hello, world!']})
    .send({gas: '1000000', from: accounts[0]});

  console.log('contract deployed to', res.options.address);
};

deploy();
