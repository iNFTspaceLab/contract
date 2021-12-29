async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

async function main() {
    let paramsCommand = [];
    if (typeof(process.env.VerifyArguments)=="undefined"){
        console.error('the Verify Arguments  env in not set');
        process.exit(1);
    } else{
        // Remove Spaces, quotes, etc
        paramsCommand = process.env.VerifyArguments.replace(new RegExp(" ", 'g'),"").replace(new RegExp("'", 'g'),"").replace(new RegExp("\"", 'g'), "").split(",");
        if(paramsCommand.length !== 5) {
            console.error('the Verify Arguments must 5 param');
            process.exit(1);
        }
    }

    const contractAddress =  paramsCommand[0];

    // Construction parameters
    const constructorArguments = [
        paramsCommand[1], // Contract Name
        paramsCommand[2], // Contract Symbol
        paramsCommand[3], // issuer
        paramsCommand[4], // supply
    ];

    console.log("VerifyArguments info is as follows:");
    console.log("\tContract Address:", contractAddress);
    console.log("\tContract Name:", constructorArguments[0]);
    console.log("\tContract Symbol:", constructorArguments[1]);
    console.log("\tContract issuer:", constructorArguments[2]);
    console.log("\tContract supply:", constructorArguments[3]);

    const [ deployer ] = await ethers.getSigners();
    console.log('deployer is ', deployer.address);

    // deployed check
    const iNFTspaceTokenFactory = await ethers.getContractFactory("contracts/iNFTspaceToken.sol:iNFTspaceToken");
    const contract = new ethers.Contract(contractAddress, iNFTspaceTokenFactory.interface, ethers.provider);
    await contract.deployed();
    console.log('1. V1 iNFTspaceToken has deployed at:', contract.address);

    // verify
    await run("verify:verify", {
        address: contract.address,
        constructorArguments: constructorArguments
    });

    console.log('2. V1 iNFTspaceToken has verifyed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
