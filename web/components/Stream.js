import { useState } from 'react'
import { ethers } from 'ethers'
import { Framework } from '@superfluid-finance/sdk-core'
import { Web3Provider } from "@ethersproject/providers"

async function createNewFlow(recipient, flowRate) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = provider.getSigner()


  const sf = await Framework.create({
    chainId: 80001,
    provider: provider
  })
  const superSigner = sf.createSigner({
     signer: signer
    // provider,
    // privateKey: '8a1f65dcf75e7bdef838c7e30c9dff47581ddb31b8fb00d21f1cd5206b048a32'
    })

    // MetaMask example
    
// const metamaskProvider = new Web3Provider(window.ethereum);
// const superSigner = sf.createSigner({ web3Provider: metamaskProvider })
  
const maticx = await sf.loadSuperToken("MATICx")

  console.log('maticx')
  console.log(maticx)

  // const approveOperation = maticx.approve({ receiver: recipient, amount: ethers.utils.parseUnits("0.06").toString() });
 console.log('approveOperation')
// return console.log(await approveOperation.exec(superSigner))
  try {
    // maticx.approve({ receiver: recipient, amount: ethers.utils.parseUnits("0.06").toString() })
    const createFlowOperation = maticx.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate
    })

    console.log(createFlowOperation)
    console.log("Creating your stream...")

    const result = await createFlowOperation.exec(superSigner)
    console.log(result)

    console.log(
      `Congrats - you've just created a money stream!
    `
    )
  } catch (error) {
    console.log("Error: ", error)
    console.error(error)
  }
}


const Stream = () => {

  const [flowRateDisplay, setFlowRateDisplay] = useState("")
  const [flowRate, setFlowRate] = useState("")
  const [recipient, setRecipient] = useState("")


const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value))
  }

  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value))
    let newFlowRateDisplay = calculateFlowRate(e.target.value)
    if (newFlowRateDisplay) {
      setFlowRateDisplay(newFlowRateDisplay.toString())
    }
  }

  function calculateFlowRate(amount) {
    if (Number(amount) === 0) {
      return 0
    }
    const amountInWei = ethers.BigNumber.from(amount)
    const monthlyAmount = ethers.utils.formatEther(amountInWei.toString())
    // @ts-ignore
    const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30
    return calculatedFlowRate
  }

  return (
            <div className="flex flex-col items-start">
        <input
          value={recipient}
          placeholder="Enter recipient address"
          onChange={handleRecipientChange}
          className='text-black py-1 px-2 mb-2 w-72'
        />
        <input
          value={flowRate}
          onChange={handleFlowRateChange}
          placeholder="Enter a flowRate in wei/second"
          className='text-black py-1  px-2 w-72'
        />
        <button
          className="px-8 py-2 rounded-3xl bg-white text-black mt-2"
          onClick={() => {
            createNewFlow(recipient, flowRate)
          }}
        >
          Click to Create Your Stream
        </button>
        <a className="mt-4 text-green-400" href="https://app.superfluid.finance/" target="_blank" rel='no-opener'>View Superfluid Dashboard</a>
      </div>
  )

}

export default Stream