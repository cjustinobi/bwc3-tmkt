import {
  sendForReview,
  vendorCancelService,
  timestampToDate,
  STATUS,
  truncate
} from '../utils'
import Image from 'next/image'

interface TransactionCardProps {
  id: number
  customer: string
  status: number
  created: number
  completed: number
  getTransactionsHandler: () => void;
}

const JobCard: React.FC<TransactionCardProps> = ({
    id,
    customer,
    status,
    created,
    completed,
    getTransactionsHandler
   }) => {

  const reviewHandler = async () => {
    await sendForReview(id.toString(), customer)
    getTransactionsHandler()
  }

  const cancelHandler = async () => {
    await vendorCancelService(id.toString(), customer)
    getTransactionsHandler()
  }

  return (
    <div className='bg-gradient-to-b from-blue-1 to-green-1 rounded-2xl p-[1px] w-[250px]'>
      <div className='bg-dark-grey-1 space-y-2 relative rounded-2xl p-4 h-full text-white'>

        <p className='text-xl font-bold leading-6 text-start text-white'>
          {truncate(customer)}
        </p>

        <div className='flex flex-row w-full justify-between'>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium text-bright-grey-1'>Created</p>
            <p className='text-sm font-normal text-white'>{timestampToDate(created)}</p>
          </div>
          <div className='flex w-fit flex-col items-start justify-center'>
            <p className='text-sm font-medium text-bright-grey-1'>Completed</p>
            <p className='text-sm font-normal text-white'>{status === 3 ? timestampToDate(completed) : 0}</p>
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
        {(STATUS(status) === 'InProgress') && <div className="flex justify-between">
          <button onClick={cancelHandler} className='flex flex-row space-x-2 items-center justify-center w-full py-3 bg-gradient-to-b from-yellow-1 to-red-1 rounded-lg'>
            <span className='text-sm font-normal text-white'>Cancel</span>
            <Image className='w-2' src={require('../assets/img/cancel.png')} alt="app pix" />
          </button>
          <button onClick={reviewHandler} className="flex flex-row space-x-2 ml-1 items-center justify-center w-full py-3 bg-gradient-to-tr from-blue-1 to-green-1 rounded-lg">
            <span className='text-sm font-normal text-white'>Submit</span>
            <Image className='w-2' src={require('../assets/img/vector-arrow.svg')} alt="app pix" />
          </button>
        </div>}
      </div>
    </div>


      // <div className="bg-white rounded-lg shadow-lg p-4">
      //   <h2 className="font-light">{truncate(customer)}</h2>
      //   <small className="block">Created: {timestampToDate(created)}</small>
      //   <small>Completed: {status === 3 ? timestampToDate(completed) : ''}</small>
      //   <div className="flex justify-between mt-3">
      //     <style jsx>{`
      //     .status {
      //       color: #fefefe;
      //       border-radius: 8px;
      //       padding: 0 3px;
      //     }
      //   .Cancelled { background: #ffcbcb; }
      //   .InProgress { background: LightSteelBlue; }
      //   .Reviewing { background: grey; }
      //   .Completed { background: green; }
      // `}</style>
      //     <span className={`status ${STATUS(status)}`}>{STATUS(status)}</span>
      //   </div>
      //
      //     {(STATUS(status) === 'Cancelled') && <button disabled className="mt-3 bg-slate-300 w-28 rounded">
      //       Cancelled
      //     </button>}
      //     {(STATUS(status) === 'InProgress') && <div className="flex justify-between">
      //       <button onClick={cancelHandler} className="mt-3 mr-1 bg-slate-200 w-28 rounded">
      //         Cancel
      //       </button>
      //       <button onClick={reviewHandler} className="mt-3 ml-1 bg-[#87CEEB] w-28 rounded">
      //         Submit
      //       </button>
      //     </div>}
      // </div>
  )
}

export default JobCard
