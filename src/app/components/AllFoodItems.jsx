import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AllFoodItems() {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    loadAllItems();
  }, [])


  const loadAllItems = async () => {
    const restoId = JSON.parse(localStorage.getItem('restaurentUser'))._id;
    let response = await fetch("/api/restaurent/foodItemAdd/" + restoId);
    response = await response.json();
    if (response.success === true) {
      setFoodItems(response.foodItemsData);
    }
    else {
      console.log("Failed to fetch");
    }
  }

  const handleEdit = (itemId) => {
    router.push("/restaurent/dashboard/" + itemId);
  }


  const deleteFoodItem = async (id) => {
    const restoId = JSON.parse(localStorage.getItem('restaurentUser'))._id;
    let response = await fetch("/api/restaurent/foodItemAdd/" + restoId, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_id: id })
    })

    response = await response.json();
    if (response.result.deletedCount > 0) {
      setFoodItems(response.data)
    }
    else {
      console.log("No Item is deleted");
    }
  }


  return (
    <div className="container mx-auto py-8 flex text-center flex-col ">
      <h1 className="text-3xl text-orange-700  font-bold mb-4"> All Food Items</h1>
      <div className="overflow-x-auto border-xl ">
        {
          foodItems && foodItems.length > 0 &&
          <table className="min-w-full bg-orange-600 border-sm ">
            <thead className='text-white'>
              <tr>
                <th className='px-4 py-2'>S.No.</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Image</th>
                <th className='px-4 py-2'>Operations</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 text-black" >
              {foodItems?.map((item, index) => (
                <tr key={index} className="border-b bg-gradient-to-b from-orange-200">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    <img src={item?.imageUrl} alt={item.name} className="w-12 bg-transparent border-sm mx-auto self-center h-12 object-cover" />
                  </td>
                  <td className=" flex pl-4 py-2 justify-center items-center my-auto mt-2" >
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFoodItem(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};