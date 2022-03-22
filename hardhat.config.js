require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  namedAccounts: {
    deployer: {
      default: 0,
    },
    governor: {
      default: 1,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    //apiKey: "" // Etherscan
    apiKey: "" //polygonscan
	//apiKey: "" //bscscan

  },
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [''] // 
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [''] // 
    },
    mainnet: {
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [''] // 
    },
    polygon_mumbai: {
      chainId: 80001,
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [''], // 
    },
    polygon: {
      chainId: 137,
      url: 'https://rpc-mainnet.matic.network',
      accounts: [''] // 
    },
	 bsc_mainnet: {
      chainId: 56,
      url: 'https://bsc-dataseed1.defibit.io/',
      accounts: [''] // 
    },
	bsc_testnet: {
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
      gasPrice: 10000000000,
      accounts: [''] // 
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1337
          },
          "outputSelection": {
            "*": {
              "*": [
                "evm.bytecode",
                "evm.deployedBytecode",
                "abi"
              ]
            }
          },
          "metadata": {
            "useLiteralContent": true
          },
          "libraries": {}
        }
      },
      {
        version: "0.7.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          "outputSelection": {
            "*": {
              "*": [
                "evm.bytecode",
                "evm.deployedBytecode",
                "abi"
              ]
            }
          },
          "metadata": {
            "useLiteralContent": true
          },
          "libraries": {}
        }
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 1200000
  }
};
