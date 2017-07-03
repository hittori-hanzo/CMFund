pragma solidity ^0.4.10;

import "./FundInterface.sol"; 

contract XMFund is FundInterface {

    address public fundManager;
    mapping (address => uint) public unitsHeld;
    uint private unitPrice;
    uint private unitsTotal;

    modifier onlyFundManager {
        if (msg.sender != fundManager) throw;
            _;
    }

    function XMFund() {
        fundManager = msg.sender;
        unitPrice = 10000;          //10,000 Wei
        unitsTotal = 10000000;      //10 million units
        unitsHeld[fundManager] = unitsTotal;
    }

    function purchase() payable returns (uint unitsPurchased) {
        uint purchaseValue = msg.value;

        if (purchaseValue <= 0 ){
            ErrorEvent(msg.sender,'Purchase must be greater than zero');
            return 0;
        }

        uint units = purchaseValue/unitPrice;

        if (unitsHeld[fundManager] < units ){
            ErrorEvent(msg.sender,'Insufficient units available for purchase');
            return 0;
        }
        
        unitsHeld[msg.sender] += units;  
        unitsHeld[fundManager] -= units;     
        PurchaseEvent(msg.sender,units,unitPrice);
        return units;
    }

    function sell(uint numberOfUnits) external returns (uint value) {
        if (numberOfUnits <= 0){
            SellEvent(msg.sender,0,0);
            return 0;
        }
        if (unitsHeld[msg.sender] < numberOfUnits) {
            ErrorEvent(msg.sender, "Insufficient units held");
            throw;
        }
        
        uint positionValue = numberOfUnits * unitPrice; 

        if(!msg.sender.send(positionValue)){
            ErrorEvent(msg.sender, "Failed to send funds");
            throw;
        }

        unitsHeld[msg.sender] -= numberOfUnits;
        unitsHeld[fundManager] += numberOfUnits;
        SellEvent(msg.sender,numberOfUnits,positionValue);
        return positionValue;
    } 

    function close() external returns (uint value) {
        address unitHolder = msg.sender;

        if (unitsHeld[unitHolder] <= 0){
            CloseEvent(unitHolder,0);
            return 0;
        }

        uint positionValue = unitsHeld[unitHolder] * unitPrice; 

        if(!msg.sender.send(positionValue)){
            ErrorEvent(unitHolder, "Failed to close fund account");
            throw;
        }

        unitsHeld[fundManager] = unitsHeld[fundManager] + unitsHeld[unitHolder];
        unitsHeld[unitHolder] = 0;
        CloseEvent(unitHolder, positionValue);
        return positionValue;
    }

    function queryValue() constant returns (uint value) {
        return unitsHeld[msg.sender]*unitPrice;
    }

    function queryUnits() constant returns (uint units) {
        return unitsHeld[msg.sender];
    }

    function getUnitsAvailable() constant returns (uint units){
        return unitsHeld[fundManager];
    }

    function queryUnitPrice() constant returns (uint value){
        return unitPrice;
    }

    function setUnitPrice(uint price) onlyFundManager constant returns (bool success){
        if (price <=0 ){
            ErrorEvent(fundManager,'unit price set: must be greater than zero');
            return false;
        }
        unitPrice = price;
        SetUnitPriceEvent(fundManager,unitPrice);
        return true;
    }

    function destroy() public payable { // so funds not locked in contract forever
        if (fundManager == msg.sender) {
            selfdestruct(fundManager);
        }
    }

    function () payable {
    }

}