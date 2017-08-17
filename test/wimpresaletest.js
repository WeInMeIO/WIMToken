/*
require('babel-polyfill');
var WIMPresale = artifacts.require("./WIMPresale.sol");
var expect = require("chai").expect;
var wim;
contract('WIMPresale', function(accounts) {
  it("test for totalPresaleSupply", async function() {
    try {
      const expected = 44000000;
      wim = await WIMPresale.deployed();
      const total = wim.getTotalPresaleSupply.call();
      expect(parseInt(total.valueOf())).to.equal(expected);
    }catch(e) {
      console.log(e);
    }
  });

  it("test for fallback function", async function() {
    var expected = 2200;
    try {
      const promise = await web3.eth.sendTransaction({from: accounts[8],to: wim.address, value: web3.toWei(0.84,'ether'), gas: 2000000});
      const balance = wim.balanceOf.call(accounts[8]);
      expect(parseInt(balance.valueOf())).to.equal(expected);
    }catch(e) {
      console.log(e);
    }
  });

  it("test for numberOfTokensLeft", async function() {
    var expected = 43997800;
    const tokens = wim.numberOfTokensLeft.call();
    expect(parseInt(tokens.valueOf())).to.equal(expected)
  });

  it("test for large sale", async function() {
    try {
      const promise = await web3.eth.sendTransaction({from: accounts[7],to: wim.address, value: web3.toWei(800,'ether')});
      const balance = wim.balanceOf.call(accounts[7]);
    }catch(e) {
      expect(e).not.to.equal('');
    }
  });

  it("test for finalize", async function() {
    //call to finalize will fail before the actual completion of ICO
    try{
      await WIMPresale.finalize.call();
    } catch(e) {
      expect(e).not.to.equal('');
    }
  });
});
*/
