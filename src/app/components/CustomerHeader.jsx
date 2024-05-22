"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CustomerHeader = ({ num }) => {
  const [cartNumber, setCartNumber] = useState()
  const [details, setDetails] = useState(null)
  const router = useRouter();


  const updateCartNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartNumber(cart.length);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setDetails(userData);
    updateCartNumber();
  }, [num]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <header className="bg-white border-b-1 border-gray-200">
      <nav className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/restaurent">
            <h1 className="flex items-center">
              <img src="/images/image.png" className="h-7 w-auto sm:h-10 rounded-full" alt="Logo" width={80} height={80} />
              <span className="ml-3 text-2xl font-semibold dark:text-white text-orange-700">Food Delvo</span>
            </h1>
          </Link>
          <ul className='flex flex-row gap-x-4'>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              {details ? (
                <div className='flex gap-x-4 '>
                  <Link href="/customer/profile">{details.username.toUpperCase()[0] + details.username.slice(1)}</Link>
                  <Link href="/customer/cart">Cart({cartNumber})</Link>
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              ) : (
                <div className='flex gap-x-4'>
                  <Link href="/user-auth">SignUp</Link>
                  <Link href="/user-auth">Login</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default CustomerHeader;
