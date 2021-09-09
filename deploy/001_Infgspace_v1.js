const func = async ({ getNamedAccounts, deployments, network }) => {
  const { AddressZero } = ethers.constants;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log('deployer is ', deployer)

  const options = { from: deployer };

  const Collection = '0x0f5Aa568c104eeCb5210950d4011C765b91453D1';
  const MaxWorks   = 10000;
  const minWorkFee   = "100000000000000000";  //0.1 ether;

  // Construction parameters
  const params = [
    Collection,
    MaxWorks,
    minWorkFee,
  ];

  const infgspace = await deploy('Infgspace', {...options, args: params});

  if (network.live) {
    signer = await ethers.getNamedSigner('deployer');
  } else {
    await network.provider.request({ method: "hardhat_impersonateAccount", params: [ signer ]});
    signer = await ethers.getSigner(signer);
  }

  console.log('1. V1 Infgspace has deployed at:', infgspace.address);

  verify
  verifyAddress = infgspace.address;
  // verifyAddress = '0x1dFe4482543a8088891684726A3d63059Aa0ea46';
  await run("verify:verify", {
    address: verifyAddress,
    constructorArguments: params
  });
  console.log('1. V1 Infgspace has verifyed');

  return network.live;
};

func.id = 'deploy_Infgspace_v1';
module.exports = func;
