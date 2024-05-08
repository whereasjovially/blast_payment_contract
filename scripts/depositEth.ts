import { ethers } from 'hardhat'

async function main() {
  const vaultAddress: string = "0x86682b713e0e6d23f8f1df794676efffd7ee49a8"
  const ethAmountToDeposit: bigint = ethers.parseEther('0.0001')
  const vault = await ethers.getContractAt(
    "Vault",
    vaultAddress
  );

  const tx = await vault.depositETH({ value: ethAmountToDeposit });

  tx.wait();

  console.log(
    `Transaction to deposit ETH is sent to the blockchain. Check your transaction status: https://testnet.blastscan.io/tx/${tx.hash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});