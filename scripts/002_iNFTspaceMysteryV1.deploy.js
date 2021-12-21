async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

async function main() {
    const { deploy } = deployments;
    const [ deployer ] = await ethers.getSigners();

    console.log('deployer is ', deployer.address)

    const mintWorkFee = "100000000000000000";  //0.1 ether;
    const rewardThresholdWorks = 10;
    const contractURI = "";
    const tokenURIPrefix = "ipfs://";

    // Construction parameters
    const params = [
        mintWorkFee,
        rewardThresholdWorks,
        contractURI,
        tokenURIPrefix,
    ];

    // deploy
    const contract = await deploy('iNFTspaceMystery', {
       from: deployer.address,
       args: params
    }).then(s => ethers.getContractAt(s.abi, s.address, deployer));

    console.log('1. V1 iNFTspaceMystery has deployed at:', contract.address);

    console.log('    wait iNFTspaceMystery deployed, it will token one minute or more，Please be patient ');

    await contract.deployed();

    let waitTime = 1; // 30 s wait scan indexed
    for (var i = 0; i< waitTime; i++){
        await sleep(1000);
        if ( i%3 == 0) {
            console.log('  wait deploy completed after', waitTime - i, " s");
        }
    }

    // verify
    await run("verify:verify", {
        address: contract.address,
        constructorArguments: params
    });

    console.log('2. V1 iNFTspaceMystery has verifyed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
