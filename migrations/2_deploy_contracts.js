var SafeMath = artifacts.require('./zeppelin/SafeMath.sol');
var WIMPresale = artifacts.require('./WIMPresale.sol');
var UnsoldAllocation = artifacts.require('./UnsoldAllocation.sol');
var TeamAllocation = artifacts.require("./TeamAllocation.sol");
var WIMToken = artifacts.require("./WIMToken.sol");

module.exports = function(deployer) {
 //mainnet
  const tokenMultisigWallet = '0x05a9afd79a05c3e1afefa282ef8d58f9366b160b';
  const icedWallet = '0xff678a624472fe0d195e3cac47dec2375dc2d8be';

  deployer.deploy(SafeMath);
  //deployer.link(SafeMath,WIMPresale);
  //deployer.deploy(WIMPresale,presaleMultisigWallet,presaleStartBlock,presaleEndBlock);
  deployer.link(SafeMath,UnsoldAllocation);
  deployer.link(SafeMath,TeamAllocation);
  deployer.link(SafeMath,WIMToken);
  deployer.deploy(WIMToken,tokenMultisigWallet,icedWallet);
};
