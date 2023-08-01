require('dotenv').config()
require('@nomiclabs/hardhat-waffle')
require("@nomicfoundation/hardhat-toolbox")

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
    },
    etherscan: {
      apiKey: {
        opera: "FUVX96N1IWNNKBZEV6EESMDPAATP9H5CB1"
      }
    },
  }
}
