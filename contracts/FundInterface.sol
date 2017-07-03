pragma solidity ^0.4.10;

contract FundInterface {
    // msg.sender purchases msg.value worth of units, 
    // returns number units purchased
    // @returns true on success false otherwise
    function purchase() payable returns (uint unitsPurchased);

    // msg.sender sells numberOfUnits back to fund, returns value in Wei
    // @throw if numberOfUnits > # units held by msg.sender
    // @returns unitHolding sold in Wei
    function sell(uint numberOfUnits) external returns (uint value);

    // msg.sender sells all units back to fund, returns value in Wei
    function close() external returns (uint value);

    // returns value held in fund by msg.sender
    function queryValue() constant returns (uint value);

    // returns number of units held by msg.sender
    function queryUnits() constant returns (uint units);

    // returns number of units available for purchase
    function getUnitsAvailable() constant returns (uint units);

    // returns price per unit in Wei, held by msg.sender
    function queryUnitPrice() constant returns (uint value);

    function destroy() public payable;

    function () payable;

    event PurchaseEvent(address unitBuyer, uint unitsBought, uint currentUnitPrice);
    event CloseEvent(address unitHolder, uint amount);
    event SellEvent(address unitHolder, uint unitsSold, uint holdingValue);
    event SetUnitPriceEvent(address fundManager, uint amount);
    event ErrorEvent(address client, string desc);

}