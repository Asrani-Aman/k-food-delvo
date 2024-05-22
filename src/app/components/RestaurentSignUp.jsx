"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RestaurentSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phoneNumber: '',
    address: '',
    restaurantName: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Your Confirm Password is not matching with your current password");
      return;
    }
    try {
      let result = await fetch("/api/restaurent/restaurentSignup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      result = await result.json();
      if (result.message === "Successfully Created User") {
        const userData = formData
        delete userData.password;
        delete userData.confirmPassword;
        localStorage.setItem("restaurentUser", JSON.stringify(formData));
        router.push("/restaurent/dashboard");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Some Error Occurred.....", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-orange-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name:</label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurentSignUp;
