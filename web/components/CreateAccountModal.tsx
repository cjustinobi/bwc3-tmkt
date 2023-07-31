import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { createAccount } from '../utils'

interface CreateAccountModalProps {
  hideModal: () => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({hideModal}) => {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [service, setService] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const createAccountHandler = async () => {
    setLoading(true)
    await createAccount(businessName, service, image, description, price)
    hideModal()
    setLoading(false)
    await router.push('/')
  }

  return (
    <>

      <section className={`justify-center flex z-[1] top-[0] left-[0] right-[0] bottom-[0] h-[100%] bg-[rgba(15,15,15,0.9)] w-[100%] p-[0] m-0`}>

        <div className="relative top-[2%] md:top-[3%] md:max-w-[610px] lg:top-[4%]  lg:h-[90%] md:h-[95%] h-[96%] bg-black  rounded-[20px]  max-w-[750px] flex justify-center w-[100%] botton-[0%] m- p-[3%] align-center ">
          <div className="justify-center flex w-[100%] h-[100%] bg-[black] items-center ">
            <div className="main-container grid w-[100%] top-[20%]  max-w-[700px]">
              <h1 className="text-[#fff] justify-center font-clashDisplay text-[30px] font-bold bottom-[70%] relative flex">
                Create Account
              </h1>

              <div className="grid grid-cols-2 gap-[20px]">
                <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Business Name
                </span>

                  <input
                    onChange={e => setBusinessName(e.target.value)}
                    className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputField"
                    placeholder="Business Name"
                  />
                </div>
                <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Service
                </span>

                  <input
                    onChange={e => setService(e.target.value)}
                    className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    id="inputField"
                    type="text"
                    placeholder="Service"
                  />
                </div>
                <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Service Charge
                </span>
                  <input
                    onChange={e => setPrice(e.target.value)}
                    className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Charge per hour"
                  />
                </div>
                <div className=" item-center justify-between">
                <span className="text-[#fff] font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Image Path
                </span>
                  <input
                    onChange={e => setImage(e.target.value)}
                    className="shadow appearance-none border bg-transparent rounded-[7px] w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Image Path"
                  />
                </div>
              </div>

              <div className="center">
                <div className="top-[17px] relative grid">
                <span className="text-[#fff]  font-circularStd md:text-[15px] text-[14px] lg:text-[19px]">
                  Description
                </span>
                  <textarea
                    onChange={e => setDescription(e.target.value)}
                    className="shadow appearance-none border  bg-transparent rounded-[7px] h-[100%] w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Description..."
                    rows={4}
                  />
                </div>

                <div className="section flex top-[40px] relative justify-between">
                  <button onClick={() => hideModal()} className="w-[35%] border-2 h-[47px] border-none gap-[20px] p-[7px 25px] bg-gradient-to-tr from-yellow-500 to-red-500 rounded-[8px]  relative justify-center rounded-[8px] text-center items-center  text-[#fff] flex">
                    Cancel
                  </button>
                  <button onClick={createAccountHandler} className="class w-[35%] rounded-[8px] text-center p-[7px 25px] h-[50px] gap-[20px] justify-center bg-gradient-to-tr from-blue-500 via-teal-600 to-emerald-500 items-center relative  text-[#fff] flex">
                    {loading ? 'Submitting ...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default CreateAccountModal