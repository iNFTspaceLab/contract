async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

async function main() {
    let paramsCommand = [];
    if (typeof(process.env.ConstructorArguments)=="undefined"){
        console.error('the constructor arguments env in not set');
        process.exit(1);
    } else{
        // Remove Spaces, quotes, etc
        paramsCommand = process.env.ConstructorArguments.replace(new RegExp(" ", 'g'),"").replace(new RegExp("'", 'g'),"").replace(new RegExp("\"", 'g'), "").split(",");
        if(paramsCommand.length !== 4) {
            console.error('the constructor arguments must 4 param');
            process.exit(1);
        }
    }
    // Construction parameters
    const constructorArguments = [
        paramsCommand[0], // Contract Name
        paramsCommand[1], // Contract Symbol
        paramsCommand[2], // issuer Address
        paramsCommand[3], // supply

    ];

    console.log("constructorArguments info is as follows:");
    console.log("\tContract Name:", constructorArguments[0]);
    console.log("\tContract Symbol:", constructorArguments[1]);
    console.log("\tContract issuer:", constructorArguments[2]);
    console.log("\tContract supply:", constructorArguments[3]);


    const { deploy } = deployments;
    const [ deployer ] = await ethers.getSigners();
    console.log('deployer is ', deployer.address);

    // deploy
    const contract = await deploy('iNFTspaceToken', {
       from: deployer.address,
       args: constructorArguments,
        log: true,
    }).then(s => ethers.getContractAt(s.abi, s.address, deployer));
    console.log('1. V1 iNFTspaceToken has deployed at:', contract.address);
    console.log('    wait iNFTspaceToken deployed, it will token one minute or more，Please be patient');
    await contract.deployed();
    console.log('2. V1 iNFTspaceToken has deployed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
