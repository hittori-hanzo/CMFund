const XMFund = artifacts.require("./XMFund.sol");

contract('XMFund testing construction', function(accounts) {

  it("should put 10000000 units to be initially held by fundmanager", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.getUnitsAvailable.call(accounts[0]);
    }).then(function(unitsAvaliable) {
      assert.equal(unitsAvaliable.valueOf(), 10000000, "10000000 wasn't held by Fund Manager");
    });
  });

  it("should put 10000000 units to be initially held by fundmanager", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.queryUnits.call(accounts[0]);
    }).then(function(unitsAvaliable) {
      assert.equal(unitsAvaliable.valueOf(), 10000000, "10000000 wasn't held by Fund Manager");
    });
  });

  it("should be priced per unit at a value of 10000 Wei", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.queryUnitPrice.call(accounts[0]);
    }).then(function(unitPrice) {
      assert.equal(unitPrice.valueOf(), 10000, "10000 wasn't unit price");
    });
  });

  it("should have a total value of 10000 * 10000000 Wei = 100000000000 Wei", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.queryValue.call(accounts[0]);
    }).then(function(fundWorth) {
      assert.equal(fundWorth.valueOf(), 100000000000, "100000000000 wasn't the fund net worth");
    });
  });

  it("should set the unit price to 500 Wei", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.setUnitPrice(500,{from: accounts[0]});
    }).then(function(valueSet) {
      assert.equal(valueSet, true, "wasn't set to 500 Wei");
    });
  });

});

contract('XMFund buying and selling', function(accounts) {
  var fund;
  var fundManager = accounts[0];
  var purchaser = accounts[1];
  var secondPurchaser = accounts[2];

  it("should deliver 4 units to purchaser", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.purchase({from: purchaser, value: 40000});
    }).then(function(){
      return fund.queryUnits.call({from:purchaser});
    }).then(function(unitsHeld){
       assert.equal(unitsHeld.valueOf(), 4, "4 units weren't transferred to accounts[1]");
    });
  });

  it("should have 9999996 units available for purchase", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.getUnitsAvailable.call({from:fundManager});
    }).then(function(unitsAvailable){
      assert.equal(unitsAvailable.valueOf(), 9999996, "9999996 units not available for purchase");
    });
  });

  it("zero purchase test: should have 9999996 units available for purchase,", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.purchase({from: purchaser, value: 0});
    }).then (function(){
      return fund.getUnitsAvailable.call({from:fundManager});
    }).then(function(unitsAvailable){
      assert.equal(unitsAvailable.valueOf(), 9999996, "9999996 units not available for purchase");
    });
  });

  it("additional purchase 3 units: should have 9999993 units available for purchase,", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.purchase({from: secondPurchaser, value: 30000});
    }).then (function(){
      return fund.getUnitsAvailable.call({from:fundManager});
    }).then(function(unitsAvailable){ 
      assert.equal(unitsAvailable.valueOf(), 9999993, "9999993 units not available for purchase");
    });
  });

  it("additional purchase 3 units: purchaser should have 3 units,", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.queryUnits.call({from:secondPurchaser});
    }).then(function(unitsAvailable){ 
      assert.equal(unitsAvailable.valueOf(), 3, "3 units weren't transferred to secondPurchaser");
    });
  });

  it("sale of 3 units: should have 9999996 units available for purchase,", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.sell(3,{from: secondPurchaser});
    }).then (function(){
      return fund.getUnitsAvailable.call({from:fundManager});
    }).then(function(unitsAvailable){ 
      assert.equal(unitsAvailable.valueOf(), 9999996, "9999993 units not available for purchase");
    });
  });

  it("after sale of 3 units: secondPurchaser should have 0 units,", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.queryUnits.call({from:secondPurchaser});
    }).then(function(unitsHeld){ 
      assert.equal(unitsHeld.valueOf(), 0, "units held should be zero");
    });
  });

  it("after sale secondPurchaser closes account, units held should be zero", function() {

    return XMFund.deployed().then(function(instance) {
      fund = instance;
      return fund.close({from:secondPurchaser});
    }).then(function(){
       return fund.queryUnits.call({from:secondPurchaser});
    }).then(function(unitsHeld){ 
      assert.equal(unitsHeld.valueOf(), 0, "units held should be zero");
    });
  });

});
