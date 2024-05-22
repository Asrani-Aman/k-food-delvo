"use client"
import { useState } from 'react';
import DeliveryBoySignIn from '../components/DeliveryBoySignIn';
import DeliveryBoySignUp from '../components/DeliveryBoySignUp';
const page = () => {
  const [toggle, setToggle] = useState(true)
  return (
    <>
      <div className="flex justify-center items-center flex-col mt-16 gap-y-2">
        {!toggle ? <DeliveryBoySignIn /> : <DeliveryBoySignUp />}
        <button onClick={() => setToggle(!toggle)} className='bg-white-700 hover:text-blue-700 text-blue-500  my-4 text-xl font-bold'>
          {!toggle ? "Do Not have Account ? SignUp Here" : "Already Have Account ? Sign in here"}
        </button>
      </div >
    </>
  )
}
export default page
