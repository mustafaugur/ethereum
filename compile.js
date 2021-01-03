const path = require('path');
const fs = require('fs');
const solc = require('solc');

//const inboxPath = path.resolve(__dirname,'contracts', 'Inbox.sol');
const source = fs.readFileSync('./contracts/Inbox.sol', 'utf8');


var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
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
let inbox = contractObject.contracts['Inbox.sol'].Inbox;

//console.log(inbox);


//console.log(JSON.parse(solc.compile(JSON.stringify(input)) ).contracts['Inbox.sol'].Inbox);
//console.log(JSON.parse(solc.compile(JSON.stringify(input)) ).contracts['Inbox.sol']);
module.exports = inbox;


//console.log(solc.compile(source, 1));

//module.exports = solc.compile(source, 1).contracts['Inbox'];



