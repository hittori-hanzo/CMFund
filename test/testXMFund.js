const XMFund = artifacts.require("./XMFund.sol");

contract('XMFund', function(accounts) {

  it("should put 10000000 units held by fundmanager", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.getUnitsAvailable.call(accounts[0]);
    }).then(function(unitsAvaliable) {
      assert.equal(unitsAvaliable.valueOf(), 10000000, "10000000 wasn't held by Fund Manager");
    });
  });

  it("should put 10000000 units held by fundmanager", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.queryUnits.call(accounts[0]);
    }).then(function(unitsAvaliable) {
      assert.equal(unitsAvaliable.valueOf(), 10000000, "10000000 wasn't held by Fund Manager");
    });
  });

  it("should have unit price of 10000 Wei", function() {
    return XMFund.deployed().then(function(instance) {
      return instance.queryUnitPrice.call(accounts[0]);
    }).then(function(unitPrice) {
      assert.equal(unitPrice.valueOf(), 10000, "10000 wasn't unit price");
    });
  });

  it("should have total fund price of 10000 * 10000000 Wei = 100000000000", function() {
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
