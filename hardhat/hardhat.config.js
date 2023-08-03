require('dotenv').config()
// require('@nomiclabs/hardhat-waffle')
// require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@typechain/hardhat");

const { API_URL, PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
}
