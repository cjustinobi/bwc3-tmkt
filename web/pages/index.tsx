import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useProvider, useSigner, useAccount } from 'wagmi'
import { getVendors } from '../utils'
import VendorCard from '../components/VendorCard'
import CreateAccountModal from "@/components/CreateAccountModal";

interface UserData {
  id: string;
  rating: string;
  earnings: string;
  transactionCount: any;
  image: any;
  businessName: any;
  price: any;
  vendor: any;
}

const Home = () => {

  const [accountModal, setAccountModal] = useState<boolean>(false)
  const [vendors, setVendors] = useState<UserData | undefined>(undefined)

  const getVendorsHandler = async () => {
    const res = await getVendors()
    setVendors(res)
  }

  const hideModal = () => {
    setAccountModal(false)
  }

  useEffect(() => {

    getVendorsHandler()

  }, [getVendors])

  return (
    <div className="bg-black-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
      <div className='container flex flex-col items-center justify-center px-4 py-5 mx-auto md:px-10 lg:px-16 xl:px-24'>
        <p className="text-4xl md:text-6xl xl:text-8xl py-2 text-white font-bold leading-tight text-center font-ClashDisplay">
          Your One-Stop Spot for Freelance
          <span className='bg-clip-text text-transparent bg-gradient-to-b from-blue-1 to-green-1'>Talent</span>
        </p>
        <p className="text-lg my-4 md:px-[48px] lg:px-40 font-light leading-normal text-center text-white">
          Find the perfect freelancer for your project and pay them easily and securely using our platform's smart contract technology
        </p>
      </div>
      {accountModal && <div className="fixed inset-0 flex items-center justify-center z-[1065]">
        <div onClick={() => setAccountModal(false)} className="fixed inset-0 bg-gray-800 opacity-90"></div>
        <div className="bg-black p-6 rounded-md shadow-lg z-10">
          <CreateAccountModal hideModal={hideModal} />
        </div>
      </div>}
      <div className='container flex gap-4 flex-col sm:flex-row justify-center items-center'>
        <button onClick={() => setAccountModal(true)} className='bg-gradient-to-b from-blue-1 to-green-1 rounded-3xl p-[1px] '>
          <span className='inline-flex w-40 px-4 py-3 md:px-8  md:py-6 2xl:px-16 items-center justify-center text-base text-white bg-black-1 rounded-3xl  '>
            Register
            <Image className='w-4 md:w-4 h-4 ml-2 2xl:w-8' src={require ('../assets/img/vector-arrow.svg')} alt="feat" />
          </span>
        </button>
        <Link href='#vendors' className='inline-flex w-40 px-4 py-3 md:px-8 md:py-6 2xl:px-16 items-center justify-center text-base text-white bg-gradient-to-b from-blue-500 to-green-500 rounded-3xl'>
          Hire
          <Image className='w-4 md:w-4 h-4 ml-2 2xl:w-8' src={require ('../assets/img/vector-arrow.svg')} alt="feat" />
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center w-full'>
        <p className="text-5xl p-2 w-fit mt-40 font-bold leading-10 text-center text-white font-ClashDisplay">Available Talents</p>
        <p className="text-lg my-2 font-light leading-6 text-center text-white w-3/5 ">Discover skilled and experienced freelancers who are ready to tackle your projects. From web developers to graphic designers, our community has it all</p>
        <div id="vendors" className='my-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {vendors && vendors.map(vendor => (

            <VendorCard
              key={vendor.id}
              id={vendor.id.toString()}
              rating={vendor.rating.toString()}
              earnings={vendor.totalAmount.toString()}
              transactionCount={vendor.transCount.toString()}
              image={vendor.filePath}
              businessName={vendor.businessName}
              price={vendor.price}
              vendor={vendor.vendorAddress}
              getVendorsHandler={getVendorsHandler}
            />
          ))}
        </div>
        {vendors && <div className="inline-flex space-x-4 ml-auto mr-3  items-end justify-start">
          <Link href='#' className="text-sm font-book text-green-1 leading-tight text-center">1</Link>
          <Link href='#' className="text-sm font-book leading-tight text-center text-white">2</Link>
          <Link href='#' className="text-sm font-book leading-tight text-center text-white">3</Link>
          <Link href='#' className="text-sm font-book leading-tight text-center truncate text-white">....</Link>
          <Link href='#' className="text-sm font-book leading-tight text-center text-white">10</Link>
        </div>}

      </div>
    </div>
  )
}

export default Home

