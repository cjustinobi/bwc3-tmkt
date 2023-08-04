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

  
  await sf.loadSuperToken("CELOx")

  const createFlowOps = sf.cfaV1.createFlow({
    sender: '0x6ad513fDA973Bf1FC24c04256D686CbE05d714c7',
    receiver: recipient,
    flowRate: calculateFlowRate(amount),
    superToken: '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4'
  })

  return await createFlowOps.exec(superSigner)
 
}

 export const calculateFlowRate = (amount) => {
  
  if (Number(amount) === 0) {
    return 0
  }
  const amountInWei = ethers.BigNumber.from(amount)
  const hourlyAmount = ethers.utils.formatEther(amountInWei.toString())

  const calculatedFlowRate = hourlyAmount * 3600 * 30 * 24
  return calculatedFlowRate
}