import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Vault", async function () {
  const vaultAddress: string = "0x86682b713e0e6d23f8f1df794676efffd7ee49a8"
  const ethAmountToDeposit: bigint = ethers.parseEther('0.0001')
  const vault = await ethers.getContractAt(
    "Vault",
    vaultAddress
  );

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await vault.owner()).to.equal(owner.address);
    });
  });

}); 
