async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

async function main() {

    let paramsCommand = [];
    if (typeof(process.env.ConfigurationArguments)=="undefined"){
        console.error('the Configuration Argument env in not set');
        process.exit(1);
    } else{
        // Remove Spaces, quotes, etc
        paramsCommand = process.env.ConfigurationArguments.replace(new RegExp(" ", 'g'),"").replace(new RegExp("'", 'g'),"").replace(new RegExp("\"", 'g'), "").split(",");
        if(paramsCommand.length !== 2) {
            console.error('the Configuration Argument must 2 argument');
            process.exit(1);
        }
    }
    let iNFTspaceTokenAddress = paramsCommand[0];
    let ownerAddress = paramsCommand[1];

    console.log("Configuration Argument is as follows:");
    console.log("\tiNFTspaceTokenAddress:", iNFTspaceTokenAddress);
    console.log("\townerAddress:", ownerAddress);


    const [ deployer ] = await ethers.getSigners();
    console.log('deployer is ', deployer.address);

    // deployed check
    const contractFactory = await ethers.getContractFactory("contracts/iNFTspaceToken.sol:iNFTspaceToken");
    const contract = new ethers.Contract(iNFTspaceTokenAddress, contractFactory.interface, ethers.provider);
    await contract.deployed();
    console.log('1. V1 iNFTspaceToken has deployed at:', contract.address);

    // check and set the owner
    let curOwner = await contract.owner();

    if (curOwner !== ownerAddress) {
        console.log('   V1 iNFTspaceToken current owner address is:', curOwner);
        await  contract.connect(deployer).transferOwnership(ownerAddress);
        console.log('   V1 iNFTspaceToken owner address set to:', ownerAddress);
    } else {
        console.log('   V1 iNFTspaceToken address already is:', ownerAddress);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
