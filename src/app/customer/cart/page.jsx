"use client";
import CustomerHeader from './../../components/CustomerHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const [num, setNum] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    calculateTotalPrice(cart);
    setNum(cart.length)
  }, [num]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    updateCart(updatedItems);
    setTotalPrice(totalPrice + updatedItems[index].price)
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity >= 1) setTotalPrice(totalPrice - updatedItems[index].price)
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      updateCart(updatedItems);
    }
  };

  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    if (updatedItems.length === 0) {
      localStorage.removeItem('cart')
    }
    setNum(num - 1);
    updateCart(updatedItems);
  };

  const handleOrderNow = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      router.push("/user-auth");
      return;
    }
    router.push('/order')
  }

  const deliveryCharges = totalPrice >= 500 ? 0 : 50;
  const foodCharges = totalPrice
  const tax = totalPrice > 500 ? (totalPrice - deliveryCharges) * 0.05 : (totalPrice - deliveryCharges) * 0.09;

  return (
    <>
      <CustomerHeader num={num} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b py-4">
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-full mr-4" />
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-600">₹{item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => decreaseQuantity(index)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => increaseQuantity(index)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-8 text-orange-400">
              <div className="flex flex-col p-6 rounded-lg w-full max-w-md">
                <p className="text-xl font-bold">Food Charges: <span className='text-black text-lg font-semibold'>₹{foodCharges.toFixed(2)}</span></p>
                <p className="text-xl font-bold">Delivery Charges:
                  <span className='text-black text-lg font-semibold'>₹{deliveryCharges}</span></p>
                <p className="text-xl font-bold">Tax:
                  <span className='text-black text-lg font-semibold'>₹{tax.toFixed(2)}</span></p>
                <p className="text-xl font-bold mt-4">Total: <span className='text-black text-lg font-semibold'>₹{totalPrice.toFixed(2)}</span>
                </p>

                <button className="bg-orange-500 text-white px-4 py-2 rounded mt-4 w-full" onClick={handleOrderNow}>
                  Order Now
                </button>
              </div>
            </div >
          </>
        ) : (
          <p>Your cart is empty.</p>
        )
        }
      </div >
    </>
  );
};

export default CartPage;
