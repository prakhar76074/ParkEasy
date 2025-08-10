import React from "react";
import { Link } from "react-router-dom";

const SpotCard = ({ spot, generateMapLink }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition">
      {spot.imageUrl1 && (
        <img
          src={spot.imageUrl1}
          alt="Spot"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-800">
          {spot.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {spot.description}
        </p>

        <div className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Address:</span>{" "}
          {`${spot.address}, ${spot.city}, ${spot.state} - ${spot.pincode}, ${spot.country}`}
        </div>
        <p
          className={
            spot.available
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {spot.available ? "Available" : "Not Available now"}
        </p>

        <div className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Price:</span> ₹
          {spot.pricePerHour}/hr
        </div>
      </div>

      <div className="bg-blue-50 p-3 flex justify-between items-center">
        <a
          href={generateMapLink(spot)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline hover:text-blue-800"
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
