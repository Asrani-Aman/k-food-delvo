"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const [details, setDetails] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("restaurentUser");
    if (!data && pathName === "/restaurent/dashboard") {
      router.push("/restaurent");
    } else if (data && pathName === "/restaurent") {
      router.push("/restaurent/dashboard");
    }

    if (data) {
      setDetails(JSON.parse(data));
    }
  }, [pathName, router]);

  useEffect(() => {
    if (!details && pathName === "/restaurant/dashboard") {
      router.push("/restaurent");
    }
  }, [details, pathName, router]);

  const logoutHandler = () => {
    localStorage.removeItem("restaurentUser");
    setDetails(null);
    router.push("/restaurent");
  };

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-800">
      <nav className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/restaurent">
            <h1 className="flex items-center">
              <Image src="/images/image.png" className="h-7 w-auto sm:h-10 rounded-full" alt="Logo" width={80} height={80} />
              <span className="ml-3 text-2xl font-semibold dark:text-white text-orange-700">Food Delvo</span>
            </h1>
          </Link>
          <ul className='flex flex-row gap-x-4'>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              {details ? (
                <>
                  <Link href="/restaurent/profile">Profile</Link>
                  <button onClick={logoutHandler} className='px-4'>Logout</button>
                </>
              ) : (
                <Link href="/restaurent">Login/SignUp</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
