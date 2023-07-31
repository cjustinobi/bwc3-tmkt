import { providers, Contract, ethers } from 'ethers'
import Tmkt from '../Tmkt.json'
import { priceToWei } from './helpers'

export const contractAddress = '0x3d61d0b5E56f2b87D6C2c452F4D94DaE172042eA'
// export const contractAddress = '0x3DfC2625D69957d8a7Be29eDD25b74165bE10e60' // testnet

export async function getContract(useProvider = false) {

  let contract

  try {
    const { ethereum } = window

    const provider = new providers.Web3Provider(ethereum)
    // const provider = new ethers.providers.JsonRpcProvider('https://rpcapi.fantom.network')
    const signer = provider.getSigner()
    contract = new Contract(contractAddress, Tmkt.abi, useProvider ? provider : signer)

  } catch (error) {
    console.log("ERROR:", error)
  }
  return contract
}

export const createAccount = async (name, service, imagePath, description, serviceCharge) => {

  try {
    const contract = await getContract()
    const res = await contract.createVendor(name, service, imagePath, description, priceToWei(serviceCharge))
    return await res.wait()
  } catch (e) {
    console.log(e)
  }
}

export const getVendors = async () => {
  try {
    const contract = await getContract(true)
    const vendorCount = await contract.getVendorCount()

    let vendors = []

    for (let i = 0; i < vendorCount; i++) {
      const vendor = await contract.getVendors(i)
      vendors.push(vendor)
    }
    return vendors

  } catch (e) {
    console.log(e)
  }
}


export const getTransactions = async address => {
  try {
    const contract = await getContract()
    const txCount = await contract.getTransactionCount()

    let txs = []

    for (let i = 0; i < txCount; i++) {
      const tx = await contract.getTransactions(i, address)
      txs.push(tx)
    }
    console.log('txs')
    console.log(txs)
    return txs

  } catch (e) {
    console.log(e)
  }
}

export const getVendorTransactions = async address => {
  try {
    const contract = await getContract()
    const txCount = await contract.getVendorTransactionCount()

    let txs = []

    for (let i = 0; i < txCount; i++) {
      const tx = await contract.getVendorTransactions(i, address)
      txs.push(tx)
    }
    return txs

  } catch (e) {
    console.log(e)
  }
}

export const createTransaction = async (index, address, value) => {

  try {
    const contract = await getContract()
    let res = await contract.createTransaction(index, address, {value})
    res = await res.wait()
    return res

  } catch (e) {
    console.log(e)
  }
}

export const approve = async (index, vendorAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.confirmService(index, vendorAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}

export const sendForReview = async (index, customerAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.serviceReviewing(index, customerAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}


export const cancelService = async (index, customerAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.cancelService(index, customerAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}

export const vendorCancelService = async (index, customerAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.vendorCancelService(index, customerAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}


// https://assets-global.website-files.com/5f734f4dbd95382f4fdfa0ea/6477612c7b45fceaade84942_amazon-web-services.png
