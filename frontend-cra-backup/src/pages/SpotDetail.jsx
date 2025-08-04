import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const SpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/spots/${id}`);
        setSpot(res.data);
        setTotal(res.data.pricePerHour); // default 1 hour
      } catch (error) {
        console.error("Failed to load spot:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpot();
  }, [id]);

  useEffect(() => {
    if (spot) {
      setTotal(spot.pricePerHour * hours);
    }
  }, [hours, spot]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!spot) return <div className="text-center mt-10 text-red-600">Spot not found.</div>;

  const addressString = `${spot.address}, ${spot.city}, ${spot.state}, ${spot.pincode}, ${spot.country}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(addressString)}&output=embed`;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-700 mb-2">{spot.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{spot.description}</p>

        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {spot.imageUrl1 && (
            <img
              src={spot.imageUrl1}
              alt="Spot 1"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
          )}
          {spot.imageUrl2 && (
            <img
              src={spot.imageUrl2}
              alt="Spot 2"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Spot Details */}
        <div className="space-y-2 text-gray-700 text-sm mb-4">
          <p><span className="font-medium">Address:</span> {addressString}</p>
          <p><span className="font-medium">Rate:</span> ₹{spot.pricePerHour} / hour</p>
          <p><span className="font-medium">Availability:</span> {spot.available ? 'Available' : 'Not Available'}</p>
        </div>

        {/* Map View */}
        <div className="mt-6">
          <iframe
            src={mapUrl}
            width="100%"
            height="300"
            className="rounded border"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        {/* Booking Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Book This Spot</h3>

          <label className="block mb-2 text-sm font-medium text-gray-700">Number of Hours</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />

          <div className="text-lg mb-4">
            <strong>Total Price:</strong> ₹{total}
          </div>

          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={() => alert(`Booking confirmed for ₹${total}!`)}
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
