import { ethers } from 'ethers'
import Image from 'next/image'
import { createTransaction } from '../utils'
import { useAccount } from 'wagmi'

interface VendorCardProps {
  id: string
  image: string
  rating: string
  earnings: string
  transactionCount: string
  businessName: string
  price: number
  vendor: string
  getVendorsHandler: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
   id,
   rating,
   earnings,
   transactionCount,
   image,
   businessName,
   price,
   vendor,
   getVendorsHandler
 }) => {

  const { address } = useAccount()

  const hire = async () => {
    await createTransaction(id, vendor, price.toString())
    getVendorsHandler()
  }

  return (

    <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px]'>
      <div className='bg-dark-grey-1 space-y-2 relative rounded-2xl p-4 h-full text-white'>
        <Image
          src={image}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '100%', height: '200px' }}
          alt="business image"
        />
        <p className='text-xl my-2- font-bold leading-6 text-start text-white'>
          {businessName}
        </p>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rate/hr</p>
            <p className='text-sm font-normal leading-5 text-white'>{ethers.utils.formatEther(price)} FTM</p>
          </div>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium leading-5 text-bright-grey-1'>Total Earns</p>
            <p className='text-sm font-normal leading-5 text-white'>{ethers.utils.formatEther(earnings)} FTM</p>
          </div>
        </div>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium leading-5 text-bright-grey-1'>Rating</p>
            <p className='text-sm font-normal leading-5 text-white'>{rating}</p>
          </div>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium leading-5 text-bright-grey-1'>Transaction</p>
            <p className='text-sm font-normal leading-5 text-white'>{transactionCount}</p>
          </div>
        </div>
        {(vendor !== address) && <button onClick={hire} className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-blue-1 to-green-1 rounded-lg'>
          <span className='text-sm font-normal leading-5 text-white'>Hire</span>
          <Image className='w-2' src={require('../assets/img/vector-arrow.svg')} alt="app pix" />
        </button>}
      </div>
    </div>
  )
}

export default VendorCard
