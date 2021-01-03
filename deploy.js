const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'nmonic',
    'https://rinkeby.infura.io/v3/5214b3f00345452b8ca1d5207ae593f6'
);

const web3 = new Web3(provider);

console.log('test');


const deploy = async ()  =>{
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
     .deploy({data: evm.bytecode.object, arguments: ['Hi there!']}) // add 0x bytecode
     .send({from: accounts[0]}); // remove 'gas'

console.log('Contract deployed to', result.options.address);
    
 };
deploy();



