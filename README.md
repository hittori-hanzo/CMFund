# XMFund
Example of a basic Fund implemented as a Smart contract. 

```
smart contract XMFund implemented in Solidity.

Operations:

 1. purchase() -msg.sender purchases msg.value worth of units, 
 2. sell() -msg.sender sells numberOfUnits back to fund, returns value in Wei
 3. close() -msg.sender sells all units back to fund, returns value in Wei
 4. queryValue() -returns value held in fund by msg.sender
 5. queryUnits() -returns number of units held by msg.sender
 6. getUnitsAvailable() -returns number of units available for purchase
 7. queryUnitPrice() -returns price per unit in Wei, held by msg.sender
 8. setUnitPrice() -fundManager sets unit price
 9. destroy()

```

## Running Tests
Start your testrpc then Execute `truffle test`

