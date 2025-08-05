import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

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
    available: true,
    imageUrl1: '',
    imageUrl2: ''
  });

  const [loading, setLoading] = useState(true);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSpot({ ...spot, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/spots/${id}`, spot);
      alert('Spot updated!');
      navigate('/spots');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update spot.');
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/api/spots/${id}`)
      .then(res => {
        setSpot(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load spot', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 mt-8 rounded">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Edit Spot</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" value={spot.title} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Title" required />
          <textarea name="description" value={spot.description} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />

          <input type="text" name="address" value={spot.address} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Address" required />

          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="city" value={spot.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-2 border rounded" required />
            <input type="text" name="state" value={spot.state} onChange={handleChange} placeholder="State" className="w-full px-4 py-2 border rounded" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="pincode" value={spot.pincode} onChange={handleChange} placeholder="Pincode" className="w-full px-4 py-2 border rounded" required />
            <input type="text" name="country" value={spot.country} onChange={handleChange} placeholder="Country" className="w-full px-4 py-2 border rounded" required />
          </div>

          <input type="number" name="pricePerHour" value={spot.pricePerHour} onChange={handleChange} placeholder="Price per Hour" className="w-full px-4 py-2 border rounded" required />

          {/* Image Upload Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Update Image 1:</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'imageUrl1')} />
            {spot.imageUrl1 && <img src={spot.imageUrl1} alt="Image 1" className="h-32 mt-2 object-cover rounded" />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Update Image 2:</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'imageUrl2')} />
            {spot.imageUrl2 && <img src={spot.imageUrl2} alt="Image 2" className="h-32 mt-2 object-cover rounded" />}
          </div>

          {/* Available Checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="available"
              checked={spot.available}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Available for Booking
          </label>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSpot;
