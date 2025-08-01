import React, { useEffect, useState } from 'react';
import { getSpots } from '../services/SpotService';
import Navbar from '../components/Navbar';

const SpotList = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await getSpots();
        setSpots(res.data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };
    fetchSpots();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="py-10 px-4 md:px-10 lg:px-20 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Available Parking Spots
        </h2>

        {spots.length === 0 ? (
          <p className="text-center text-gray-500">No spots available at the moment.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => (
              <div key={spot.id} className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-800">{spot.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{spot.description}</p>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Price:</span> ₹{spot.pricePerHour}/hr
                  </div>
                  <div className="text-xs text-gray-400">
                    📍 Lat: {spot.latitude}, Long: {spot.longitude}
                  </div>
                </div>
                <div className="bg-blue-50 p-3 text-right">
                  <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SpotList;
