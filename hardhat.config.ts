import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: {
      "blast-sepolia": "blast_sepolia", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "blast-sepolia",
        chainId: 168587773,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://sepolia.blastexplorer.io"
        }
      }
    ]
  },
  networks: {
    // for mainnet
    "blast-mainnet": {
      url: "coming end of February",
      // accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for Sepolia testnet
    "blast-sepolia": {
      url: "https://sepolia.blast.io",
      accounts: ["6e7b8ba6af90cfb31c9593ebc87c88d225de867a62c282bea4b7a02dbbc6ffa3", "3203778b28f5b3930f9c9a6b6298587fa16f9ea908e1d120c047d98509921d79"],
      gasPrice: 1000000000,
    },
    // for local dev environment
    "blast-local": {
      url: "http://localhost:8545",
      // accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },
  defaultNetwork: "blast-sepolia",
  sourcify: {
    enabled: true
  }
};

export default config;
