import { Framework } from '@superfluid-finance/sdk-core'
import { ethers } from 'ethers'

export const createNewFlow = async (recipient, amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()

  const sf = await Framework.create({
    chainId: 42220,
    provider: provider
  })

  const superSigner = sf.createSigner({
     signer: signer
  })

  
const maticx = await sf.loadSuperToken("CELOx")

  const approveOperation = maticx.approve({ receiver: recipient, amount: ethers.utils.parseUnits(amount).toString() });

  return await approveOperation.exec(superSigner)
 
}

 export const calculateFlowRate = (amount) => {
  if (Number(amount) === 0) {
    return 0
  }
  const amountInWei = ethers.BigNumber.from(amount)
  const hourlyAmount = ethers.utils.formatEther(amountInWei.toString())

  const calculatedFlowRate = hourlyAmount * 3600 * 30
  return calculatedFlowRate
}