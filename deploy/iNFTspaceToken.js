const {int} = require("hardhat/internal/core/params/argumentTypes");

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms)
  });
}

let name = "iNFTspaceToken";
let symbol = "INS";
let issuer = "0x604e91519c3F515D93050AE3B909d9AD037085b5";
let supply = "1000000000000000000000000000000";

const func = async ({ getNamedAccounts, deployments, network }) => {
  const { AddressZero } = ethers.constants;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log('deployer is ', deployer)

  const options = { from: deployer };

  // Construction parameters
  const params = [
    name,
    symbol,
    issuer,
    supply,
  ];

  const contract = await deploy('iNFTspaceToken', {...options, args: params});

  if (network.live) {
    signer = await ethers.getNamedSigner('deployer');
  } else {
    await network.provider.request({ method: "hardhat_impersonateAccount", params: [ signer ]});
    signer = await ethers.getSigner(signer);
  }

  console.log('1. V1 iNFTspaceToken has deployed at:', contract.address);

  console.log('    wait iNFTspaceToken deployed, it will token one minute or more，Please be patient ');


  let waitTime = 60; // 60 s wait scan indexed
  for (var i = 0; i< waitTime; i++){
    await sleep(1000);
    if ( i%3 === 0) {
      console.log('  wait deploy completed after', waitTime - i, " s");
    }
  }

  verifyAddress = contract.address;
  // verifyAddress = '0xEd4aca02bC521641b6eDdCD1e3C7c404B5134404';
  await run("verify:verify", {
    address: verifyAddress,
    constructorArguments: params
  });
  console.log('1. V1 iNFTspaceToken has verifyed');

  return network.live;
};

func.id = 'deploy_iNFTspaceToken_v1';
module.exports = func;
