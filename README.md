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
npx hardhat --network rinkeby run scripts/deploy_iNFTspaceBlind_v1.js
```

## TODO:

1. Determining contract parameters
2. Determine the SYMBOL of NFT
3. Add a local test script

