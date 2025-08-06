import React, { useState } from 'react';
import { createSpot } from '../services/SpotService';
import { useNavigate } from 'react-router-dom';

const SpotForm = () => {
  const [spot, setSpot] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    latitude: null,       // Optional: keep null for now
    longitude: null,
    pricePerHour: '',
    available: true,
  });
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleFileChange = async (e, imgField) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setSpot(prev => ({ ...prev, [imgField]: base64 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!spot.address || !spot.city || !spot.pincode || !spot.country) {
      alert('Please fill all required address fields');
      return;
    }
    // // await createSpot({
    //   ...spot,
    //   hostId: 1, // <- TEMP: replace with actual host id or from auth state
    // });
  const user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  const hostId = user.id;
    const spotWithHost = {
      ...spot,
      hostId: hostId, 
    };
    
    await createSpot(spotWithHost);
    alert('Spot created!');
    navigate('/spots');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">List Your Parking Spot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Spot Title"
          className="w-full p-2 border rounded"
          value={spot.title}
          onChange={(e) => setSpot({ ...spot, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={spot.description}
          onChange={(e) => setSpot({ ...spot, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border rounded"
          value={spot.address}
          onChange={(e) => setSpot({ ...spot, address: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            className="p-2 border rounded"
            value={spot.city}
            onChange={(e) => setSpot({ ...spot, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="p-2 border rounded"
            value={spot.state}
            onChange={(e) => setSpot({ ...spot, state: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Pincode"
            className="p-2 border rounded"
            value={spot.pincode}
            onChange={(e) => setSpot({ ...spot, pincode: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="p-2 border rounded"
            value={spot.country}
            onChange={(e) => setSpot({ ...spot, country: e.target.value })}
            required
          />
        </div>

        <input
          type="number"
          placeholder="Price per Hour"
          className="w-full p-2 border rounded"
          value={spot.pricePerHour}
          onChange={(e) => setSpot({ ...spot, pricePerHour: parseFloat(e.target.value) })}
          required
        />
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'imageUrl1')} />
<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'imageUrl2')} />

        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SpotForm;
