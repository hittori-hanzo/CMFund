pragma solidity ^0.4.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/XMFund.sol";

contract TestXMFund {

  function testInitialUnitPriceUsingDeployedContract() {
    XMFund fund = XMFund(DeployedAddresses.XMFund());

    uint unitPrice = 10000;

    Assert.equal(fund.queryUnitPrice(), unitPrice, "fund unit price is 10000 Wei initially");
  }

  function testInitialUnitsHeldWithXMFund() {
    XMFund fund = new XMFund();

    uint totalUnits = 10000000;

    Assert.equal(fund.getUnitsAvailable(), totalUnits, "Fund should have 10000000 units initially");
  }

  function testPurchase100UnitsinXMFund() {
    XMFund fund = new XMFund();

    uint totalUnits = 10000000;

    Assert.equal(fund.getUnitsAvailable(), totalUnits, "Fund should have 10000000 units initially");
  }

}
