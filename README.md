# INFTspace Contract

## install depends
npm install
## compile the contract
compile the contract use this command
```bash
npx hardhat --network <network> compile
```
such as use the eth network compile the contracts
```bash
npx hardhat --network mainet compile
```

## test contract
```
npx hardhat --network hardhat compile
npx hardhat --network hardhat test 
```

## deploy the contract
use the deploy script and constructor arguments env deploy the contract
such as use this command deploy the iNFTspaceToken contract
```bash
env ConstructorArguments="<name>,<symbol>,<issuer>,<supply>" npx hardhat --network <network> run scripts/deploy.iNFTspaceTokenV1.js
```
such as use the mainnet network deploy the iNFTspaceToken contract
```bash
env ConstructorArguments="iNFTspaceToken,INS,0x604e91519c3F515D93050AE3B909d9AD037085b5,1000000000000000000000000000000" npx hardhat --network mainnet run scripts/deploy.iNFTspaceTokenV1.js
```
## verify the contract
use the verify script and verify arguments env verify the contract
such as use this command verify the iNFTspaceToken contract
```bash
env VerifyArguments="<iNFTspaceToken contract address>,<name>,<symbol>,<issuer>,<supply>" npx hardhat --network <network> run scripts/verify.iNFTspaceTokenV1.js
```
such as use the mainnet network verify the iNFTspaceToken contract
```bash
env VerifyArguments="0x9f6320c12d2Ae46122e5982089b8Fd6Ce6bd0f86,iNFTspaceToken,INS,0x604e91519c3F515D93050AE3B909d9AD037085b5,1000000000000000000000000000000" npx hardhat --network mainnet run scripts/verify.iNFTspaceTokenV1.js
```

## configuration the contract
use the configuration script and configuration arguments env configuration the contract
such as use this command configuration the iNFTspaceToken contract
```bash
env ConfigurationArguments="<iNFTspaceToken contract address>,<OwnerAddress>" npx hardhat --network <network> run scripts/configuration.iNFTspaceTokenV1.js
```
such as use the mainnet network verify the iNFTspaceToken contract
```bash
env ConfigurationArguments="0x9f6320c12d2Ae46122e5982089b8Fd6Ce6bd0f86,0x604e91519c3F515D93050AE3B909d9AD037085b5" npx hardhat --network mainnet run scripts/configuration.iNFTspaceTokenV1.js
```

## Contract Deploy Detail
### iNFTspaceToken polygon mumbai Testnet Deploy
```bash
npx hardhat --network polygon_mumbai compile
#ConstructorArguments="<name>,<symbol>,<issuer>,<supply>"
env ConstructorArguments="iNFTspaceToken,INS,0x604e91519c3F515D93050AE3B909d9AD037085b5,1000000000000000000000000000000" npx hardhat --network polygon_mumbai run scripts/deploy.iNFTspaceTokenV1.js
#VerifyArguments="<iNFTspaceToken contract address>,<name>,<symbol>,<issuer>,<supply>"
env VerifyArguments="0x95d7459df5a293118382B3794Ff76d30389618a3,iNFTspaceToken,INS,0x604e91519c3F515D93050AE3B909d9AD037085b5,1000000000000000000000000000000" npx hardhat --network polygon_mumbai run scripts/verify.iNFTspaceTokenV1.js
#ConfigurationArguments="<iNFTspaceToken contract address>,<OwnerAddress>"
env ConfigurationArguments="0x95d7459df5a293118382B3794Ff76d30389618a3,0x604e91519c3F515D93050AE3B909d9AD037085b5" npx hardhat --network polygon_mumbai run scripts/configuration.iNFTspaceTokenV1.js

```
### iNFTspaceToken  MainNet Deploy
```bash

```

## others

### single deploy contract 
```
npx hardhat --network bsc_testnet run scripts/deploy.iNFTspaceV1.js
```
### single test contract
```
npx hardhat test test/test.iNFTspaceMysteryV1.js
```

## TODO:




