pragma solidity ^0.4.11;
import './WIMToken.sol';
import './zeppelin/SafeMath.sol';
import './zeppelin/ownership/Ownable.sol';

contract UnsoldAllocation is Ownable {
  using SafeMath for uint;
  uint unlockedAt;
  uint allocatedTokens;
  WIMToken wim;
  mapping (address => uint) allocations;

  uint tokensCreated = 0;

  /*
    Split among team members
    Tokens reserved for Team: 1,000,000
    Tokens reserved for 20|30 projects: 1,000,000
    Tokens reserved for future sale: 1,000,000
  */

  function UnsoldAllocation(uint _lockTime, address _owner, uint _tokens) {
    if(_lockTime == 0) throw;

    if(_owner == address(0)) throw;

    wim = WIMToken(msg.sender);
    uint lockTime = _lockTime * 1 years;
    unlockedAt = now.add(lockTime);
    allocatedTokens = _tokens;
    allocations[_owner] = _tokens;
  }

  function getTotalAllocation()returns(uint){
      return allocatedTokens;
  }

  function unlock() external payable {
    if (now < unlockedAt) throw;

    if (tokensCreated == 0) {
      tokensCreated = wim.balanceOf(this);
    }

    var allocation = allocations[msg.sender];
    allocations[msg.sender] = 0;
    var toTransfer = (tokensCreated.mul(allocation)).div(allocatedTokens);
    wim.transfer(msg.sender, toTransfer);
  }
}
