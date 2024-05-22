"use client"
import AddFoodItem from './../../components/AddFoodItem'
import AllFoodItems from './../../components/AllFoodItems'
import { useState } from 'react'

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = (val) => {
    if (val === "addItem") {
      setToggle(true);
    }
    else {
      setToggle(false);
    }
  }
  return (
    <div className='mt-3 '>
      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg mx-4" onClick={() => handleToggle("addItem")}>
        Add Food Items
      </button>
      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg mx-4" onClick={() => handleToggle("dashboard")}>
        DashBoard
      </button>
      {
        toggle ? <AddFoodItem setToggle={setToggle} /> : <AllFoodItems />
      }
    </div >
  )
}

export default Dashboard


