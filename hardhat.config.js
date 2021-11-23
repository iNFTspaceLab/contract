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
    //apiKey: "QHSTPZUM8UCKX3RY6TTUI2YIAXYCIKK7I4" // Etherscan
    //apiKey: "HM458I3G7GRBG9N1RWN5RE9FAZTYQEDKUB" //polygonscan
	apiKey: "JK3XU5RQYNBR83IZAUXSQRUU9ICWW6BVYR" //bscscan

  },
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991']
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991']
    },
    mainnet: {
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991']
    },
    polygon_mumbai: {
      chainId: 80001,
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991'],
    },
    polygon: {
      chainId: 137,
      url: 'https://rpc-mainnet.matic.network',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991']
    },
	 bsc_mainnet: {
      chainId: 56,
      url: 'https://bsc-dataseed1.defibit.io/',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991']
    },
	bsc_testnet: {
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
      accounts: ['e85410ce015417a562ba31b61e0d77ef5fe8183905d82777ca4a3cd9b7237991']
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
