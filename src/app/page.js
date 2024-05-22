"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomerHeader from './components/CustomerHeader';

const Home = () => {
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router.push("/user-auth")
    }
    getLocations();
    fetchRestaurants({});
  }, [])

  const getLocations = async () => {
    try {
      let result = await fetch("/api/customer/locations");
      result = await result.json();
      if (result.success === true) {
        setLocations(result.locations);
      }
    } catch (error) {
      console.log("some error", error);
    }
  }
  const fetchRestaurants = async (params) => {
    try {
      let url = '/api/customer';
      const queryParams = [];

      if (params.location) {
        queryParams.push(`location=${encodeURIComponent(params.location)}`);
      }

      if (params.restaurent) {
        queryParams.push(`restaurent=${encodeURIComponent(params.restaurent)}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      const response = await fetch(url);
      const { success, result, error } = await response.json();

      if (success) {
        setRestaurants(result);
      } else {
        console.error('Failed to fetch restaurants:', error);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };


  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filtered = locations.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
      setFilteredLocations(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setShowDropdown(false);
    fetchRestaurants({ location: loc });
  };

  return (
    <>
      <CustomerHeader />
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
              <h1 className="text-4xl font-bold text-white text-center mb-8">Welcome to Food Delvo</h1>
              <form className="flex items-center justify-center w-[80vw] relative" >
                <div className="relative w-full md:w-1/2 mb-4 md:mb-0 ">
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    id="locationName"
                    onChange={handleLocationChange}
                    className="w-full px-4 py-2 rounded-l-md border-r-2 focus:outline-none"
                  />
                  {showDropdown && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc, index) => (
                          <li
                            key={index}
                            onClick={() => handleLocationSelect(loc)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {loc}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                      )}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Search for Restaurants"
                  id="restaurentsSearch"
                  className="w-full md:w-1/2 px-4 py-2 focus:outline-none rounded-r-md"
                  onChange={(e) => fetchRestaurants({ restaurent: e.target.value })}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold text-center mb-4">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <div onClick={() => router.push("explore/" + restaurant.restaurantName + "?id=" + encodeURI(restaurant._id))} key={restaurant._id} className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                <h3 className="text-xl font-bold mb-2">{restaurant.restaurantName}</h3>
                <p className="text-gray-700 mb-1"><strong>Email:</strong> {restaurant.email}</p>
                <p className="text-gray-700 mb-1"><strong>Phone:</strong> {restaurant.phoneNumber}</p>
                <p className="text-gray-700 mb-1"><strong>City:</strong> {restaurant.city}</p>
                <p className="text-gray-700 mb-1"><strong>Address:</strong> {restaurant.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
