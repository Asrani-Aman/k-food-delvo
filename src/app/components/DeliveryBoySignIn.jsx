"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DeliveryBoySignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        alert("All fields are required ... ");
        return;
      }

      let result = await fetch("/api/deliveryBoy/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      result = await result.json();
      if (result.message === "User Exists") {
        delete result.dataResult.password;
        localStorage.setItem("deliveryboy", JSON.stringify(result.dataResult));
        router.push("/deliveryBoy/dashboard");
        return;
      } else {
        alert(result.message);
        return;
      }
    } catch (error) {
      alert("Something went wrong", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-14">
      <div className="bg-white p-10 rounded-lg w-full shadow-2xl max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-orange-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryBoySignIn;
