import { useState, useEffect, Key } from 'react'
import { useAccount } from 'wagmi'
import { getTransactions } from '@/utils'
import TransactionCard from '@/components/TransactionCard'

const MyTransactions = () => {

  const { address } = useAccount()

  const [masaAddress, setMasaAddress] = useState('')
  const [transactions, setTransactions] = useState(undefined)

  const getTransactionsHandler = async () => {
    setTransactions(await getTransactions(address))
  }


  useEffect(() => {
    getTransactionsHandler()

  }, [address])

  return (

    <div className="bg-black-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
      <div className='flex flex-col items-center justify-center w-full'>
        {!transactions && <h1 className="font-bold text-xl text-white">You have no transaction yet</h1>}
        <div className='my-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {transactions && transactions.map(tx => (
            <TransactionCard
              key={tx.transactionIndex}
              id={tx.transactionIndex}
              vendor={tx.vendor}
              image={tx.filePath}
              amount={tx.amount.toString()}
              businessName={tx.businessName}
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

export default MyTransactions