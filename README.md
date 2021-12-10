# iNFTspaceContract

## install depends
npm install

## rinkeby testnet
### compile the contract
npx hardhat --network bsc_testnet compile
### deploy the contract
npx hardhat --network bsc_testnet deploy
### verify the contract
npx hardhat verify --network bsc_testnet 0xF6DA9E98DC9A072F8e2630cb72E613aCC532B129

https://rinkeby.etherscan.io/address/0xF6DA9E98DC9A072F8e2630cb72E613aCC532B129#code


### single deploy contract 
```
npx hardhat --network bsc_testnet run scripts/001_iNFTspaceV1.deploy.js
```
### single test contract
```
npx hardhat test test/002_iNFTspaceMysteryV1.test.js
```

## TODO:


