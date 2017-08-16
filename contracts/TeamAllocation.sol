pragma solidity ^0.4.11;
import './WIMToken.sol';
import './zeppelin/SafeMath.sol';
import './zeppelin/ownership/Ownable.sol';

contract TeamAllocation is Ownable {
  using SafeMath for uint;
  //uint public constant lockedTeamAllocationTokens = 16000000;
  uint public unlockedAt;
  WIMToken wim;
  mapping (address => uint) allocations;
  uint tokensCreated = 0;
  uint constant public lockedTeamAllocationTokens = 16000000e18;
  //address of the team storage vault
  address public teamStorageVault = 0x3f5D90D5Cc0652AAa40519114D007Bf119Afe1Cf;

  function TeamAllocation() {
    wim = WIMToken(msg.sender);
    // Locked time of approximately 9 months before team members are able to redeeem tokens.
    uint nineMonths = 9 * 30 days;
    unlockedAt = now.add(nineMonths);
    //2% tokens from the Marketing bucket which are locked for 9 months
    allocations[teamStorageVault] = lockedTeamAllocationTokens;
  }

  function getTotalAllocation() returns (uint){
      return lockedTeamAllocationTokens;
  }

  function unlock() external payable {
    if (now < unlockedAt) throw;

    if (tokensCreated == 0) {
      tokensCreated = wim.balanceOf(this);
    }
    //transfer the locked tokens to the teamStorageAddress
    wim.transfer(teamStorageVault, tokensCreated);
  }
}
