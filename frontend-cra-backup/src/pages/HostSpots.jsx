import React, { useEffect, useState } from 'react';
import { getSpotsByHost } from '../services/SpotService';
import axios from 'axios';

const HostSpots = () => {
  const hostId = "99f3b02e-42f4-4b3e-bc34-21a0cc8b27d9"; // TODO: Replace with logged-in user's ID
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetchHostSpots();
  }, []);

  const fetchHostSpots = async () => {
    try {
      const res = await getSpotsByHost(hostId);
      setSpots(res.data);
    } catch (err) {
      console.error("Error fetching spots", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this spot?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/api/spots/${id}`);
      setSpots(spots.filter((spot) => spot.id !== id));
      alert("Spot deleted successfully.");
    } catch (err) {
      console.error("Error deleting spot:", err);
      alert("Failed to delete spot.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Listed Spots</h2>
      {spots.length === 0 ? (
        <p>No spots listed yet.</p>
      ) : (
        <ul className="space-y-4">
          {spots.map((spot) => (
            <li key={spot.id} className="bg-white p-4 shadow rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{spot.title}</h3>
                  <p className="text-sm text-gray-500">₹{spot.pricePerHour}/hr</p>
                  <p className="text-sm text-gray-400">{spot.address}, {spot.city}</p>
                </div>
                <div className="flex gap-4">
                  <a href={`/edit-spot/${spot.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(spot.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HostSpots;
