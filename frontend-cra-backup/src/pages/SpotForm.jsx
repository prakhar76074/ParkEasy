// src/pages/SpotForm.jsx
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
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input type="text" placeholder="Title" onChange={e => setSpot({ ...spot, title: e.target.value })} />
      <input type="text" placeholder="Description" onChange={e => setSpot({ ...spot, description: e.target.value })} />
      <input type="number" placeholder="Latitude" onChange={e => setSpot({ ...spot, latitude: parseFloat(e.target.value) })} />
      <input type="number" placeholder="Longitude" onChange={e => setSpot({ ...spot, longitude: parseFloat(e.target.value) })} />
      <input type="number" placeholder="Price Per Hour" onChange={e => setSpot({ ...spot, pricePerHour: parseFloat(e.target.value) })} />
      <button type="submit">Create Spot</button>
    </form>
  );
};

export default SpotForm;
