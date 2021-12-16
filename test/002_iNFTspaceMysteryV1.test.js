// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256} = require('ethereumjs-util')
const {BigNumber, Bytes} = require("ethers");

describe("iNFTspaceMystery V1", function () {

  let Mystery;
  let hardhatMystery;
  let owner;
  let singer;
  let baseMinter;
  let minter;
  let addrs;

  let mintWorkFee = "100000000000000000";  //0.1 ether;
  let rewardThresholdWorks = 10;
  let contractURI = "";
  let tokenURIPrefix = "";

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Mystery = await ethers.getContractFactory("iNFTspaceMystery");
    [owner, singer, baseMinter, minter, ...addrs] = await ethers.getSigners();

    hardhatMystery = await Mystery.deploy(mintWorkFee, rewardThresholdWorks, contractURI, tokenURIPrefix);

  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      expect(await hardhatMystery.owner()).to.equal(owner.address);
    });
  });

  describe("Configuration", function () {
    it("Should add singer and remove singer is ok", async function () {
      // add remove singer
      await hardhatMystery.addSigner(singer.address);
      expect(await hardhatMystery.isSigner(singer.address)).to.equal(true);

      // remove singer
      await hardhatMystery.removeSigner(singer.address);
      expect(await hardhatMystery.isSigner(singer.address)).to.equal(false);

      // reset singer
      await hardhatMystery.addSigner(singer.address);
      expect(await hardhatMystery.isSigner(singer.address)).to.equal(true);

      console.log("\t Configuration test done");
    });
  });

  describe("Mint", function () {
    it("Should pay times and mint is ok", async function () {
      // mint1
      let id = 1;
      let value = 10;
      let uri = "test ipfs uri";
      let fee = [{recipient:owner.address, value:100}];

      // add singer
      await hardhatMystery.addSigner(singer.address);
      expect(await hardhatMystery.isSigner(singer.address)).to.equal(true);

      // increase minter work times
      await  hardhatMystery.connect(singer).increaseMinterWorkTimes(minter.address, 10, []);
      let minterInfo = await hardhatMystery.minters(minter.address)
      expect(minterInfo.remainMintWorks).to.equal(10);

      // mint the nft
      //  cal sig
      let chainId = (await ethers.provider.getNetwork()).chainId
      let mintHash = await ethers.utils.solidityKeccak256(["uint256", "uint160","uint160", "uint256", "uint256", "string"], [chainId, hardhatMystery.address,minter.address, id, value, uri]);
      let mintHashBytes = ethers.utils.arrayify(mintHash)
      let mintSig = await singer.signMessage(mintHashBytes);
      let sigSplit = await  ethers.utils.splitSignature(mintSig);
      //  mint
      await  hardhatMystery.connect(minter).mint(sigSplit.v, sigSplit.r, sigSplit.s, id, value, uri, fee);
      let balance = await hardhatMystery.balanceOf(minter.address, id);
      expect(balance).to.equal(value);

      console.log("\t Mint test done");
    });
  });
});
