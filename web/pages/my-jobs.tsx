import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getVendorTransactions } from '@/utils'
import JobCard from '@/components/JobCard'

const MyJobs = () => {

  const { address } = useAccount()

  const [transactions, setTransactions] = useState<any[]>([])

  const getTransactionsHandler = async () => {
    setTransactions(await getVendorTransactions(address))
  }

  useEffect(() => {
    getTransactionsHandler()

  }, [address])

  return (
    <div className="bg-black-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
      <div className='flex flex-col items-center justify-center w-full'>
        {!transactions && <h1 className="font-bold text-xl text-white">You have no job yet</h1>}
        <div className='my-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {transactions && transactions.map(tx => (
            <JobCard
              key={tx.transactionIndex}
              id={tx.transactionIndex}
              customer={tx.customer}
              created={tx.dateCreated.toString()}
              completed={tx.dateCompleted.toString()}
              status={tx.status}
              getTransactionsHandler={getTransactionsHandler}
            />
          ))}
        </div>
      </div>
    </div>

  )
}

export default MyJobs