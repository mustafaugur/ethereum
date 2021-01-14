const path = require('path');
const fs = require('fs');
const solc = require('solc');

//const inboxPath = path.resolve(__dirname,'contracts', 'Inbox.sol');
const source = fs.readFileSync('./contracts/Lottery.sol', 'utf8');


var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        optimizer:
            {
                enabled: true
            },
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const contractObject =  JSON.parse(solc.compile(JSON.stringify(input)));
let lottery = contractObject.contracts['Lottery.sol'].Lottery;

console.log(lottery);


module.exports = lottery;





