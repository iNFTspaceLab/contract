// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("iNFTspaceBlind V1", function () {

  let Blind;
  let hardhatBlind;
  let owner;
  let singer1;
  let singer2;
  let minter1;
  let minter2;
  let addrs;

  let mintWorkFee = "100000000000000000";  //0.1 ether;
  let rewardThresholdWorks = 10;
  let contractURI = "";
  let tokenURIPrefix = "";

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Blind = await ethers.getContractFactory("iNFTspaceBlind");
    [owner, singer1, singer2, minter1, minter2, ...addrs] = await ethers.getSigners();

    hardhatBlind = await Blind.deploy(mintWorkFee, rewardThresholdWorks, contractURI, tokenURIPrefix);

  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      expect(await hardhatBlind.owner()).to.equal(owner.address);
    });
  });

  describe("Configuration", function () {
    it("Should add singer and remove singer is ok", async function () {
      // add singer1
      await hardhatBlind.addSigner(singer1.address);
      expect(await hardhatBlind.isSigner(singer1.address)).to.equal(true);

      // add remove singer2
      await hardhatBlind.addSigner(singer2.address);
      expect(await hardhatBlind.isSigner(singer2.address)).to.equal(true);

      // remove singer2
      await hardhatBlind.removeSigner(singer2.address);
      expect(await hardhatBlind.isSigner(singer2.address)).to.equal(false);

      console.log("\t Configuration test done");
    });
  });

  describe("Mint", function () {
    it("Should pay times and mint is ok", async function () {
      // mint1
      let id = 1;
      let value = 1;
      let uri = "test ipfs uri";
      let fee = {recipient:owner.address, value:100};


      console.log("\t Mint test done");
    });
  });

});
