import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <div className="text-center py-20 bg-gradient-to-r from-blue-100 to-blue-200">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Find & Rent Parking Instantly</h2>
    <p className="text-gray-600 mb-6 text-lg max-w-xl mx-auto">
      ParkEasy lets you book verified parking spots from residents or list your unused spot to earn extra income.
    </p>
    <div className="flex justify-center gap-4">
      <Link to="/spots" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Find Parking
      </Link>
      <Link to="/add-spot" className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
        Become a Host
      </Link>
    </div>
  </div>
);

export default HeroSection;
