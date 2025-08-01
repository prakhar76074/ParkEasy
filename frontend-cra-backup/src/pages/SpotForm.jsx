import React, { useState } from 'react';
import { createSpot } from '../services/SpotService';

const SpotForm = () => {
  const [spot, setSpot] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    pricePerHour: '',
    available: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSpot(spot);
    alert('Spot created!');
    setSpot({
      title: '',
      description: '',
      latitude: '',
      longitude: '',
      pricePerHour: '',
      available: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Add a Parking Spot</h2>

        <input
          type="text"
          placeholder="Title"
          value={spot.title}
          onChange={e => setSpot({ ...spot, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Description"
          value={spot.description}
          onChange={e => setSpot({ ...spot, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Latitude"
            value={spot.latitude}
            onChange={e => setSpot({ ...spot, latitude: parseFloat(e.target.value) })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            placeholder="Longitude"
            value={spot.longitude}
            onChange={e => setSpot({ ...spot, longitude: parseFloat(e.target.value) })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <input
          type="number"
          placeholder="Price Per Hour (₹)"
          value={spot.pricePerHour}
          onChange={e => setSpot({ ...spot, pricePerHour: parseFloat(e.target.value) })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={spot.available}
            onChange={e => setSpot({ ...spot, available: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Available</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Spot
        </button>
      </form>
    </div>
  );
};

export default SpotForm;
