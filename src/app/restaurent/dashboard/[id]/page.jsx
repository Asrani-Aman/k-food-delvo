"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditFoodItem = ({ params }) => {
  const router = useRouter();
  const itemId = params.id;
  const [foodItem, setFoodItem] = useState({});
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (itemId) {
      fetchFoodItem();
    }
  }, [itemId]);

  const fetchFoodItem = async () => {
    try {
      const response = await fetch(`/api/restaurent/foodItemEdit/${itemId}`);
      const data = await response.json();
      const { foodItemsData, success } = data;
      if (success === true) {
        setFoodItem(foodItemsData);
        setForm(foodItemsData);
      }
    } catch (error) {
      console.error('Error fetching food item:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("at frontend side ", form);
      const response = await fetch(`/api/restaurent/foodItemEdit/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        router.push('/restaurent/dashboard');
      } else {
        console.error('Failed to update food item:', data.error);
      }
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };

  if (!foodItem) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Food Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            autoComplete="off"
          />
        </div>
        <div>
          {form.imageUrl && (
            <img src={form.imageUrl} alt={form.name} className="object-cover w-8 h-8" />
          )}
        </div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
          Update Food Item
        </button>
      </form>
    </div>
  );
};

export default EditFoodItem;
