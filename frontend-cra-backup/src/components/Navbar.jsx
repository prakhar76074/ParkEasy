import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">ParkEasy</h1>
        <div className="space-x-6 text-sm">
  {/* <a href="#features" className="hover:underline">Features</a>
  <a href="#how-it-works" className="hover:underline">How it Works</a> */}
  <a href="/login" className="hover:underline">Login</a>
  <a href="/signup" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100">Sign Up</a>
</div>
 
      </div>
    </nav>
  );
};

export default Navbar;
