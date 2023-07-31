require('dotenv').config()
require('@nomiclabs/hardhat-waffle')
require("@nomicfoundation/hardhat-toolbox")

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    mainnet: {
      url: 'https://rpcapi.fantom.network',
      chainId: 250,
      accounts: [PRIVATE_KEY]
    },
    testnet: {
      url: 'https://rpc.testnet.fantom.network',
      chainId: 4002,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      opera: "FUVX96N1IWNNKBZEV6EESMDPAATP9H5CB1"
    }
  },
}
