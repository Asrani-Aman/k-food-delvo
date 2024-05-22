"use client"
import CustomerHeader from './../../components/CustomerHeader';
import { useEffect, useState } from 'react'

const Page = ({ params, searchParams }) => {
  const name = params.name
  const id = searchParams.id
  const [foodItems, setFoodItems] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [cartIds, setCartIds] = useState([]);
  const [num, setNum] = useState(0);


  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('cart')) || [];
    const present = data?.map((item) => item._id)
    console.log(present);
    setCartIds(present);
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
      let response = await fetch(`/api/customer/${id}`);
      let result = await response.json();
      if (result.success === true) {
        setFoodItems(result.allItems);
        setRestaurantDetails(result.details);
      } else {
        console.error("Some error happened");
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }

  const updateLocalStorage = (newCart) => {
    if (newCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(newCart));
      return;
    }
    localStorage.removeItem('cart')
  };

  const removeFromCart = (item) => {
    try {
      setNum(num - 1);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (item.quantity === 1) {
        const newIds = cartIds.filter((id) => id !== item._id);
        setCartIds(newIds);
        const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id)
        updateLocalStorage(updatedCart);
      }
      else {
        let updatedCart;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i]._id === item._id) {
            cart[i].quantity -= 1;
          }
        }
        updatedCart = cart
        updateLocalStorage(updatedCart);
      }
    } catch (error) {
      console.log("some error", error);
    }
  }

  const addToCart = (item) => {
    try {
      setNum(num + 1);
      if (!cartIds.includes(item._id)) {
        const updatedIds = [...cartIds, item._id]
        setCartIds(updatedIds);
      }
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let newCart;
      const allIds = cart.map((item) => item._id)
      if (allIds.includes(item._id)) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i]._id === item._id) {
            cart[i].quantity += 1;
          }
        }
        newCart = cart;
      }
      else {
        item.quantity = 1;
        newCart = [...cart, item];
      }
      updateLocalStorage(newCart);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }

  return (
    <>
      <CustomerHeader num={num} />
      <div className="flex flex-col justify-between items-center min-h-[80.8vh]">
        <div style={{
          backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/07/04/02/14/1000_F_704021496_iJ80Oe8za03nNMbKnXE5UsG3ofneqefU.jpg')",
          height: "50vh",
          width: '100vw',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative"
        }}>
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto px-4">
              <h1 className="text-4xl font-bold text-white text-center mb-8">Welcome to {decodeURI(name)} </h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Restaurant Details</h2>
            <p><strong>Name:</strong> {restaurantDetails.restaurantName}</p>
            <p><strong>Address:</strong> {restaurantDetails.address}</p>
            <p><strong>Email</strong>: {restaurantDetails.email}</p>
            <p><strong>Phone</strong>: {restaurantDetails.phoneNumber}</p>
            <p><strong>City</strong>: {restaurantDetails.city}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
            <ul>
              {foodItems.map((item, index) => (
                <li key={index} className="mb-2 flex gap-x-2 border-2 border-orange-400 rounded-md shadow-xl shadow-orange-200 p-4 flex-wrap ">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-full mr-4" />
                  <div>
                    <strong className='text-orange-700'>{item.name}</strong>
                    <p><strong className='text-orange-700'>Price:</strong> {item.price}</p>
                    <p><strong className='text-orange-700'>Description: </strong>{item.description}</p>
                    {
                      cartIds?.includes(item._id) ?
                        <button className='bg-orange-600 text-white px-3 rounded-xl py-1 text-sm font-bold' onClick={() => removeFromCart(item)}>Remove From Cart</button>
                        :
                        <button className='bg-blue-600 text-white px-3 rounded-xl py-1 text-sm font-bold' onClick={() => addToCart(item)}>Add To Cart</button>
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div >
    </>
  )
}

export default Page
