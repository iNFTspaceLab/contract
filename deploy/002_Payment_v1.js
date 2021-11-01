const func = async ({ getNamedAccounts, deployments, network }) => {
  const { AddressZero } = ethers.constants;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log('deployer is ', deployer)

  const options = { from: deployer };

  const Collection = '0x0f5Aa568c104eeCb5210950d4011C765b91453D1';
  const minWorkFee   = "100000000000000000";  //0.1 ether;

  // Construction parameters
  const params = [
    Collection,
    MaxWorks,
    minWorkFee,
  ];

  const payment = await deploy('Payment', {...options, args: params});

  if (network.live) {
    signer = await ethers.getNamedSigner('deployer');
  } else {
    await network.provider.request({ method: "hardhat_impersonateAccount", params: [ signer ]});
    signer = await ethers.getSigner(signer);
  }

  console.log('1. V1 Payment has deployed at:', payment.address);

  verifyAddress = payment.address;
  // verifyAddress = '0xEd4aca02bC521641b6eDdCD1e3C7c404B5134404';
  await run("verify:verify", {
    address: verifyAddress,
    constructorArguments: params
  });
  console.log('1. V1 Payment has verifyed');

  return network.live;
};

func.id = 'deploy_Payment_v1';
module.exports = func;
