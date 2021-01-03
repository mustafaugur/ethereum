const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');


//console.log("-----------abi------------------------");
//console.log(abi);
//console.log("-----------evm.bytecode---------------");
//console.log(evm.bytecode);


let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there';
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();


    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });

    //  web3.eth.getAccounts().then(
    //     accounts =>  {
    //         console.log(accounts);
    //     }
    // )
}
);

describe('Inbox', () => {
    it('deploys a contract', () => {
        //console.log(inbox);
        assert.ok(inbox.options.address)
    });

    it('has a default message',async () => {
        const message = await inbox.methods.message().call();    
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change the message'), async () => {
        const tran = await inbox.methods.setMessage('bye').send({from:accounts[1]});
        console.log("tranId : " + tran);
        const message = await inbox.methods.message().call();    
        assert.equal(message,'bye');
    };
})


// class Car  {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;
// beforeEach(() => {
//     car = new Car();
// })

// describe('Car Test Suite', () => {
//     it('it can park', () =>{
//         assert.equal(car.park(), 'stopped');
//     } );

//     it('it can drive', () =>{
//         assert.equal(car.drive(), 'vroom');
//     } )


// })
