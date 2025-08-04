import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSpot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    pricePerHour: '',
    hostId: '',
  });

  useEffect(() => {
    const fetchSpot = async () => {
      const res = await axios.get(`http://localhost:8081/api/spots/${id}`);
      setSpot(res.data);
    };
    fetchSpot();
  }, [id]);

  const handleChange = (e) => {
    setSpot({ ...spot, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8081/api/spots/${id}`, spot);
    alert('Spot updated!');
    navigate('/host-spots');
  };
 
  

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Spot</h2>
      {['title', 'description', 'address', 'city', 'state', 'pincode', 'country'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={spot[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full mb-2 p-2 border rounded"
        />
      ))}
      <input
        type="number"
        name="pricePerHour"
        value={spot.pricePerHour}
        onChange={handleChange}
        placeholder="Price per Hour"
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default EditSpot;
