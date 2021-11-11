// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256} = require('ethereumjs-util')
const {BigNumber} = require("ethers");

describe("iNFTspaceBlind V1", function () {

  let Blind;
  let hardhatBlind;
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
    Blind = await ethers.getContractFactory("iNFTspaceBlind");
    [owner, singer, baseMinter, minter, ...addrs] = await ethers.getSigners();

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
      // add remove singer
      await hardhatBlind.addSigner(singer.address);
      expect(await hardhatBlind.isSigner(singer.address)).to.equal(true);

      // remove singer
      await hardhatBlind.removeSigner(singer.address);
      expect(await hardhatBlind.isSigner(singer.address)).to.equal(false);

      // reset singer
      await hardhatBlind.addSigner(singer.address);
      expect(await hardhatBlind.isSigner(singer.address)).to.equal(true);

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
      await hardhatBlind.addSigner(singer.address);
      expect(await hardhatBlind.isSigner(singer.address)).to.equal(true);

      // increase minter work times
      await  hardhatBlind.connect(singer).increaseMinterWorkTimes(minter.address, 10);
      let minterInfo = await hardhatBlind.minters(minter.address)
      expect(minterInfo.remainMintWorks).to.equal(10);

      // mint the nft
      //  cal sig
      let mintHash = await ethers.utils.solidityKeccak256(["uint160","uint160", "uint256", "uint256", "string"], [hardhatBlind.address,minter.address, id, value, uri]);
      let mintHashBytes = ethers.utils.arrayify(mintHash)
      let mintSig = await singer.signMessage(mintHashBytes);
      let sigSplit = await  ethers.utils.splitSignature(mintSig);
      //  mint
      await  hardhatBlind.connect(minter).mint(sigSplit.v, sigSplit.r, sigSplit.s, id, value, uri, fee);
      let balance = await hardhatBlind.balanceOf(minter.address, id);
      expect(balance).to.equal(value);

      console.log("\t Mint test done");
    });
  });

  // TODO: 正式上线需要删除
  describe("Hash", function () {
    it("Should cal hash is ok", async function () {
      // mint info
      let id = 1;
      let value = 10;
      let uri = "test ipfs uri";

      // mint info
      //  cal sig
      let mintHash = await ethers.utils.solidityKeccak256(["uint160", "uint256", "uint256", "string"], [hardhatBlind.address, id, value, uri]);
      let contractCalHash = await  hardhatBlind.connect(minter).verifyHash(id, value, uri);
      expect(mintHash).to.equal(contractCalHash);
      console.log("\t Hash test done");
    });
  });
});
