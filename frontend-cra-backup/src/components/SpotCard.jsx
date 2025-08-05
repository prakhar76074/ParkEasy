import React from 'react';
import { Link } from 'react-router-dom';

const SpotCard = ({ spot }) => {
  const generateMapLink = () => {
    const fullAddress = `${spot.address}, ${spot.city}, ${spot.state}, ${spot.pincode}, ${spot.country}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg">
      {spot.imageUrl1 && (
        <img src={spot.imageUrl1} alt={spot.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-800">{spot.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Address:</strong> {spot.address}, {spot.city}, {spot.state}, {spot.pincode}
        </p>
        <p className={spot.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
        Available :{spot.available ? "Available" : "Not Available"}
</p>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Price:</strong> ₹{spot.pricePerHour}/hr
        </p>
      </div>

      <div className="p-3 bg-blue-50 flex justify-between items-center">
        <a
          href={generateMapLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline"
        >
          View on Map
        </a>
        <Link to={`/spot/${spot.id}`}>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SpotCard;
