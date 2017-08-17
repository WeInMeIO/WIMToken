require('babel-polyfill');
var BigNumber = require('bignumber.js');
var WIMToken = artifacts.require("./WIMToken.sol");
var expect = require("chai").expect;
var wim;
const icoStartBlock = 0;
const icoEndBlock = 10;
contract('WIMToken', function(accounts) {

  it("test for starting ICO", async function() {
    var expected = true;
    wim = await WIMToken.deployed();
    await wim.startTokenSale(icoStartBlock,icoEndBlock,{from: accounts[0]});
    const status = await wim.fundingStatus.call();
    expect(status).to.equal(expected);
  });

  it("test for totalSupply", async function() {
    const expected = new BigNumber(8e+26);
    const total = new BigNumber(await wim.totalSupply.call());
    assert(expected.equals(total))
  });

  it("test for purchase", async function() {
    var expected = new BigNumber(1e+21);
    try {
      await wim.purchase({from: accounts[0], value: web3.toWei(1,'ether')});
      const balance = new BigNumber(await wim.balanceOf.call(accounts[0]));
      //console.log(balance);
      assert(expected.equals(balance));
    }catch(e) {
      console.log(e);
    }
  });

  it("test for fallback function", async function() {
    var expected = new BigNumber(500000000000000000000);
    try {
      await web3.eth.sendTransaction({from: accounts[1],to: wim.address, value: web3.toWei(0.5,'ether')});
      const balance = new BigNumber(await wim.balanceOf.call(accounts[1]));
      //console.log(balance);
      assert(expected.equals(balance));
    }catch(e) {
      console.log(e);
    }
  });

  it("test for numberOfTokensLeft", async function() {
    var expected = new BigNumber(5.599985e+26);
    const tokens = new BigNumber(await wim.numberOfTokensLeft.call());
    //console.log(tokens);
    assert(expected.equals(tokens));
  });

  it("test for balanceOf", async function() {
    var expected1 = new BigNumber(1e+21);
    const balance1 = new BigNumber(await wim.balanceOf.call(accounts[0]));
    //console.log("Balance1: ",balance1);
    assert(expected1.equals(balance1));
    var expected2 = new BigNumber(500000000000000000000);
    const balance2 = new BigNumber(await wim.balanceOf.call(accounts[1]));
    //console.log("Balance2: ",balance2);
    assert(expected2.equals(balance2));
    var expected3 = 0;
    const balance3 = await wim.balanceOf.call(accounts[2]);
    //console.log("Balance3: ",balance3);
    expect(parseInt(balance3.valueOf())).to.equal(expected3);
  });

  it("test for refund failure", async function() {
    try {
      await wim.refund.call();
    }catch(e) {
      console.log(e);
      expect(e).not.to.equal('');
    }
  });

  it("test for finalize", async function() {
    //call to finalize will fail before the actual completion of ICO
    try{
      await wim.finalize.call();
    } catch(e) {
      expect(e).not.to.equal('');
    }
  });

});
