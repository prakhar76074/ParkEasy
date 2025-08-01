// src/pages/SpotList.jsx
import React, { useEffect, useState } from 'react';
import { getSpots } from '../services/SpotService';

const SpotList = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    getSpots().then(res => setSpots(res.data));
  }, []);

  return (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-purple-600">Tailwind is working!</h1>
      <h2 className="text-xl font-bold mb-4">Available Spots</h2>
      <ul>
        {spots.map(spot => (
          <li key={spot.id} className="mb-2">
            <strong>{spot.title}</strong> – ₹{spot.pricePerHour}/hr
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotList;
