import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from 'hardhat'

const LockModule = buildModule("LockModule", (m) => {

  const blastYield = "0x4300000000000000000000000000000000000002"
  const initialOwner = "0x8aC112a5540f441cC9beBcC647041A6E0D595B94"
  const pointsOperator = initialOwner
  const gov = initialOwner
  const playPrice = hre.ethers.parseEther("0.0001")
  const killReward = hre.ethers.parseEther("0.00001")
  const initValue = hre.ethers.parseEther("0.00001")
  const blastPoints = "0x2fc95838c71e76ec69ff817983BFf17c710F34E0"
  const lock = m.contract("Vault", [blastYield, pointsOperator, blastPoints, initialOwner, gov, playPrice, killReward], {
    value: initValue,
  });

  return { lock };
});

export default LockModule;
