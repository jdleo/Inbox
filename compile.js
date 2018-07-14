//bring in path and fs so that we can read .sol file
const path = require('path');
const fs = require('fs');

//bring in solidity compiler
const solc = require('solc');

//generate path to point to Inbox.sol contract file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

//read .sol source
const source = fs.readFileSync(inboxPath, 'utf8');

//compile and export contract object
module.exports = solc.compile(source, 1).contracts[':Inbox'];
