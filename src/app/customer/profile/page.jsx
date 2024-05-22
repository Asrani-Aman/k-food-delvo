"use client"
import CustomerHeader from './../../components/CustomerHeader';
import { useEffect, useState } from 'react';

const page = () => {

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders();
  }, [])


  const getAllOrders = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let response = await fetch("/api/order/?id=" + userId);
    response = await response.json();
    console.log(response);
    if (response.success) {
      setOrders(response.result);
    }
  }


  return (
    <div className="min-h-screen">
      <CustomerHeader />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">No orders found</div>
        ) : (
          orders.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h4 className="text-lg text-orange-600 font-semibold mb-2">Restaurant: <span className='text-black'>{item.data.restaurantName}</span></h4>
              <div className="text-orange-600 mb-2">Amount: <span className='text-black'>₹{item.amount}</span></div>
              <div className="text-orange-600 mb-2">Address: <span className='text-black'>{item.data.address}</span></div>
              <div className="text-orange-600 mb-2">Status: <span className={` ${item.status === 'Delivered' ? 'text-green-900' : 'text-yellow-600'}`}>{item.status}</span></div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default page
