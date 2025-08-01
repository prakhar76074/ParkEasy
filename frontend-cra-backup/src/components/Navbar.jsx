import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
    <h1 className="text-xl font-bold text-blue-600">ParkEasy</h1>
    <div className="space-x-4">
      <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
      <Link to="/spots" className="text-gray-600 hover:text-blue-600">Spots</Link>
      <Link to="/add-spot" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
        Add Spot
      </Link>
    </div>
  </nav>
);

export default Navbar;
