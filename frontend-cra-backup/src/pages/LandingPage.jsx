import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="bg-blue-50 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Find Parking. Earn with Parking.</h2>
        <p className="max-w-xl mx-auto text-gray-700 text-lg">
          ParkEasy connects drivers with available private spots — faster, cheaper, smarter.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/spots" className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800">
            Find Spot
          </a>
          <a href="/add-spot" className="border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-100">
            List Your Spot
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 bg-white text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-10">Why ParkEasy?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <div className="text-4xl text-blue-600 mb-2">🚗</div>
            <h4 className="font-semibold text-lg">Smart Spot Discovery</h4>
            <p className="text-gray-600 text-sm mt-2">See real-time availability near you and navigate instantly.</p>
          </div>
          <div>
            <div className="text-4xl text-green-600 mb-2">💸</div>
            <h4 className="font-semibold text-lg">Affordable Parking</h4>
            <p className="text-gray-600 text-sm mt-2">Pay only for what you use — no more mall overcharges.</p>
          </div>
          <div>
            <div className="text-4xl text-yellow-500 mb-2">🏠</div>
            <h4 className="font-semibold text-lg">Host & Earn</h4>
            <p className="text-gray-600 text-sm mt-2">Monetize your empty driveway or spot in seconds.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-10">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
          <div>
            <h4 className="text-blue-700 font-semibold mb-2">For Drivers</h4>
            <ul className="text-gray-700 list-disc pl-6 space-y-2">
              <li>Search available parking spots nearby</li>
              <li>View photos, reviews, and price</li>
              <li>Book + Navigate via Google Maps</li>
              <li>Pay via UPI and park hassle-free</li>
            </ul>
          </div>
          <div>
            <h4 className="text-green-700 font-semibold mb-2">For Hosts</h4>
            <ul className="text-gray-700 list-disc pl-6 space-y-2">
              <li>List your parking spot in 2 mins</li>
              <li>Set availability and hourly price</li>
              <li>Approve bookings and earn</li>
              <li>Track earnings on your dashboard</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="bg-blue-700 text-white py-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Start Parking Smart Today</h3>
        <p className="mb-6">Whether you're a driver or a host — ParkEasy has you covered.</p>
        <a href="/spots" className="bg-white text-blue-700 px-6 py-3 rounded font-medium hover:bg-blue-50">
          Find a Spot Now
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
