# iNFTspaceContract

## install depends
npm install

## rinkeby testnet
### compile the contract
npx hardhat --network rinkeby compile
### deploy the contract
npx hardhat --network rinkeby deploy
### verify the contract
npx hardhat verify --network rinkeby 0xF6DA9E98DC9A072F8e2630cb72E613aCC532B129

https://rinkeby.etherscan.io/address/0xF6DA9E98DC9A072F8e2630cb72E613aCC532B129#code


### single deploy contract 
```
npx hardhat --network rinkeby run scripts/002_iNFTspaceBlindV1.deploy.js
```
### single test contract
```
npx hardhat test test/002_iNFTspaceBlindV1.test.js
```

## TODO:


