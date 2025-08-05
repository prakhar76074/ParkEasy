import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
    <section className="bg-blue-50 py-20 px-6 text-center">
    <h2 className="text-4xl font-bold text-blue-700 mb-4">Find Parking. Earn with Parking.</h2>
    <p className="max-w-xl mx-auto text-gray-700 text-lg">
      ParkEasy connects drivers with available private spots — faster, cheaper, smarter.
    </p>
  
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <a href="/spots" className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800">
        Find Spot
      </a>
      <a href="/add-spot" className="border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-100">
        List Your Spot
      </a>
      <a href="/login" className="text-blue-700 underline text-sm mt-2">Login</a>
      <a href="/signup" className="text-blue-700 underline text-sm mt-2">Sign Up</a>
    </div>
  </section>
  

);

export default HeroSection;
