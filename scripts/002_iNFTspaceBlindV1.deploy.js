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
    const tokenURIPrefix = "";

    // Construction parameters
    const params = [
        mintWorkFee,
        rewardThresholdWorks,
        contractURI,
        tokenURIPrefix,
    ];

    // deploy
    const blind = await deploy('iNFTspaceBlind', {
       from: deployer.address,
       args: params
    }).then(s => ethers.getContractAt(s.abi, s.address, deployer));

    console.log('1. V1 iNFTspaceBlind has deployed at:', blind.address);

    console.log('    wait iNFTspaceBlind deployed, it will token one minute or more，Please be patient ');

    await blind.deployed();

    // let waitTime = 1; // 60s
    // for (var i = 0; i< waitTime; i++){
    //     await sleep(1000);
    //     if ( i%3 == 0) {
    //         console.log('  wait deploy completed after', waitTime - i, " s");
    //     }
    // }

    // verify
    await run("verify:verify", {
        address: blind.address,
        constructorArguments: params
    });

    console.log('2. V1 iNFTspaceBlind has verifyed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
