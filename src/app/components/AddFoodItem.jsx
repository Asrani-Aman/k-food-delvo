import React, { useState } from 'react';

const AddFoodItem = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFormData = formData;
      newFormData.restoId = JSON.parse(localStorage.getItem("restaurentUser"))._id;
      let result = await fetch("/api/restaurent/foodItemAdd", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFormData)
      });
      result = await result.json();
      if (result.message === "success") {
        alert("Success! New item added");
        props.setToggle(false);
        return;
      }
      else if (result.message === "missingFields") {
        alert("Missing Fields");
        return;
      }
    } catch (error) {
      console.log("Some Error Occurred", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center my-8">

      <h1 className='text-2xl font-semibold mb-3 text-orange-700'> Add New Food Item</h1>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Item Name"
        className="border border-gray-400 rounded-lg p-2 my-2"
        value={formData.name}
        required
        onChange={handleChange}
      />
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Enter the Price"
        className="border border-gray-400 rounded-lg p-2 my-2"
        value={formData.price}
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Write the Description"
        className="border border-gray-400 rounded-lg p-2 my-2"
        value={formData.description}
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        placeholder="Enter Image Url"
        className="border border-gray-400 rounded-lg p-2 my-2"
        value={formData.imageUrl}
        required
        onChange={handleChange}
      />
      <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-8 rounded-lg mt-4" onClick={handleSubmit}>
        Add New Item
      </button>
    </div>
  );
}

export default AddFoodItem;