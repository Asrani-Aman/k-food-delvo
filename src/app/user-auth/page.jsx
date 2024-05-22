"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CustomerHeader from '../components/CustomerHeader'
import UserSignIn from '../components/UserSignIn'
import UserSignUp from '../components/UserSignUp'

const page = () => {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      router.push('/');
    }
  }, [])

  const toggleLogin = () => {
    setLogin(!login)
  }


  return (
    <div>
      <CustomerHeader num={0} />
      <hr />
      {
        login ?
          <div className='flex justify-center items-center flex-col min-h-[80.8vh]'>
            <UserSignIn />
            <button onClick={toggleLogin} className='mt-3 hover:text-orange-700 cursive font-semibold mb-4' >Have No Account? SignUp Here</button>
          </div>
          :
          <div className='flex justify-center items-center flex-col mb-4'>
            <UserSignUp />
            <button onClick={toggleLogin} className='mt-3 hover:text-orange-700 cursive font-semibold'>Already have Account? Login Here</button>
          </div>
      }
    </div>
  )
}

export default page
