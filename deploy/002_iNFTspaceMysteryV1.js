const {int} = require("hardhat/internal/core/params/argumentTypes");

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms)
  });
}

const func = async ({ getNamedAccounts, deployments, network }) => {
  const { AddressZero } = ethers.constants;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log('deployer is ', deployer)

  const options = { from: deployer };

  const mintWorkFee = "100000000000000000";  //0.1 ether;
  const rewardThresholdWorks = 10;
  const contractURI = "";
  const tokenURIPrefix = "";

  // Construction parameters
  const params = [
      mintWorkFee,
      rewardThresholdWorks,
      contractURI,
      tokenURIPrefix,
  ];

  const contract = await deploy('iNFTspaceMystery', {...options, args: params});

  if (network.live) {
    signer = await ethers.getNamedSigner('deployer');
  } else {
    await network.provider.request({ method: "hardhat_impersonateAccount", params: [ signer ]});
    signer = await ethers.getSigner(signer);
  }

  console.log('1. V1 iNFTspaceMystery has deployed at:', contract.address);

  console.log('    wait iNFTspaceMystery deployed, it will token one minute or more，Please be patient ');

  await contract.deployed();

  let waitTime = 30; // 30 s wait scan indexed
  for (var i = 0; i< waitTime; i++){
    await sleep(1000);
    if ( i%3 == 0) {
      console.log('  wait deploy completed after', waitTime - i, " s");
    }
  }

  verifyAddress = contract.address;
  // verifyAddress = '0xEd4aca02bC521641b6eDdCD1e3C7c404B5134404';
  await run("verify:verify", {
    address: verifyAddress,
    constructorArguments: params
  });
  console.log('1. V1 iNFTspaceMystery has verifyed');

  return network.live;
};

func.id = 'deploy_iNFTspaceMystery_v1';
module.exports = func;
