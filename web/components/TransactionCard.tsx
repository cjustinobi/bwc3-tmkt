import Image from 'next/image'
import { ethers } from 'ethers'
import {
  approve,
  cancelService,
  timestampToDate,
  STATUS
} from '../utils'

interface TransactionCardProps {
  id: number
  businessName: string
  amount: number
  vendor: string
  image: string
  status: number
  created: number
  completed: number
  totalAmount: number
  getTransactionsHandler: () => void;
}



const TransactionCard: React.FC<TransactionCardProps> = ({
    id,
    businessName,
    amount,
    vendor,
    image,
    status,
    created,
    completed,
    totalAmount,
    getTransactionsHandler
   }) => {

  const approveHandler = async () => {
    await approve(id.toString(), vendor)
    getTransactionsHandler()
  }

  const cancelHandler = async () => {
    await cancelService(id.toString(), vendor)
    getTransactionsHandler()
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
            <p className='text-sm font-medium text-bright-grey-1'>Rate/hr</p>
            <p className='text-sm font-normal text-white'>{ethers.utils.formatEther(amount)} FTM</p>
          </div>
          {/* <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium text-bright-grey-1'>Total Earns</p>
            <p className='text-sm font-normal text-white'>{totalAmount}</p>
          </div> */}
        </div>

        <div className='flex flex-row w-full justify-between'>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium text-bright-grey-1'>Created</p>
            <p className='text-sm font-normal text-white'>{timestampToDate(created)}</p>
          </div>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium text-bright-grey-1'>Completed</p>
            <p className='text-sm font-normal text-white'>{status === 3 ? timestampToDate(completed) : ''}</p>
          </div>
        </div>

        <div className="absolute top-0 right-2 shadow-[0_4px_9px_-4px_#e4a11b]">
          <style jsx>{`
          .status {
            color: #fefefe;
            border-radius: 8px;
            padding: 3px;
          }
        .Cancelled { background: #ffcbcb; }
        .InProgress { background: LightSteelBlue; }
        .Reviewing { background: grey; }
        .Completed { background: green; }
      `}</style>
          <span className={`status ${STATUS(status)}`}>{STATUS(status)}</span>
        </div>
        {((STATUS(status) === 'InProgress') || (STATUS(status) === 'Reviewing')) && <div className="flex justify-between">
          <button onClick={cancelHandler} className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-yellow-1 to-red-1 rounded-lg'>
            <span className='text-sm font-normal text-white'>Cancel</span>
            <Image className='w-2' src={require('../assets/img/cancel.png')} alt="app pix" />
          </button>
          <button onClick={approveHandler} className="flex flex-row space-x-2 ml-1 items-center justify-center w-full py-3 bg-gradient-to-tr from-blue-1 to-green-1 rounded-lg">
            <span className='text-sm font-normal text-white'>Approve</span>
            <Image className='w-2' src={require('../assets/img/vector-arrow.svg')} alt="app pix" />
          </button>
        </div>}
      </div>
    </div>
  )
}

export default TransactionCard
