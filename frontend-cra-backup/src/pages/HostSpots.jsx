import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { getSpotsByHostId } from '../services/SpotService';
import { useNavigate } from 'react-router-dom';

const HostSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const hostId = user?.id;

  useEffect(() => {
    const fetchMySpots = async () => {
      try {
        const res = await getSpotsByHostId(hostId);
        setLoading(false)
        setSpots(res.data);
      } catch (err) {
        console.error('Error fetching your hosted spots:', err);
      } finally {
        setLoading(false);
      }
    };

    if (hostId) {
      fetchMySpots();
    }
  }, [hostId]);

  const handleEdit = (id) => {
    navigate(`/edit-spot/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this spot?')) {
      try {
        await axios.delete(`http://localhost:8081/api/spots/${id}`);
        setSpots(spots.filter((spot) => spot.id !== id));
      } catch (err) {
        console.error('Failed to delete spot:', err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">My Hosted Spots</h2>
          <button
            onClick={() => navigate('/add-spot')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create New Spot
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : spots.length === 0 ? (
          <p className="text-gray-500">You haven’t listed any parking spots yet.</p>
        ) : (
          <div className="grid gap-6">
            {spots.map((spot) => (
              <div key={spot.id} className="border p-5 rounded shadow bg-white">
                <h3 className="text-xl font-semibold mb-1">{spot.title}</h3>
                <p className="text-gray-600">{spot.address}, {spot.city}</p>
                <p className="text-gray-700 font-medium mt-1">₹{spot.pricePerHour}/hr</p>
                <p className={`font-semibold ${spot.available ? 'text-green-600' : 'text-red-600'} mt-1`}>
                  {spot.available ? 'Available' : 'Unavailable'}
                </p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(spot.id)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(spot.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostSpots;
