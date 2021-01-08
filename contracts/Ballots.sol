// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {
    address public manager;
    address payable[]  public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable{
        
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public  {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        delete players;
    }
   
}