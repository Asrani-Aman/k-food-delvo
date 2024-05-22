"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomerHeader from '../components/CustomerHeader';

const OrderPage = () => {
  const [user, setUser] = useState(null);
  const [foodCharges, setFoodCharges] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(100);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [num, setNum] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const items = JSON.parse(localStorage.getItem('cart')) || [];

    if (!userDetails) router.push("/user-auth")
    let totalAmount = 0;
    for (let i = 0; i < items.length; i++) {
      totalAmount += items[i].price * items[i].quantity;
    }

    const taxAmount = totalAmount * 0.1;
    const finalAmount = totalAmount + deliveryCharges + taxAmount;

    setUser(userDetails);
    setFoodCharges(totalAmount);
    setTax(taxAmount);
    setTotalPrice(finalAmount);
    setNum(items.length);
  }, [deliveryCharges]);

  const handleOrderPlace = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const restoId = cartData[0].restoId;
    const foodItemIdsWithQuantity = cartData.map((item) => ({ id: item._id, quantity: item.quantity }));

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        restoId,
        foodItemIdsWithQuantity,
        deliveryBoyId: "66433f403b4f3c2f8e69dd28",
        amount: totalPrice,
        status: "JustOrdered"
      })
    })
    const result = await response.json();

    if (result.success) {
      console.log("Successfully Ordered");
      setNum(0);
      localStorage.removeItem('cart');
      router.push("/customer/profile");
    }
    else {
      console.log("Some Problem", result.error);
    }
  }
  return (
    <>
      <CustomerHeader num={num} />
      <div className="container flex flex-col mx-auto justify-start px-4 py-8 gap-y-2">
        <h1 className='font-bold text-4xl'>Order Summary</h1>
        <div className="flex justify-start mt-2 text-orange-400 shadow-lg rounded-md p-2">
          <div className="flex flex-col pl-6 rounded-lg w-full max-w-md">
            <h3 className="text-3xl text-orange-900 font-semibold mb-1">User Details</h3>
            <div className="flex flex-col rounded-lg w-full max-w-md text-orange-400">
              <p className="text-xl font-bold">Name: <span className='text-black text-lg font-semibold'>{user?.username}</span></p>
              <p className="text-xl font-bold">Email: <span className='text-black text-lg font-semibold'>{user?.email}</span></p>
              <p className="text-xl font-bold">Contact: <span className='text-black text-lg font-semibold'>{user?.phoneNumber}</span></p>
              <p className="text-xl font-bold">Address: <span className='text-black text-lg font-semibold'>{user?.address}</span></p>
            </div>
          </div>
        </div>


        <div className="flex justify-start text-orange-400 shadow-lg rounded-md p-2">
          <div className="flex flex-col pl-6 rounded-lg w-full max-w-md">
            <h3 className="text-3xl font-semibold mb-2 mt-4 text-orange-900">Order Details</h3>
            <p className="text-xl font-bold">Food Charges: <span className='text-black text-lg font-semibold'>₹{foodCharges}</span></p>
            <p className="text-xl font-bold">Delivery Charges: <span className='text-black text-lg font-semibold'>₹{deliveryCharges.toFixed(2)}</span></p>
            <p className="text-xl font-bold">Tax: <span className='text-black text-lg font-semibold'>₹{tax.toFixed(2)}</span></p>
            <hr />
            <hr />
            <hr />
            <p className="text-xl font-bold mt-4">Total: <span className='text-black text-lg font-semibold'>₹{totalPrice.toFixed(2)}</span></p>
          </div>
        </div>

        <div className="flex flex-col gap-y-0 justify-start pl-6 shadow-lg rounded-md p-2">
          <h1 className="text-3xl font-semibold mb-2 mt-4 text-orange-900">Payment Mode</h1>
          <p className="text-xl  text-orange-400 font-bold ">Cash On Delivery: <span className='text-black text-lg font-semibold'>₹{totalPrice.toFixed(2)}</span></p>
        </div>
        <button className="bg-orange-500 text-white px-32 py-2 rounded mt-4 " onClick={handleOrderPlace}>
          Place Your Order Now
        </button>
      </div >
    </>
  );
};

export default OrderPage;
