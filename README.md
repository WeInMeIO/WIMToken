# WIM Contracts

## Description:

The WIM ICO is made of three contracts which are ERC20 compliant token.The naming convention used describs the purpose of the individual contracts.

1) WIMPreSale -
2) WIMToken - 
3) TeamAllocation - 
4) UnsoldAllocation - 

## Specification
### WIMToken
  Ownable and StandardToken classes.
  This class will handle the ICO transaction.

#### Methods
##### pause() - emergency stop of ICO
> function pause() onlyOwner external returns (bool)

##### payable - validator function
> function() payable isFundingModeStop external

##### purchase - carry out purchase transaction
> function purchase() payable isFundingModeStop external

##### finalize - end the ICO gracefully 
> finalize() external onlyOwner

##### refund - 
> function refund() isFundingModeStop external
 
#### Events
##### Refund
> event Refund(address indexed _from,uint256 _value);

##### Migrate
> event Migrate(address indexed _from, address indexed _to, uint256 _value);
